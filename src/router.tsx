import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const url = new URL(anchor.href);
        window.history.pushState({}, '', url.pathname);
        setCurrentPath(url.pathname);
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (currentPath === '/') {
    return <Home />;
  }

  if (currentPath === '/blog') {
    return <Blog />;
  }

  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '');
    return <BlogPost slug={slug} />;
  }

  if (currentPath === '/about') {
    return <About />;
  }

  if (currentPath === '/contact') {
    return <Contact />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
          Go back home
        </a>
      </div>
    </div>
  );
}
