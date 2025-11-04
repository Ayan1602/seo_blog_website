import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Layout from '../components/Layout';
import { updateMetaTags, generateStructuredData } from '../utils/seo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: 'Contact Us - Get in Touch | SEO Master',
      description: 'Have questions about SEO? Contact our team of experts for help with your search engine optimization needs. We are here to help you succeed.',
      keywords: 'contact SEO Master, SEO help, SEO consultation, get in touch',
      ogType: 'website',
      canonical: window.location.origin + '/contact'
    });

    generateStructuredData('ContactPage', {
      name: 'Contact SEO Master',
      description: 'Get in touch with our SEO experts'
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout currentPage="contact">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about SEO? Our team is here to help you achieve your digital marketing goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Send className="h-8 w-8 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                        placeholder="Tell us more about your SEO needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:info@seomaster.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                        info@seomaster.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600 transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <address className="text-gray-600 not-italic leading-relaxed">
                        123 SEO Street<br />
                        Digital City, DC 12345<br />
                        United States
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <article className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to see SEO results?</h3>
              <p className="text-gray-600 leading-relaxed">
                SEO is a long-term strategy. Typically, you can start seeing improvements in 3-6 months, with significant results appearing after 6-12 months of consistent optimization.
              </p>
            </article>

            <article className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer SEO consulting services?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide personalized SEO consulting for businesses of all sizes. Contact us to discuss your specific needs and goals.
              </p>
            </article>

            <article className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What makes your SEO content different?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our content is created by experienced SEO professionals who stay updated with the latest algorithm changes and industry best practices. We focus on practical, actionable advice.
              </p>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}
