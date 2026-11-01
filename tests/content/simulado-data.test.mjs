import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuestoes } from '../helpers/load-data.mjs';

test('Geração de Simulados e Dados da Prova', async (t) => {
  const questoes = getQuestoes();

  for (let ano = 2016; ano <= 2025; ano++) {
    for (const lingua of ['Inglês', 'Espanhol']) {
      await t.test(`deve gerar simulado completo de 45 questões para ENEM ${ano} (${lingua})`, () => {
        const doAno = questoes.filter((q) => q.ano === ano);
        const le = doAno.filter((q) => q.idioma === lingua);
        const gerais = doAno.filter((q) => q.idioma === 'Português');

        assert.equal(le.length, 5, `ENEM ${ano} não possui 5 questões de ${lingua}`);
        assert.equal(gerais.length, 40, `ENEM ${ano} não possui 40 questões gerais`);

        const provaFinal = [...le, ...gerais];
        assert.equal(provaFinal.length, 45, `Prova montada para ${ano} (${lingua}) não tem 45 questões`);

        // Garantir IDs únicos
        const ids = new Set(provaFinal.map((q) => q.id));
        assert.equal(ids.size, 45, `Questões duplicadas na montagem da prova ${ano} (${lingua})`);
      });
    }
  }

  await t.test('deve ser possível montar simulado aleatório de 45 questões com língua estrangeira', () => {
    for (const lingua of ['Inglês', 'Espanhol']) {
      const lePool = questoes.filter((q) => q.idioma === lingua);
      const geraisPool = questoes.filter((q) => q.idioma === 'Português');

      assert.ok(lePool.length >= 50, `Pool de ${lingua} deveria ter pelo menos 50 questões`);
      assert.ok(geraisPool.length >= 400, `Pool de Português deveria ter pelo menos 400 questões`);

      const leSelected = lePool.slice(0, 5);
      const geraisSelected = geraisPool.slice(0, 40);
      const simuladoAleatorio = [...leSelected, ...geraisSelected];

      assert.equal(simuladoAleatorio.length, 45);
    }
  });
});

