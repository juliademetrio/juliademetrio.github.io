import test from 'node:test';
import assert from 'node:assert/strict';

function matchesQuestion(q, anoFilter, idiomaFilter, catFilter, query) {
  const qAno = String(q.ano || 2025);
  const qIdioma = q.idioma || 'Português';
  const qCat = q.categoria;

  const matchAno = anoFilter === 'Todos os anos' || qAno === anoFilter;
  const matchIdioma = idiomaFilter === 'Todos os idiomas' || qIdioma === idiomaFilter;
  const matchCat = catFilter === 'Todas as categorias' || qCat === catFilter;
  const matchQuery = !query || (q._search ? q._search.includes(query) : true);

  return matchAno && matchIdioma && matchCat && matchQuery;
}

function sortQuestionsByDefault(list) {
  return [...list].sort((a, b) => {
    const anoDiff = (b.ano || 2025) - (a.ano || 2025);
    if (anoDiff !== 0) return anoDiff;
    return (a.numeroQuestao || 0) - (b.numeroQuestao || 0);
  });
}

test('Lógica de Filtros e Ordenação Decrescente por Ano', async (t) => {
  const mockQuestao = {
    id: 'enem-2023-q01-ingles',
    ano: 2023,
    numeroQuestao: 1,
    idioma: 'Inglês',
    categoria: 'Língua Estrangeira (Inglês)',
    _search: 'enem 2023 cartaz alimento desperdício',
  };

  await t.test('deve filtrar corretamente por ano', () => {
    assert.ok(matchesQuestion(mockQuestao, '2023', 'Todos os idiomas', 'Todas as categorias', ''));
    assert.ok(!matchesQuestion(mockQuestao, '2022', 'Todos os idiomas', 'Todas as categorias', ''));
  });

  await t.test('deve filtrar corretamente por idioma', () => {
    assert.ok(matchesQuestion(mockQuestao, 'Todos os anos', 'Inglês', 'Todas as categorias', ''));
    assert.ok(!matchesQuestion(mockQuestao, 'Todos os anos', 'Espanhol', 'Todas as categorias', ''));
    assert.ok(!matchesQuestion(mockQuestao, 'Todos os anos', 'Português', 'Todas as categorias', ''));
  });

  await t.test('deve ordenar por padrão em ordem decrescente pelo ano da prova e crescente pelo número da questão', () => {
    const sample = [
      { id: 'q-2016-2', ano: 2016, numeroQuestao: 2 },
      { id: 'q-2025-10', ano: 2025, numeroQuestao: 10 },
      { id: 'q-2025-1', ano: 2025, numeroQuestao: 1 },
      { id: 'q-2021-5', ano: 2021, numeroQuestao: 5 },
    ];
    const sorted = sortQuestionsByDefault(sample);
    assert.deepEqual(
      sorted.map((q) => q.id),
      ['q-2025-1', 'q-2025-10', 'q-2021-5', 'q-2016-2']
    );
  });
});


