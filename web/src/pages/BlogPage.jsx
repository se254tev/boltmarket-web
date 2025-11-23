import React, { useState } from 'react';
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';

/**
 * Blog Page
 * Displays blog posts with categories and search functionality
 */
function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'tips', 'news', 'tutorials', 'marketplace'];

  const posts = [
    {
      id: 1,
      title: '10 Tips to Sell Items Faster on Bolt Market',
      excerpt: 'Learn proven strategies to increase your sales and attract more buyers to your listings.',
      category: 'tips',
      date: 'Nov 15, 2024',
      image: '📚',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Bolt Market Launches New Analytics Dashboard',
      excerpt: 'Introducing enhanced analytics tools to help sellers track performance and optimize listings.',
      category: 'news',
      date: 'Nov 12, 2024',
      image: '📊',
      readTime: '4 min'
    },
    {
      id: 3,
      title: 'How to Spot and Avoid Scams When Buying Online',
      excerpt: 'A comprehensive guide to staying safe while shopping on online marketplaces.',
      category: 'tutorials',
      date: 'Nov 10, 2024',
      image: '🛡️',
      readTime: '7 min'
    },
    {
      id: 4,
      title: 'Rising Trends in Vintage Fashion Sales',
      excerpt: 'Discover what items are hot right now and how to capitalize on market trends.',
      category: 'marketplace',
      date: 'Nov 8, 2024',
      image: '👗',
      readTime: '6 min'
    },
    {
      id: 5,
      title: 'Mobile Commerce: Shopping on the Go',
      excerpt: 'How mobile-first shopping is changing the marketplace experience for buyers and sellers.',
      category: 'tips',
      date: 'Nov 5, 2024',
      image: '📱',
      readTime: '5 min'
    },
    {
      id: 6,
      title: 'Introducing Bulk Listing Tools for Pro Sellers',
      excerpt: 'Save time with our new bulk upload and management features for sellers.',
      category: 'news',
      date: 'Nov 1, 2024',
      image: '⚡',
      readTime: '4 min'
    },
    {
      id: 7,
      title: 'Photography Tips for Better Product Listings',
      excerpt: 'Improve your item photos with these simple but effective photography techniques.',
      category: 'tutorials',
      date: 'Oct 28, 2024',
      image: '📸',
      readTime: '6 min'
    },
    {
      id: 8,
      title: 'The Future of P2P Marketplaces',
      excerpt: 'Exploring how peer-to-peer commerce is reshaping retail and business.',
      category: 'marketplace',
      date: 'Oct 25, 2024',
      image: '🔮',
      readTime: '8 min'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Bolt Market Blog
          </h1>
          <p className="text-xl text-dark-600 mb-8">
            Tips, news, and insights for buying and selling on Bolt Market.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-white border-2 border-slate-200 rounded-lg p-3 max-w-2xl mx-auto shadow-sm">
            <Search size={20} className="text-dark-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-dark-900 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4">
          <Filter size={20} className="text-dark-600 flex-shrink-0" />
          <div className="flex gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all capitalize flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-200 text-dark-900 hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                {/* Image */}
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center text-6xl overflow-hidden">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {post.image}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold capitalize">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-dark-900 mb-3 font-display line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-dark-600 mb-4 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-dark-500 mb-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span>{post.readTime} read</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <button className="inline-flex items-center gap-2 text-primary-600 font-semibold group/btn hover:gap-3 transition-all">
                    Read More
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dark-600 text-lg mb-4">No articles found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark-900 mb-4 font-display">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-dark-600 mb-8">
            Get the latest tips, news, and marketplace insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="btn btn-primary font-semibold px-8 py-3 rounded-lg">
              Subscribe
            </button>
          </div>
          <p className="text-dark-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Popular Posts Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Most Read This Month
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="text-4xl mb-4">{post.image}</div>
              <h4 className="font-semibold text-dark-900 mb-2 line-clamp-2 font-display">
                {post.title}
              </h4>
              <p className="text-dark-600 text-sm mb-4">{post.readTime} read</p>
              <a href="#" className="text-primary-600 font-semibold text-sm hover:text-primary-700">
                Read →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
