import test from 'node:test';
import assert from 'node:assert/strict';

function buildWhatsAppUrl(phoneE164, message) {
  const cleanPhone = phoneE164.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

function resolveUrl(path, base = '') {
  const cleanBase = base.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${clean}` || '/';
}

test('Utilitários de URLs e WhatsApp', async (t) => {
  await t.test('buildWhatsAppUrl deve sanitizar o número e codificar a mensagem', () => {
    const url = buildWhatsAppUrl('+55 (31) 98888-7777', 'Olá! Gostaria de informações.');
    assert.ok(url.startsWith('https://wa.me/5531988887777?text='));
    assert.ok(url.includes('Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es.'));
  });

  await t.test('resolveUrl deve normalizar barras e respeitar base path', () => {
    assert.equal(resolveUrl('/enem/simulado', ''), '/enem/simulado');
    assert.equal(resolveUrl('enem/simulado', ''), '/enem/simulado');
    assert.equal(resolveUrl('/enem/simulado', '/juliademetrio'), '/juliademetrio/enem/simulado');
  });
});

