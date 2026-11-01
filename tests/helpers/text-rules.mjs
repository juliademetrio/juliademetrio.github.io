/**
 * Regras de Qualidade Textual do Acervo
 */

// Códigos de glifo residual do parse de PDF (ex: /g12, /g45)
export const GLYPH_CODE_REGEX = /\/g\d+/i;

// Caracteres corrompidos ou ligaturas problemáticas
export const CORRUPT_CHAR_REGEX = /[\uFFFD\u00AD\uFB00-\uFB06]/;

// Vazamento de cabeçalho / rodapé do caderno do INEP
export const INEP_LEAK_REGEX = /(\*SA[A-Z0-9_\-]+\*|LC\s*[-–]\s*1[ºªo]\s*dia|LC\s*[-–]\s*2[ºªo]\s*dia|Caderno\s+\d+|P1_1_Dia_LCT|INSTRUÇÕES PARA A REDAÇÃO|PROPOSTA DE REDAÇÃO)/i;

// Kerning quebrado (letras isoladas comuns em quebras artificiais de OCR: "c omo", "p ara")
export const BROKEN_KERNING_REGEX = /\b([a-zA-Z])\s+([a-zA-Z]{3,})\b/;

// URLs quebradas com espaço interno (ex: https:// .globo ou www. bbc)
export const BROKEN_URL_REGEX = /(https?:\/\/|www\.)\s+[a-z0-9]/i;

export function checkCleanText(str, context = '') {
  const issues = [];
  if (!str || typeof str !== 'string') return issues;

  if (GLYPH_CODE_REGEX.test(str)) {
    issues.push(`${context}: Contém código residual de glifo (/g\\d+)`);
  }
  if (CORRUPT_CHAR_REGEX.test(str)) {
    issues.push(`${context}: Contém caracteres de controle ou U+FFFD`);
  }
  if (INEP_LEAK_REGEX.test(str)) {
    issues.push(`${context}: Contém vazamento de rodapé/instruções do caderno do INEP`);
  }
  if (BROKEN_URL_REGEX.test(str)) {
    issues.push(`${context}: Contém URL com espaçamento corrompido`);
  }

  return issues;
}

