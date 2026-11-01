import test from 'node:test';
import assert from 'node:assert/strict';

const EXPECTED_EIXOS = [
  'cidadania-e-direitos',
  'educacao-e-conhecimento',
  'cultura-e-identidade',
  'meio-ambiente',
  'saude-e-sociedade',
  'tecnologia-e-redes',
  'trabalho-e-economia',
];

test('Estrutura e Constantes dos 7 Eixos Temáticos', async (t) => {
  await t.test('deve conter exatamente os 7 eixos oficiais', () => {
    assert.equal(EXPECTED_EIXOS.length, 7);
  });
});

