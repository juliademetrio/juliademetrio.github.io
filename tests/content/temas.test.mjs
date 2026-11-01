import test from 'node:test';
import assert from 'node:assert/strict';
import { getTemasProvaveis, getTemasAnteriores, getRepertorio } from '../helpers/load-data.mjs';

test('Temas Prováveis e Histórico de Temas Anteriores', async (t) => {
  const temasProvaveis = getTemasProvaveis();
  const temasAnteriores = getTemasAnteriores();
  const repertorio = getRepertorio();
  const repertorioSlugsSet = new Set(repertorio.map((r) => r.slug));

  await t.test('deve conter 12 temas prováveis catalogados', () => {
    assert.equal(temasProvaveis.length, 12);
  });

  await t.test('todos os repertorioSlugs citados nos temas prováveis devem existir no banco', () => {
    temasProvaveis.forEach((tema) => {
      assert.ok(Array.isArray(tema.repertorioSlugs), `repertorioSlugs não é array no tema ${tema.slug}`);
      assert.ok(tema.repertorioSlugs.length >= 6, `Tema ${tema.slug} deve ter pelo menos 6 repertórios vinculados`);

      tema.repertorioSlugs.forEach((slug) => {
        assert.ok(
          repertorioSlugsSet.has(slug),
          `Tema "${tema.slug}" referencia repertório inexistente: "${slug}"`
        );
      });
    });
  });

  await t.test('cada tema provável deve ter estrutura completa de redação', () => {
    temasProvaveis.forEach((tema) => {
      assert.ok(tema.teseCentral && tema.teseCentral.trim().length > 15, `Tese ausente no tema ${tema.slug}`);
      assert.ok(tema.argumentoD1?.titulo && tema.argumentoD1?.desenvolvimento, `D1 incompleto no tema ${tema.slug}`);
      assert.ok(tema.argumentoD2?.titulo && tema.argumentoD2?.desenvolvimento, `D2 incompleto no tema ${tema.slug}`);

      const prop = tema.propostaIntervencao;
      assert.ok(prop, `Proposta ausente no tema ${tema.slug}`);
      assert.ok(prop.agente, `Agente ausente na proposta do tema ${tema.slug}`);
      assert.ok(prop.acao, `Ação ausente na proposta do tema ${tema.slug}`);
      assert.ok(prop.meioModo, `Meio/modo ausente na proposta do tema ${tema.slug}`);
      assert.ok(prop.efeito, `Efeito ausente na proposta do tema ${tema.slug}`);
      assert.ok(prop.detalhamento, `Detalhamento ausente na proposta do tema ${tema.slug}`);
    });
  });

  await t.test('histórico deve conter exatamente os 16 temas de 2010 a 2025 sem saltos', () => {
    const anos = temasAnteriores.map((t) => t.ano).filter((a) => a >= 2010).sort((a, b) => a - b);
    assert.equal(anos.length, 16, `Esperados 16 temas anteriores de 2010 a 2025, encontrados: ${anos.length}`);

    for (let i = 0; i < 16; i++) {
      const esperado = 2010 + i;
      assert.equal(anos[i], esperado, `Lacuna de ano encontrada: esperado ${esperado}, recebido ${anos[i]}`);
    }
  });
});

