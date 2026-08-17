const LOCALES = {
  fr: 'fr-CH',
  de: 'de-CH',
};

export default {
  async fetch(request) {
    const response = await fetch(request);

    const segment = new URL(request.url).pathname.split('/')[1];
    const lang = LOCALES[segment];
    if (!lang) return response;

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;

    return new HTMLRewriter()
      .on('html', {
        element(el) {
          el.setAttribute('lang', lang);
        },
      })
      .transform(response);
  },
};
