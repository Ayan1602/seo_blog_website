interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  author?: string;
}

export function updateMetaTags(config: SEOConfig) {
  document.title = config.title;

  const metaTags: MetaTag[] = [
    { name: 'description', content: config.description },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.ogType || 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
  ];

  if (config.keywords) {
    metaTags.push({ name: 'keywords', content: config.keywords });
  }

  if (config.ogImage) {
    metaTags.push({ property: 'og:image', content: config.ogImage });
    metaTags.push({ name: 'twitter:image', content: config.ogImage });
  }

  if (config.author) {
    metaTags.push({ name: 'author', content: config.author });
  }

  if (config.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = config.canonical;
  }

  metaTags.forEach(tag => {
    const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
    let element = document.querySelector(selector) as HTMLMetaElement;

    if (!element) {
      element = document.createElement('meta');
      if (tag.name) element.name = tag.name;
      if (tag.property) element.setAttribute('property', tag.property);
      document.head.appendChild(element);
    }
    element.content = tag.content;
  });
}

export function generateStructuredData(type: string, data: Record<string, unknown>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  });

  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  document.head.appendChild(script);
}
