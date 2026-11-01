import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuestoes } from '../helpers/load-data.mjs';

test('Schema e Integridade Estrutural das Questões', async (t) => {
  const questoes = getQuestoes();

  await t.test('deve conter exatamente 500 questões deduplicadas (50 por ano)', () => {
    assert.equal(questoes.length, 500);
  });

  await t.test('todos os IDs devem ser únicos e não vazios', () => {
    const ids = new Set();
    questoes.forEach((q) => {
      assert.ok(q.id && typeof q.id === 'string' && q.id.trim().length > 0, `ID inválido em questão: ${JSON.stringify(q)}`);
      assert.ok(!ids.has(q.id), `ID duplicado detectado: ${q.id}`);
      ids.add(q.id);
    });
  });

  await t.test('cada questão deve ter ano entre 2016 e 2025', () => {
    questoes.forEach((q) => {
      assert.ok(q.ano >= 2016 && q.ano <= 2025, `Ano inválido na questão ${q.id}: ${q.ano}`);
    });
  });

  await t.test('cada questão deve ter exatamente 5 alternativas (A a E)', () => {
    const expectedLetters = ['A', 'B', 'C', 'D', 'E'];
    questoes.forEach((q) => {
      assert.ok(Array.isArray(q.alternativas), `Alternativas não são array na questão ${q.id}`);
      assert.equal(q.alternativas.length, 5, `Questão ${q.id} deve ter 5 alternativas`);

      const letters = q.alternativas.map((a) => a.letra);
      assert.deepEqual(letters, expectedLetters, `Letras incorretas na questão ${q.id}: ${letters.join(', ')}`);

      q.alternativas.forEach((a) => {
        assert.ok(a.texto && a.texto.trim().length > 0, `Texto da alternativa ${a.letra} vazio na questão ${q.id}`);
      });
    });
  });

  await t.test('cada questão deve ter gabarito válido presente nas alternativas', () => {
    questoes.forEach((q) => {
      assert.ok(['A', 'B', 'C', 'D', 'E'].includes(q.gabarito), `Gabarito inválido na questão ${q.id}: ${q.gabarito}`);
      const temLetra = q.alternativas.some((a) => a.letra === q.gabarito);
      assert.ok(temLetra, `Gabarito ${q.gabarito} não encontrado nas alternativas da questão ${q.id}`);
    });
  });

  await t.test('cada questão deve ter comentário pedagógico substantivo', () => {
    questoes.forEach((q) => {
      assert.ok(
        q.comentarioPedagogico && q.comentarioPedagogico.trim().length >= 40,
        `Comentário pedagógico muito curto na questão ${q.id}`
      );
    });
  });

  await t.test('cada questão deve ter idioma válido e categoria', () => {
    const validIdiomas = ['Português', 'Inglês', 'Espanhol'];
    questoes.forEach((q) => {
      assert.ok(validIdiomas.includes(q.idioma), `Idioma inválido na questão ${q.id}: ${q.idioma}`);
      assert.ok(q.categoria && q.categoria.trim().length > 0, `Categoria ausente na questão ${q.id}`);
      assert.ok(q.enunciado && q.enunciado.trim().length > 0, `Enunciado ausente na questão ${q.id}`);
    });
  });
});

