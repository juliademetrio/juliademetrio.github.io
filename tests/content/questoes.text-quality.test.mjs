import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuestoes } from '../helpers/load-data.mjs';
import { checkCleanText } from '../helpers/text-rules.mjs';

test('Qualidade Textual do Acervo de Questões', async (t) => {
  const questoes = getQuestoes();

  await t.test('nenhum campo de texto deve conter glifos residuais ou caracteres corrompidos', () => {
    const allIssues = [];

    questoes.forEach((q) => {
      const qContext = `[${q.id}]`;
      allIssues.push(...checkCleanText(q.titulo, `${qContext} titulo`));
      allIssues.push(...checkCleanText(q.textoBase, `${qContext} textoBase`));
      allIssues.push(...checkCleanText(q.enunciado, `${qContext} enunciado`));
      allIssues.push(...checkCleanText(q.comentarioPedagogico, `${qContext} comentarioPedagogico`));

      q.alternativas.forEach((alt) => {
        allIssues.push(...checkCleanText(alt.texto, `${qContext} alt ${alt.letra}`));
      });
    });

    assert.equal(allIssues.length, 0, `Problemas de qualidade textual detectados:\n${allIssues.slice(0, 10).join('\n')}`);
  });

  await t.test('as alternativas de cada questão devem ser mutuamente exclusivas (sem duplicação de texto)', () => {
    questoes.forEach((q) => {
      const texts = q.alternativas.map((a) => a.texto.trim().toLowerCase());
      const uniqueTexts = new Set(texts);
      assert.equal(
        uniqueTexts.size,
        5,
        `Questão ${q.id} possui alternativas com texto repetido: ${JSON.stringify(texts)}`
      );
    });
  });

  await t.test('as alternativas não devem conter a letra repetida no início do texto (ex: "A) A proposta...")', () => {
    questoes.forEach((q) => {
      q.alternativas.forEach((alt) => {
        // Detecta prefixos como "A)", "A -", "A.", "B " (para B, C, D, E onde não é artigo gramatical)
        const prefixRegex = new RegExp(`^${alt.letra}[\\).:\\-]\\s*|^[B-Eb-e]\\s+`, 'u');
        assert.ok(
          !prefixRegex.test(alt.texto),
          `Questão ${q.id} alternativa ${alt.letra} repete a própria letra no início: "${alt.texto}"`
        );
      });
    });
  });

  await t.test('o enunciado deve ter comprimento razoável e não ser genérico', () => {
    questoes.forEach((q) => {
      assert.ok(
        q.enunciado.length >= 10,
        `Enunciado excessivamente curto na questão ${q.id}: "${q.enunciado}"`
      );
    });
  });

  await t.test('nenhum campo de texto deve conter sintaxe Markdown de imagem ou caminhos de arquivos indevidos', () => {
    const markdownImgRegex = /!\[.*?\]\(.*?\)/;
    const pathRegex = /\/(src\/assets|assets\/questoes)\/[^\s)]+\.(jpg|png|webp|gif)/i;

    questoes.forEach((q) => {
      const qContext = `[${q.id}]`;
      const textFields = [
        { name: 'titulo', val: q.titulo },
        { name: 'textoBase', val: q.textoBase },
        { name: 'referenciaTexto', val: q.referenciaTexto },
        { name: 'enunciado', val: q.enunciado },
        { name: 'comentarioPedagogico', val: q.comentarioPedagogico },
      ];

      textFields.forEach(({ name, val }) => {
        if (!val) return;
        assert.ok(
          !markdownImgRegex.test(val),
          `${qContext} campo "${name}" contém sintaxe Markdown de imagem indevida: "${val.slice(0, 100)}..."`
        );
        assert.ok(
          !pathRegex.test(val),
          `${qContext} campo "${name}" contém caminho de arquivo indevido: "${val.slice(0, 100)}..."`
        );
      });

      q.alternativas.forEach((alt) => {
        assert.ok(
          !markdownImgRegex.test(alt.texto),
          `${qContext} alternativa ${alt.letra} contém sintaxe Markdown de imagem: "${alt.texto}"`
        );
        assert.ok(
          !pathRegex.test(alt.texto),
          `${qContext} alternativa ${alt.letra} contém caminho de arquivo: "${alt.texto}"`
        );
      });

      if (Array.isArray(q.imagens)) {
        q.imagens.forEach((img, idx) => {
          assert.ok(
            !markdownImgRegex.test(img.alt),
            `${qContext} imagem[${idx}].alt contém sintaxe Markdown: "${img.alt}"`
          );
          assert.ok(
            !pathRegex.test(img.alt),
            `${qContext} imagem[${idx}].alt contém caminho de arquivo: "${img.alt}"`
          );
        });
      }
    });
  });

  await t.test('todas as imagens devem possuir texto descritivo (alt) substantivo e não genérico', () => {
    const genericAltRegex = /^(figura|imagem|foto|ilustra[çc][ãa]o)(\s+de\s+apoio|\s+da\s+quest[ãa]o)?\s*(do\s+enem\s*\d*)?$/i;

    let countWithImgs = 0;
    questoes.forEach((q) => {
      if (Array.isArray(q.imagens) && q.imagens.length > 0) {
        countWithImgs++;
        q.imagens.forEach((img, idx) => {
          assert.ok(
            img.arquivo && typeof img.arquivo === 'string' && img.arquivo.trim().length > 0,
            `Questão ${q.id} imagem[${idx}] sem nome de arquivo válido`
          );
          assert.ok(
            img.alt && typeof img.alt === 'string' && img.alt.trim().length >= 20,
            `Questão ${q.id} imagem[${idx}] com texto alternativo (alt) insuficiente ou muito curto: "${img.alt}"`
          );
          assert.ok(
            !genericAltRegex.test(img.alt.trim()),
            `Questão ${q.id} imagem[${idx}] possui texto alternativo (alt) genérico proibido: "${img.alt}"`
          );
        });
      }
    });

    assert.ok(countWithImgs >= 100, `Esperado pelo menos 100 questões com imagens, encontradas: ${countWithImgs}`);
  });
});
