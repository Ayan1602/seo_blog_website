import { useEffect } from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import { updateMetaTags, generateStructuredData } from '../utils/seo';

export default function About() {
  useEffect(() => {
    updateMetaTags({
      title: 'About Us - SEO Master | Expert SEO Resources & Education',
      description: 'Learn about SEO Master, your trusted source for search engine optimization education, tutorials, and best practices. We help businesses and individuals master digital marketing.',
      keywords: 'about SEO Master, SEO education, SEO experts, digital marketing team',
      ogType: 'website',
      canonical: window.location.origin + '/about'
    });

    generateStructuredData('Organization', {
      name: 'SEO Master',
      url: window.location.origin,
      description: 'Expert SEO resources and education platform',
      foundingDate: '2024',
      sameAs: [
        'https://twitter.com/seomaster',
        'https://linkedin.com/company/seomaster',
        'https://facebook.com/seomaster'
      ]
    });
  }, []);

  return (
    <Layout currentPage="about">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About SEO Master</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering businesses and individuals with expert knowledge and practical strategies to succeed in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At SEO Master, we believe that every website deserves to be discovered. Our mission is to democratize search engine optimization knowledge and make it accessible to everyone, from beginners to advanced practitioners.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We provide comprehensive, up-to-date resources that cover all aspects of modern SEO, including technical optimization, content strategy, link building, and performance optimization.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team of experienced SEO professionals and digital marketers work tirelessly to create high-quality content that helps you understand complex concepts and implement effective strategies.
              </p>
            </div>
            <div className="h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SEO Master</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Target className="h-8 w-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Knowledge</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of hands-on experience in SEO and digital marketing.
              </p>
            </article>

            <article className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">
                Join thousands of learners and practitioners sharing insights and best practices.
              </p>
            </article>

            <article className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Up-to-Date Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay current with the latest algorithm updates and industry trends.
              </p>
            </article>

            <article className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-red-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Our strategies have helped countless websites improve their rankings and traffic.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-blue-600 font-medium mb-2">SEO Strategist</p>
              <p className="text-gray-600 leading-relaxed">
                10+ years of experience helping businesses improve their organic search performance.
              </p>
            </article>

            <article className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Chen</h3>
              <p className="text-green-600 font-medium mb-2">Technical SEO Expert</p>
              <p className="text-gray-600 leading-relaxed">
                Specialist in technical optimization, site speed, and structured data implementation.
              </p>
            </article>

            <article className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
              <p className="text-orange-600 font-medium mb-2">Content Strategist</p>
              <p className="text-gray-600 leading-relaxed">
                Expert in creating SEO-optimized content that ranks well and engages readers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Start your SEO journey with us today and take your website to the next level.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>
    </Layout>
  );
}
