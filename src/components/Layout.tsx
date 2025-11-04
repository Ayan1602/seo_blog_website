import { ReactNode } from 'react';
import { Menu, Search, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
}

export default function Layout({ children, currentPage }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <a href="/" className="text-2xl font-bold text-gray-900">SEO Master</a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </a>
              <a
                href="/blog"
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'blog' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Blog
              </a>
              <a
                href="/about"
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About
              </a>
              <a
                href="/contact"
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                aria-label="Search"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                aria-label="Open menu"
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SEO Master</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your complete guide to mastering search engine optimization and modern web development techniques.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
                <li><a href="/robots.txt" className="text-gray-400 hover:text-white transition-colors">Robots.txt</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">SEO Articles</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} SEO Master. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
