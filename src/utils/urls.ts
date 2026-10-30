/**
 * Resolve caminhos internos respeitando o `base` configurado no Astro (GitHub Pages).
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/**
 * Monta link oficial para o WhatsApp com mensagem pré-preenchida.
 */
export function buildWhatsAppUrl(phoneE164: string, message: string): string {
  const cleanPhone = phoneE164.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
