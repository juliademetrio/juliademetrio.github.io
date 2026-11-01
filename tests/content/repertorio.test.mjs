import test from 'node:test';
import assert from 'node:assert/strict';
import { getRepertorio } from '../helpers/load-data.mjs';
import { checkCleanText } from '../helpers/text-rules.mjs';

test('Banco de Repertório Sociocultural', async (t) => {
  const repertorio = getRepertorio();

  await t.test('deve conter pelo menos 70 itens cadastrados', () => {
    assert.ok(repertorio.length >= 70, `Quantidade insuficiente de repertórios: ${repertorio.length}`);
  });

  await t.test('todos os slugs devem ser únicos e válidos', () => {
    const slugs = new Set();
    repertorio.forEach((item) => {
      assert.ok(item.slug && typeof item.slug === 'string', `Slug inválido: ${JSON.stringify(item)}`);
      assert.ok(!slugs.has(item.slug), `Slug duplicado no repertório: ${item.slug}`);
      slugs.add(item.slug);
    });
  });

  await t.test('cada item deve ter campos obrigatórios preenchidos', () => {
    const validTipos = [
      'Livro',
      'Filme / Série',
      'Documentário',
      'Filósofo / Sociólogo',
      'Lei / Documento',
      'Fato Histórico',
      'Música / Arte',
    ];

    repertorio.forEach((item) => {
      assert.ok(item.titulo && item.titulo.trim().length > 0, `Título ausente no item ${item.slug}`);
      assert.ok(item.autoria && item.autoria.trim().length > 0, `Autoria ausente no item ${item.slug}`);
      assert.ok(validTipos.includes(item.tipo), `Tipo inválido no item ${item.slug}: ${item.tipo}`);
      assert.ok(Array.isArray(item.eixos) && item.eixos.length > 0, `Eixos ausentes no item ${item.slug}`);
      assert.ok(item.sinopse && item.sinopse.trim().length > 20, `Sinopse insuficiente no item ${item.slug}`);
      assert.ok(
        item.comoUsarNaRedacao && item.comoUsarNaRedacao.trim().length > 20,
        `comoUsarNaRedacao insuficiente no item ${item.slug}`
      );
    });
  });

  await t.test('não deve conter glifos corrompidos ou links inválidos nos textos', () => {
    const issues = [];
    repertorio.forEach((item) => {
      const ctx = `[Repertorio: ${item.slug}]`;
      issues.push(...checkCleanText(item.titulo, `${ctx} titulo`));
      issues.push(...checkCleanText(item.sinopse, `${ctx} sinopse`));
      issues.push(...checkCleanText(item.comoUsarNaRedacao, `${ctx} comoUsarNaRedacao`));
    });
    assert.equal(issues.length, 0, `Problemas encontrados no repertório:\n${issues.join('\n')}`);
  });
});

