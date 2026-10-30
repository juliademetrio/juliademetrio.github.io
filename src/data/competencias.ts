export interface CompetenciaEnem {
  numero: number;
  titulo: string;
  pontuacaoMaxima: number;
  resumo: string;
  oQueAvalia: string[];
  errosComuns: string[];
  dicaDaProfessora: string;
}

export interface PassoRedacao {
  numero: number;
  etapa: 'Introdução' | 'Desenvolvimento (D1 e D2)' | 'Conclusão';
  titulo: string;
  descricao: string;
  exemploPratico: string;
}

export const COMPETENCIAS_ENEM: CompetenciaEnem[] = [
  {
    numero: 1,
    titulo: 'Domínio da modalidade escrita formal da língua portuguesa',
    pontuacaoMaxima: 200,
    resumo:
      'Avalia se o texto respeita as regras gramaticais, a convenção ortográfica, a regência, a concordância, a pontuação e a estrutura sintática dos períodos.',
    oQueAvalia: [
      'Ausência de truncamentos, justaposições indevidas e períodos excessivamente longos sem pontuação adequada.',
      'Precisão vocabular e registro formal (sem marcas de oralidade ou gírias).',
      'Domínio de crase, ortografia oficial, acentuação, concordância verbal/nominal e colocação pronominal.',
    ],
    errosComuns: [
      'Separar sujeito e predicado por vírgula.',
      'Deixar orações subordinadas soltas como se fossem períodos completos (truncamento).',
      'Usar expressões coloquiais ou clichês desgastados ("hoje em dia", "cada vez mais").',
    ],
    dicaDaProfessora:
      'Prefira períodos de extensão média (duas a três linhas no manuscrito). Ao revisar seu rascunho, leia silenciosamente observando se cada verbo concorda com o núcleo do sujeito.',
  },
  {
    numero: 2,
    titulo: 'Compreender a proposta de redação e aplicar conceitos das várias áreas do conhecimento',
    pontuacaoMaxima: 200,
    resumo:
      'Avalia a abordagem completa da frase-tema dentro da estrutura dissertativo-argumentativa e o uso de repertório sociocultural legítimo, pertinente e produtivo.',
    oQueAvalia: [
      'Presença de todas as palavras-chave e do recorte específico da proposta (evitando tangenciamento).',
      'Equilíbrio entre Introdução, Desenvolvimento e Conclusão em prosa argumentativa.',
      'Repertório sociocultural legitimado pelas áreas do saber e efetivamente articulado à discussão (uso produtivo).',
    ],
    errosComuns: [
      'Abordar apenas o assunto geral e esquecer o recorte temático específico da frase-tema.',
      'Inserir um "repertório de bolso" decorado sem conectá-lo diretamente à tese ou aos argumentos do parágrafo.',
      'Limitar-se a parafrasear os textos motivadores da prova.',
    ],
    dicaDaProfessora:
      'A Cartilha do ENEM alerta contra citações genéricas coladas sem vínculo real com o argumento. Sempre explique por que aquela obra, lei ou filósofo comprova o problema que você está denunciando no parágrafo.',
  },
  {
    numero: 3,
    titulo: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista',
    pontuacaoMaxima: 200,
    resumo:
      'Avalia o projeto de texto estratégico, a coerência argumentativa, o aprofundamento crítico e a ausência de lacunas ou contradições no desenvolvimento das teses.',
    oQueAvalia: [
      'Projeto de texto claro: as duas teses anunciadas na introdução são desenvolvidas, respectivamente, no D1 e no D2.',
      'Relação de causa e consequência bem explicada, sem saltos lógicos nem informações subentendidas.',
      'Juízo de valor explícito (marcas de autoria e posicionamento crítico diante do problema).',
    ],
    errosComuns: [
      'Apresentar um parágrafo meramente expositivo (que só descreve fatos sem criticar suas causas ou efeitos).',
      'Prometer duas causas na introdução e discutir outros fatores completamente diferentes nos desenvolvimentos.',
      'Fazer generalizações apressadas sem comprovação argumentativa.',
    ],
    dicaDaProfessora:
      'Não deixe que o corretor precise "adivinhar" a relação entre seu repertório e sua tese. Use verbos e adjetivos avaliativos ("negligência estatal", "entrave estrutural", "naturalização perversa") para marcar sua voz crítica.',
  },
  {
    numero: 4,
    titulo: 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação',
    pontuacaoMaxima: 200,
    resumo:
      'Avalia a coesão referencial (retomadas sem repetição viciosa) e a coesão sequencial (uso diversificado de conectivos inter e intraparágrafos).',
    oQueAvalia: [
      'Presença de conectivos interparágrafos (no início de pelo menos dois parágrafos: D1, D2 e Conclusão).',
      'Conectivos intraparágrafos articulando todas as frases dentro de cada parágrafo.',
      'Substituição lexical variada por meio de pronomes, sinônimos, hiperônimos e expressões metafóricas.',
    ],
    errosComuns: [
      'Repetir a mesma palavra ou o mesmo conectivo ("além disso", "portanto") várias vezes em linhas próximas.',
      'Empregar conectivo com valor semântico inadequado (ex.: usar "conquanto" pensando que significa "portanto").',
      'Iniciar parágrafo de desenvolvimento ou conclusão sem operador argumentativo.',
    ],
    dicaDaProfessora:
      'Garanta conectivos interparágrafos logo na primeira linha do D1 ("Sob esse viés,"), do D2 ("Ademais,") e da Conclusão ("Portanto,"), além de conectivos internos ligando cada período.',
  },
  {
    numero: 5,
    titulo: 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos',
    pontuacaoMaxima: 200,
    resumo:
      'Avalia a apresentação de uma solução concreta, detalhada e exequível para os problemas discutidos no D1 e no D2, contendo obrigatoriamente os 5 elementos válidos.',
    oQueAvalia: [
      '1. Agente: quem executará a ação (ex.: Ministério da Educação, Ministério da Saúde, Poder Legislativo, mídia, escolas).',
      '2. Ação: o que será feito concretamente (verbo de ação + medida prática, nunca apenas "conscientizar").',
      '3. Meio / Modo: como ou por meio de que recursos a ação será viabilizada ("por meio de...", "mediante...").',
      '4. Efeito: para que servirá a medida / resultado esperado ("a fim de...", "com o intuito de...").',
      '5. Detalhamento: explicação, exemplificação ou justificativa acoplada a um dos elementos anteriores.',
    ],
    errosComuns: [
      'Usar agentes vagos ("a gente", "alguém", "nós") ou ações genéricas ("deve-se tomar uma atitude").',
      'Esquecer o Meio/Modo ou o Detalhamento, perdendo 40 a 80 pontos na competência mais objetiva da prova.',
      'Propor intervenção apenas para um dos problemas e ignorar o segundo argumento desenvolvido.',
    ],
    dicaDaProfessora:
      'Faça um checklist mental dos 5 elementos na Conclusão: Agente + Detalhamento do agente (entre travessões ou vírgulas) + Ação prática + Meio/Modo ("por meio de...") + Efeito ("a fim de solucionar ambos os entraves").',
  },
];

