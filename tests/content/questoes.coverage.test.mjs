import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuestoes } from '../helpers/load-data.mjs';

test('Cobertura dos 10 Anos do ENEM (2016 a 2025)', async (t) => {
  const questoes = getQuestoes();

  for (let ano = 2016; ano <= 2025; ano++) {
    await t.test(`Ano ${ano} deve ter 50 itens (5 Inglês, 5 Espanhol, 40 Português)`, () => {
      const doAno = questoes.filter((q) => q.ano === ano);
      assert.equal(doAno.length, 50, `Ano ${ano} deveria ter 50 questões, tem ${doAno.length}`);

      const ingles = doAno.filter((q) => q.idioma === 'Inglês');
      const espanhol = doAno.filter((q) => q.idioma === 'Espanhol');
      const portugues = doAno.filter((q) => q.idioma === 'Português');

      assert.equal(ingles.length, 5, `Ano ${ano} deve ter 5 questões de Inglês (tem ${ingles.length})`);
      assert.equal(espanhol.length, 5, `Ano ${ano} deve ter 5 questões de Espanhol (tem ${espanhol.length})`);
      assert.equal(portugues.length, 40, `Ano ${ano} deve ter 40 questões de Português (tem ${portugues.length})`);
    });
  }

  await t.test('todas as questões devem ter lista de ocorrências com cadernos válidos', () => {
    questoes.forEach((q) => {
      assert.ok(Array.isArray(q.ocorrencias), `Ocorrências não é array na questão ${q.id}`);
      assert.ok(q.ocorrencias.length >= 1, `Questão ${q.id} deve ter pelo menos 1 ocorrência registrada`);
      q.ocorrencias.forEach((oc) => {
        assert.ok(oc.cor && oc.cor.trim().length > 0, `Cor ausente na ocorrência da questão ${q.id}`);
        assert.ok(typeof oc.numeroQuestao === 'number' && oc.numeroQuestao > 0, `Número inválido na ocorrência da questão ${q.id}`);
      });
    });
  });
});

