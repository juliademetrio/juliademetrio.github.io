import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relPath) {
  const full = path.join(root, relPath);
  return JSON.parse(fs.readFileSync(full, 'utf-8'));
}

let errors = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ERRO: ${message}`);
    errors++;
  } else {
    console.log(`✅ OK: ${message}`);
  }
}

// 1. Verificar .gitignore
const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf-8');
assert(gitignore.includes('docs/reference/'), 'Pasta docs/reference/ está no .gitignore');

// 2. Verificar ausência de downloads no site
assert(!fs.existsSync(path.join(root, 'public', 'downloads')), 'Pasta public/downloads não existe (zero download de arquivos)');

// 3. Verificar restrições do currículo, intercâmbio, páginas e localização
const curriculoText = fs.readFileSync(path.join(root, 'src/data/curriculo.ts'), 'utf-8');
const siteText = fs.readFileSync(path.join(root, 'src/data/site.ts'), 'utf-8');
const resetCss = fs.readFileSync(path.join(root, 'src/styles/reset.css'), 'utf-8');

assert(resetCss.includes('[hidden]') && resetCss.includes('display: none !important'), 'CSS reset garante [hidden] { display: none !important; } para funcionamento de todos os filtros');
assert(!/Forma[çc][ãa]o em Doc[êe]ncia/i.test(curriculoText), 'Currículo não contém "Formação em Docência"');
assert(!/Bacharel/i.test(curriculoText) && !/Bacharel/i.test(siteText), 'Não contém o termo "Bacharel/Bacharelado"');
assert(!/Tecnologias de Edi[çc][ãa]o/i.test(curriculoText) && !/Tecnologias de Edi[çc][ãa]o/i.test(siteText), 'Graduação exibida apenas como Letras (sem "Tecnologias de Edição")');
assert(!/presencial/i.test(curriculoText) && !/presencial/i.test(siteText), 'Não contém menção a atendimento presencial');
assert(/Bragan[çc]a,\s*Portugal/i.test(curriculoText), 'Currículo inclui o intercâmbio na Universidade Politécnica de Bragança, Portugal');
assert(!/publicacoes\s*:/i.test(curriculoText), 'Currículo não contém seção de publicações inventadas');
assert(fs.existsSync(path.join(root, 'src/pages/sobre.astro')), 'Página consolidada src/pages/sobre.astro existe');
assert(!fs.existsSync(path.join(root, 'src/pages/servicos.astro')) && !fs.existsSync(path.join(root, 'src/pages/contato.astro')), 'Páginas avulsas /servicos e /contato foram unificadas em /sobre');

// 4. Verificar Temas Anteriores (2010 a 2025)
const temasAnteriores = readJson('src/content/temas-anteriores/temas-2010-2025.json');
assert(temasAnteriores.length === 16, `Existem 16 temas anteriores de 2010 a 2025 (encontrados: ${temasAnteriores.length})`);
assert(temasAnteriores.every((t) => t.ano >= 2010 && t.ano <= 2025), 'Todos os temas anteriores estão filtrados de 2010 em diante');

// 5. Verificar Repertório e Temas Prováveis
const repertorio = readJson('src/content/repertorio/acervo-repertorio.json');
const repMap = new Map(repertorio.map((r) => [r.slug, r]));
assert(repertorio.length >= 45, `Banco de repertório possui ${repertorio.length} itens cadastrados`);

const temasProvaveis = readJson('src/content/temas-provaveis/apostas-enem.json');
assert(temasProvaveis.length >= 12, `Catálogo possui ${temasProvaveis.length} temas prováveis`);

for (const tema of temasProvaveis) {
  const itens = tema.repertorioSlugs.map((s) => repMap.get(s)).filter(Boolean);
  const missing = tema.repertorioSlugs.filter((s) => !repMap.has(s));
  assert(missing.length === 0, `Tema "${tema.slug}" possui todos os repertorioSlugs válidos`);

  const livros = itens.filter((i) => i.tipo === 'Livro');
  const filmes = itens.filter((i) => i.tipo === 'Filme / Série' || i.tipo === 'Documentário');
  const textos = itens.filter((i) => i.tipo !== 'Livro' && i.tipo !== 'Filme / Série' && i.tipo !== 'Documentário');

  assert(
    livros.length >= 2 && filmes.length >= 2 && textos.length >= 2,
    `Tema "${tema.slug}" possui ${livros.length} livros, ${filmes.length} filmes/docs e ${textos.length} textos de repertório`,
  );
}

// 6. Verificar Questões Comentadas Online (todas as questões dos documentos da pasta linguagens)
const questoes = readJson('src/content/exercicios/questoes-comentadas.json');
assert(questoes.length >= 90, `Banco de questões online possui ${questoes.length} questões interativas comentadas (todas as questões dos materiais de Linguagens)`);
assert(
  questoes.every(
    (q) =>
      q.alternativas.length >= 4 &&
      q.alternativas.length <= 5 &&
      q.alternativas.some((a) => a.letra === q.gabarito),
  ),
  'Todas as questões possuem alternativas (A–D ou A–E) e gabarito oficial válido',
);

if (errors > 0) {
  console.error(`\nFalha na validação com ${errors} erro(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 Validação concluída com 100% de sucesso!');
}
