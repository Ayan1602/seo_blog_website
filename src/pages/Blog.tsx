import { useEffect, useState } from 'react';
import { Clock, Eye } from 'lucide-react';
import Layout from '../components/Layout';
import { updateMetaTags, generateStructuredData } from '../utils/seo';
import { supabase, BlogPost } from '../lib/supabase';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateMetaTags({
      title: 'SEO Blog - Latest Articles & Tutorials | SEO Master',
      description: 'Explore our collection of SEO articles, tutorials, and guides. Learn about on-page optimization, technical SEO, link building, and more.',
      keywords: 'SEO blog, SEO articles, SEO tutorials, search optimization, digital marketing blog',
      ogType: 'website',
      canonical: window.location.origin + '/blog'
    });

    generateStructuredData('Blog', {
      name: 'SEO Master Blog',
      description: 'Expert articles and tutorials on search engine optimization',
      url: window.location.origin + '/blog'
    });

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  return (
    <Layout currentPage="blog">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">SEO Blog</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover proven strategies, expert insights, and practical tips to improve your search engine rankings and online visibility.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                    >
                      <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                          <time dateTime={post.created_at}>
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                            {post.reading_time} min read
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                            {post.views.toLocaleString()} views
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                          <a href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                          </a>
                        </h2>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">By {post.author}</span>
                          <a
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Read Article
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      <a href="#" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                        On-Page SEO
                      </a>
                      <a href="#" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
                        Technical SEO
                      </a>
                      <a href="#" className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors">
                        Link Building
                      </a>
                      <a href="#" className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors">
                        Content Strategy
                      </a>
                      <a href="#" className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors">
                        Analytics
                      </a>
                    </div>
                  </div>

                  <div className="bg-blue-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
                    <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                      Get the latest SEO tips and insights delivered to your inbox.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-lg text-gray-900"
                        aria-label="Email address"
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
