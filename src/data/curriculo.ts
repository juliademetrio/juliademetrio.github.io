/**
 * Dados curriculares da professora.
 * Fonte única: docs/reference/Júlia Demetrio Xavier - Currículo.pdf
 */

export interface FormacaoItem {
  curso: string;
  instituicao: string;
  periodo: string;
  status: 'Em andamento' | 'Concluído';
}

export interface ExperienciaItem {
  cargo: string;
  instituicao?: string;
  periodo: string;
  atividades: string[];
}

export interface ServicoItem {
  slug: string;
  categoria: string;
  titulo: string;
  publicoAlvo: string;
  resumo: string;
  entregaveis: string[];
  mensagemWhatsApp: string;
}

export const CURRICULO = {
  nomeCompleto: 'Júlia Demetrio Xavier',
  tituloProfissional: 'Professora de Língua Portuguesa, Redação e Literatura',
  subtitulo: 'Ensino Fundamental II e Ensino Médio',
  resumoProfissional:
    'Professora de Língua Portuguesa, Redação e Literatura com experiência em docência para os anos finais do Ensino Fundamental e para o Ensino Médio. Atuação em planejamento pedagógico, elaboração de avaliações e provas, ensino de Língua Portuguesa e Redação, produção textual e correção de redações. Experiência com preparação para ENEM e ENCEJA, ensino das competências da redação modelo ENEM, conteúdos da área de Linguagens, gramática, Literatura e ensino de Português para estudantes estrangeiros. Formação em Letras pelo CEFET-MG, além de Mestrado em Estudos de Linguagem em andamento.',

  credenciaisDestaque: [
    { sigla: 'CEFET-MG', titulo: 'Mestrado em Estudos de Linguagem', subtitulo: 'Em andamento' },
    { sigla: 'IPB • Portugal', titulo: 'Intercâmbio interdisciplinar', subtitulo: 'Escola Superior de Educação' },
    { sigla: 'CEFET-MG', titulo: 'Graduação em Letras', subtitulo: 'Concluída em 2025' },
  ],

  formacao: [
    {
      curso: 'Mestrado em Estudos de Linguagem',
      instituicao: 'CEFET-MG',
      periodo: 'março de 2025 – atual',
      status: 'Em andamento',
    },
    {
      curso: 'Intercâmbio interdisciplinar - Escola Superior de Educação',
      instituicao: 'Universidade Politécnica de Bragança, Portugal',
      periodo: 'setembro de 2023 – fevereiro de 2024',
      status: 'Concluído',
    },
    {
      curso: 'Letras',
      instituicao: 'CEFET-MG',
      periodo: 'janeiro de 2020 – fevereiro de 2025',
      status: 'Concluído',
    },
  ] satisfies FormacaoItem[],

  experiencia: [
    {
      cargo: 'Professora de Língua Portuguesa e Redação',
      instituicao: 'Rede Decisão',
      periodo: 'outubro de 2025 – atual',
      atividades: [
        'Docência em Língua Portuguesa e Redação para o Ensino Fundamental II e Ensino Médio.',
        'Planejamento e organização de atividades pedagógicas voltadas ao desenvolvimento de competências de leitura, escrita e produção textual.',
        'Elaboração de provas e instrumentos de avaliação da aprendizagem.',
      ],
    },
    {
      cargo: 'Corretora de Redação Autônoma',
      periodo: '2025',
      atividades: [
        'Correção de redações da Prova Paraná Mais 2025 | IBGP Concursos (nov/2025).',
        'Correção de redações do Concurso para a Prefeitura de Betim/MG | IBGP Concursos (abr/2025).',
      ],
    },
    {
      cargo: 'Professora Voluntária — Projeto Escrita de Si',
      instituicao: 'CEFET-MG',
      periodo: 'maio de 2022 – agosto de 2023',
      atividades: [
        'Ensino de Língua Portuguesa para servidores terceirizados do CEFET-MG com preparação para ENEM e ENCEJA.',
        'Elaboração e correção de redações.',
        'Ensino das competências da redação modelo ENEM e dos principais conteúdos da área de Linguagens relacionados ao ENEM e ENCEJA.',
      ],
    },
    {
      cargo: 'Professora Voluntária — Projeto Português como Língua de Acolhimento',
      instituicao: 'CEFET-MG',
      periodo: 'fevereiro de 2022 – agosto de 2023',
      atividades: [
        'Ensino de Português para estrangeiros em turmas de nível intermediário.',
        'Desenvolvimento de conteúdos relacionados ao ensino de gramática da Língua Portuguesa e aspectos culturais.',
        'Atuação voltada ao desenvolvimento da comunicação em Língua Portuguesa para estudantes em processo de cidadania brasileira.',
      ],
    },
  ] satisfies ExperienciaItem[],

  servicos: [
    {
      slug: 'mentoria-redacao-enem',
      categoria: 'Redação ENEM',
      titulo: 'Mentoria e Correção de Redação ENEM',
      publicoAlvo: 'Estudantes do Ensino Médio e candidatos do ENEM',
      resumo:
        'Acompanhamento individualizado com correção detalhada nas 5 Competências da redação modelo ENEM, planejamento do projeto de texto e construção de repertório.',
      entregaveis: [
        'Correção por competência (C1 a C5) com indicação de melhorias',
        'Orientação na estrutura do texto dissertativo-argumentativo',
        'Encontros online para reescrita orientada',
      ],
      mensagemWhatsApp:
        'Olá, professora Júlia! Vim pelo seu site e gostaria de saber mais sobre a Mentoria e Correção de Redação para o ENEM.',
    },
    {
      slug: 'aulas-portugues-literatura',
      categoria: 'Aulas Particulares',
      titulo: 'Aulas Particulares de Português e Literatura',
      publicoAlvo: 'Alunos do Ensino Fundamental II e do Ensino Médio',
      resumo:
        'Aulas personalizadas de interpretação de texto, gramática contextualizada, produção textual e Literatura, com foco nas necessidades de cada estudante.',
      entregaveis: [
        'Plano de estudos adaptado às dificuldades do estudante',
        'Resolução comentada de questões de Linguagens',
        'Acompanhamento contínuo da evolução',
      ],
      mensagemWhatsApp:
        'Olá, professora Júlia! Vim pelo seu site e gostaria de informações sobre aulas particulares de Língua Portuguesa e Literatura.',
    },
    {
      slug: 'revisao-textual-abnt',
      categoria: 'Revisão & ABNT',
      titulo: 'Revisão Textual e Normalização Acadêmica (ABNT)',
      publicoAlvo: 'Graduandos, pós-graduandos e pesquisadores',
      resumo:
        'Revisão ortográfica, gramatical e estilística e adequação às normas da ABNT para TCCs, dissertações, artigos e relatórios.',
      entregaveis: [
        'Revisão de clareza, coesão, concordância, regência e pontuação',
        'Padronização de citações e referências segundo a ABNT',
        'Arquivo revisado com controle de alterações',
      ],
      mensagemWhatsApp:
        'Olá, Júlia! Vim pelo seu site e gostaria de solicitar um orçamento de Revisão Textual / Normalização Acadêmica (ABNT).',
    },
  ] satisfies ServicoItem[],
};