export const DEZ_PASSOS_REDACAO: PassoRedacao[] = [
  {
    numero: 1,
    etapa: 'Introdução',
    titulo: 'Passo 1 — Repertório de Apresentação (Contextualização)',
    descricao:
      'Inicie a redação apresentando o tema por meio de uma alusão histórica, obra literária, filme, conceito filosófico ou norma constitucional (como a Constituição de 1988).',
    exemploPratico:
      'Ex.: "Na obra \'Cidadão de Papel\', o jornalista Gilberto Dimenstein denuncia que, embora o Brasil possua uma legislação avançada, muitos direitos permanecem restritos à teoria..."',
  },
  {
    numero: 2,
    etapa: 'Introdução',
    titulo: 'Passo 2 — Problematização e Recorte do Tema',
    descricao:
      'Conecte o repertório inicial à realidade brasileira atual, inserindo todas as palavras-chave da frase-tema proposta pela banca.',
    exemploPratico:
      'Ex.: "Fora da ficção / Sob essa ótica, observa-se que essa cidadania meramente formal reflete-se em [inserir frase-tema completa], configurando um grave desafio no país."',
  },
  {
    numero: 3,
    etapa: 'Introdução',
    titulo: 'Passo 3 — Apresentação das Teses (Tese 1 e Tese 2)',
    descricao:
      'Feche a introdução apontando claramente os dois fatores (causas ou desdobramentos) que serão analisados no D1 e no D2.',
    exemploPratico:
      'Ex.: "Nesse cenário, o impasse persiste não apenas pela negligência governamental [Tese 1], mas também pela invisibilidade social do problema [Tese 2]."',
  },
  {
    numero: 4,
    etapa: 'Desenvolvimento (D1 e D2)',
    titulo: 'Passo 4 — Tópico Frasal Argumentativo',
    descricao:
      'Comece o parágrafo com um conectivo interparágrafo ("Em primeira análise," no D1; "Ademais," no D2) e apresente em uma frase curta a tese que será defendida naquele parágrafo.',
    exemploPratico:
      'Ex.: "Em primeira análise, cabe pontuar que a atuação insuficiente do Poder Público agrava a problemática em questão."',
  },
  {
    numero: 5,
    etapa: 'Desenvolvimento (D1 e D2)',
    titulo: 'Passo 5 — Repertório Sociocultural Legitimado',
    descricao:
      'Fundamente seu tópico frasal com um pensador, livro, filme, estudo estatístico ou legislação pertinente ao eixo temático.',
    exemploPratico:
      'Ex.: "A esse respeito, o filósofo Thomas Hobbes, em \'O Leviatã\', defende que cabe ao Estado garantir o bem-estar e a ordem social por meio de instituições eficazes."',
  },
  {
    numero: 6,
    etapa: 'Desenvolvimento (D1 e D2)',
    titulo: 'Passo 6 — Argumentação Crítica e Aplicação à Realidade',
    descricao:
      'Relacione o repertório diretamente ao tema da redação, explicando causas, consequências e exemplos concretos do cotidiano brasileiro.',
    exemploPratico:
      'Ex.: "Contudo, no Brasil hodierno, tal dever estatal é descumprido na medida em que faltam políticas públicas de fiscalização e acolhimento, perpetuando a vulnerabilidade de milhares de cidadãos."',
  },
  {
    numero: 7,
    etapa: 'Desenvolvimento (D1 e D2)',
    titulo: 'Passo 7 — Fechamento Crítico do Parágrafo',
    descricao:
      'Conclua o parágrafo confirmando como aquela falha impede o pleno exercício dos direitos e exige transformação urgente.',
    exemploPratico:
      'Ex.: "Dessa forma, enquanto a máquina pública mantiver essa postura omissa, o entrave continuará longe de ser superado."',
  },
  {
    numero: 8,
    etapa: 'Conclusão',
    titulo: 'Passo 8 — Tópico Frasal Conclusivo',
    descricao:
      'Inicie com conectivo conclusivo ("Portanto,") reafirmando a urgência de medidas para reverter o quadro analisado.',
    exemploPratico:
      'Ex.: "Portanto, medidas urgentes são necessárias para enfrentar os desafios acerca de [retomar o tema]."',
  },
  {
    numero: 9,
    etapa: 'Conclusão',
    titulo: 'Passo 9 — Proposta de Intervenção com os 5 Elementos',
    descricao:
      'Apresente Agente, Ação, Meio/Modo, Efeito e Detalhamento, contemplando a resolução tanto da Tese 1 quanto da Tese 2.',
    exemploPratico:
      'Ex.: "Para tanto, cabe ao Ministério [Agente] — órgão responsável pela execução de políticas públicas na área [Detalhamento] — ampliar [Ação], por meio de [Meio/Modo], a fim de [Efeito]."',
  },
  {
    numero: 10,
    etapa: 'Conclusão',
    titulo: 'Passo 10 — Fechamento Retomando o Repertório da Introdução',
    descricao:
      'Finalize o texto com uma frase de síntese que retome o repertório usado na Introdução, demonstrando projeto de texto circular e autoral.',
    exemploPratico:
      'Ex.: "Assim, o Brasil superará a condição de \'Cidadão de Papel\' denunciada por Dimenstein e efetivará a dignidade prevista na Constituição."',
  },
];
