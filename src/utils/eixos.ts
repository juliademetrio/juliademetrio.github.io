export type EixoSlug =
  | 'cidadania-e-direitos'
  | 'educacao-e-conhecimento'
  | 'cultura-e-identidade'
  | 'meio-ambiente'
  | 'saude-e-sociedade'
  | 'tecnologia-e-redes'
  | 'trabalho-e-economia';

export interface EixoMeta {
  slug: EixoSlug;
  label: string;
  shortLabel: string;
  badgeClass: string;
  description: string;
}

export const EIXOS_TEMATICOS: Record<EixoSlug, EixoMeta> = {
  'cidadania-e-direitos': {
    slug: 'cidadania-e-direitos',
    label: 'Cidadania e Direitos Humanos',
    shortLabel: 'Cidadania e Direitos',
    badgeClass: 'badge-rose',
    description: 'Garantias constitucionais, proteção da infância, combate a violências, inclusão de minorias e acesso à justiça.',
  },
  'educacao-e-conhecimento': {
    slug: 'educacao-e-conhecimento',
    label: 'Educação e Conhecimento',
    shortLabel: 'Educação',
    badgeClass: 'badge-gold',
    description: 'Democratização do ensino, leitura crítica, inclusão de estudantes neurodivergentes, surdos e formação cidadã.',
  },
  'cultura-e-identidade': {
    slug: 'cultura-e-identidade',
    label: 'Cultura, Identidade e Patrimônio',
    shortLabel: 'Cultura e Identidade',
    badgeClass: 'badge-amber',
    description: 'Memória coletiva, valorização das matrizes indígenas e afro-brasileiras, patrimônio imaterial e acesso à arte.',
  },
  'meio-ambiente': {
    slug: 'meio-ambiente',
    label: 'Meio Ambiente e Sustentabilidade',
    shortLabel: 'Meio Ambiente',
    badgeClass: 'badge-sage',
    description: 'Justiça climática, racismo ambiental, deslocamentos por desastres extremos e preservação dos biomas.',
  },
  'saude-e-sociedade': {
    slug: 'saude-e-sociedade',
    label: 'Saúde e Sociedade',
    shortLabel: 'Saúde e Sociedade',
    badgeClass: 'badge-rose',
    description: 'Saúde mental na juventude, ludopatia e apostas digitais, medicalização da vida, envelhecimento e SUS.',
  },
  'tecnologia-e-redes': {
    slug: 'tecnologia-e-redes',
    label: 'Ciência, Tecnologia e Redes',
    shortLabel: 'Tecnologia e Redes',
    badgeClass: 'badge-slate',
    description: 'Inteligência artificial generativa, algoritmos, privacidade de dados, desinformação e impactos digitais.',
  },
  'trabalho-e-economia': {
    slug: 'trabalho-e-economia',
    label: 'Trabalho e Economia',
    shortLabel: 'Trabalho e Economia',
    badgeClass: 'badge-gold',
    description: 'Uberização e economia de plataformas, economia do cuidado, dignidade laboral e direitos previdenciários.',
  },
};

export const EIXOS_LIST: EixoMeta[] = Object.values(EIXOS_TEMATICOS);

export function getEixoMeta(slug: string): EixoMeta {
  return (
    EIXOS_TEMATICOS[slug as EixoSlug] || {
      slug: 'cidadania-e-direitos',
      label: slug,
      shortLabel: slug,
      badgeClass: 'badge-rose',
      description: '',
    }
  );
}
