import { useEffect, useState } from 'react';
import { Clock, Eye, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { updateMetaTags, generateStructuredData } from '../utils/seo';
import { supabase, BlogPost } from '../lib/supabase';

interface BlogPostProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (data) {
      setPost(data);

      updateMetaTags({
        title: `${data.title} | SEO Master`,
        description: data.meta_description || data.excerpt,
        keywords: data.meta_keywords || '',
        ogType: 'article',
        canonical: window.location.origin + '/blog/' + data.slug,
        author: data.author,
        ogImage: data.featured_image
      });

      generateStructuredData('Article', {
        headline: data.title,
        description: data.meta_description || data.excerpt,
        author: {
          '@type': 'Person',
          name: data.author
        },
        datePublished: data.created_at,
        dateModified: data.updated_at,
        image: data.featured_image || undefined,
        publisher: {
          '@type': 'Organization',
          name: 'SEO Master',
          logo: {
            '@type': 'ImageObject',
            url: window.location.origin + '/logo.png'
          }
        }
      });

      await supabase
        .from('blog_posts')
        .update({ views: data.views + 1 })
        .eq('id', data.id);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <Layout currentPage="blog">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout currentPage="blog">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            Back to Blog
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="blog">
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            Back to Blog
          </a>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                {post.reading_time} min read
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                {post.views.toLocaleString()} views
              </span>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-8"></div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.meta_keywords && post.meta_keywords.split(',').map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          </footer>
        </div>
      </article>

      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/blog" className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View All Articles</h3>
              <p className="text-gray-600 text-sm">Explore more SEO tips and tutorials</p>
            </a>
            <a href="/contact" className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get in Touch</h3>
              <p className="text-gray-600 text-sm">Have questions? Contact our team</p>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
