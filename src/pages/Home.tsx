import { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, Zap, Shield, Target } from 'lucide-react';
import Layout from '../components/Layout';
import { updateMetaTags, generateStructuredData } from '../utils/seo';
import { supabase, BlogPost } from '../lib/supabase';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    updateMetaTags({
      title: 'SEO Master - Learn Modern Search Engine Optimization Techniques',
      description: 'Master SEO with our comprehensive guides, tutorials, and best practices. Learn on-page, technical, and off-page optimization strategies to rank higher in search engines.',
      keywords: 'SEO, search engine optimization, SEO tutorial, SEO guide, digital marketing, web development',
      ogType: 'website',
      canonical: window.location.origin + '/',
      author: 'SEO Master Team'
    });

    generateStructuredData('WebSite', {
      name: 'SEO Master',
      url: window.location.origin,
      description: 'Learn modern search engine optimization techniques and web development best practices',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: window.location.origin + '/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    });

    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) {
      setRecentPosts(data);
    }
  };

  return (
    <Layout currentPage="home">
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master SEO & Boost Your Online Presence
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Learn proven search engine optimization techniques, modern web development practices, and performance optimization strategies to rank higher and reach more customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why SEO Matters for Your Website
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Increase Traffic</h3>
              <p className="text-gray-600 leading-relaxed">
                Rank higher in search results and attract more organic visitors to your website without paid advertising.
              </p>
            </article>

            <article className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Target className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reach Your Audience</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with users actively searching for your products, services, or information.
              </p>
            </article>

            <article className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Zap className="h-8 w-8 text-orange-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Better Performance</h3>
              <p className="text-gray-600 leading-relaxed">
                SEO practices improve page speed, user experience, and overall website performance.
              </p>
            </article>

            <article className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Credibility</h3>
              <p className="text-gray-600 leading-relaxed">
                Higher rankings establish trust and authority in your industry or niche.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest SEO Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest tips, techniques, and best practices in search engine optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your SEO?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get started with our comprehensive guides and tutorials. Learn everything from basic concepts to advanced techniques.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
