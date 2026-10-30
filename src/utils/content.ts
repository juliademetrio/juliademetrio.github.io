import temasAnterioresRaw from '../content/temas-anteriores/temas-2010-2025.json';
import repertorioRaw from '../content/repertorio/acervo-repertorio.json';
import temasProvaveisRaw from '../content/temas-provaveis/apostas-enem.json';
import questoesComentadasRaw from '../content/exercicios/questoes-comentadas.json';
import type { EixoSlug } from './eixos';

export interface TemaAnterior {
  ano: number;
  edicao: string;
  fraseTema: string;
  eixo: EixoSlug;
  palavrasChave: string[];
  recorteBanca: string;
  comoTrabalhar: string;
}

export type RepertorioTipo =
  | 'Livro'
  | 'Filme / Série'
  | 'Documentário'
  | 'Filósofo / Sociólogo'
  | 'Lei / Documento'
  | 'Fato Histórico'
  | 'Música / Arte';

export interface RepertorioItem {
  slug: string;
  titulo: string;
  autoria: string;
  ano?: number;
  tipo: RepertorioTipo;
  eixos: EixoSlug[];
  sinopse: string;
  comoUsarNaRedacao: string;
}

export interface TemaProvavel {
  slug: string;
  titulo: string;
  fraseTemaSugerida: string;
  eixo: EixoSlug;
  destaque: boolean;
  palavrasChave: string[];
  porQuePodeCair: string;
  teseCentral: string;
  argumentoD1: {
    titulo: string;
    desenvolvimento: string;
  };
  argumentoD2: {
    titulo: string;
    desenvolvimento: string;
  };
  propostaIntervencao: {
    agente: string;
    detalhamento: string;
    acao: string;
    meioModo: string;
    efeito: string;
  };
  repertorioSlugs: string[];
}

export interface QuestaoComentada {
  id: string;
  caderno?: string;
  origem: string;
  categoria: string;
  habilidade: string;
  titulo: string;
  textoBase: string;
  referenciaTexto: string;
  enunciado: string;
  alternativas: { letra: string; texto: string }[];
  gabarito: string;
  comentarioPedagogico: string;
}

export function getTemasAnteriores(): TemaAnterior[] {
  return (temasAnterioresRaw as TemaAnterior[])
    .filter((t) => t.ano >= 2010)
    .sort((a, b) => b.ano - a.ano);
}

export function getRepertorio(): RepertorioItem[] {
  return repertorioRaw as RepertorioItem[];
}

export function getTemasProvaveis(): TemaProvavel[] {
  return temasProvaveisRaw as TemaProvavel[];
}

export function getQuestoesComentadas(): QuestaoComentada[] {
  return questoesComentadasRaw as QuestaoComentada[];
}

export function getRepertorioForTema(tema: TemaProvavel) {
  const all = getRepertorio();
  const map = new Map(all.map((item) => [item.slug, item]));
  const items = tema.repertorioSlugs
    .map((slug) => map.get(slug))
    .filter((item): item is RepertorioItem => Boolean(item));

  const livros = items.filter((i) => i.tipo === 'Livro');
  const filmes = items.filter((i) => i.tipo === 'Filme / Série' || i.tipo === 'Documentário');
  const textos = items.filter(
    (i) => i.tipo !== 'Livro' && i.tipo !== 'Filme / Série' && i.tipo !== 'Documentário',
  );

  return {
    todos: items,
    livros,
    filmes,
    textos,
  };
}
