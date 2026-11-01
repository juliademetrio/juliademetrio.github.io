import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootDir = path.resolve(__dirname, '../../');

export function readJson(relPath) {
  const fullPath = path.join(rootDir, relPath);
  const text = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(text);
}

export function getQuestoes() {
  return readJson('src/content/exercicios/questoes-comentadas.json');
}

export function getRepertorio() {
  return readJson('src/content/repertorio/acervo-repertorio.json');
}

export function getTemasProvaveis() {
  return readJson('src/content/temas-provaveis/apostas-enem.json');
}

export function getTemasAnteriores() {
  return readJson('src/content/temas-anteriores/temas-2010-2025.json');
}
