import React from 'react';
import { FileText, TrendingUp, Award, Newspaper } from 'lucide-react';

/**
 * Press Page
 * Press releases, media kit, awards, and media mentions
 */
function PressPage() {
  const releases = [
    {
      id: 1,
      title: 'Bolt Market Reaches 5 Million Active Users Milestone',
      date: 'Nov 20, 2024',
      excerpt: 'Leading peer-to-peer marketplace announces significant growth in global user base.',
      category: 'Milestone',
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      id: 2,
      title: 'Bolt Market Introduces Advanced Analytics Dashboard',
      date: 'Nov 10, 2024',
      excerpt: 'New tools help sellers track performance and optimize their listings with real-time data.',
      category: 'Product',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 3,
      title: 'Series B Funding Round Closes at $150 Million',
      date: 'Oct 28, 2024',
      excerpt: 'Bolt Market secures major investment to accelerate expansion and innovation.',
      category: 'Funding',
      color: 'bg-amber-50 border-amber-200'
    },
    {
      id: 4,
      title: 'Expanding Operations to 15 New Countries',
      date: 'Oct 15, 2024',
      excerpt: 'Bolt Market now available in over 150 countries, connecting buyers and sellers worldwide.',
      category: 'Expansion',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      id: 5,
      title: 'Bolt Market Named Best Marketplace Platform 2024',
      date: 'Oct 1, 2024',
      excerpt: 'Recognized for innovation, security, and customer satisfaction by industry leaders.',
      category: 'Award',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 6,
      title: 'Partnership Announced with Global Payment Provider',
      date: 'Sep 20, 2024',
      excerpt: 'Strategic partnership enhances payment options and seller convenience globally.',
      category: 'Partnership',
      color: 'bg-cyan-50 border-cyan-200'
    }
  ];

  const mediaKit = [
    {
      icon: Newspaper,
      title: 'Brand Guidelines',
      description: 'Our logo, colors, and brand standards'
    },
    {
      icon: FileText,
      title: 'Executive Summary',
      description: 'Company overview and key facts'
    },
    {
      icon: TrendingUp,
      title: 'Fact Sheet',
      description: 'Key metrics and statistics'
    },
    {
      icon: Award,
      title: 'Leadership Bios',
      description: 'Executive team background'
    }
  ];

  const mentions = [
    { publication: 'TechCrunch', headline: 'Bolt Market Raises $150M in Series B' },
    { publication: 'Forbes', headline: 'The Future of Peer-to-Peer Commerce' },
    { publication: 'Business Insider', headline: 'How Bolt Market is Disrupting E-commerce' },
    { publication: 'Wall Street Journal', headline: 'Marketplace Platform Gains Global Traction' },
    { publication: 'CNBC', headline: 'Interview with Bolt Market CEO' },
    { publication: 'Bloomberg', headline: 'Q3 Growth Accelerates for Bolt Market' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Press Center
          </h1>
          <p className="text-xl text-dark-600">
            Latest news, press releases, and media resources from Bolt Market
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-dark-900 mb-4 font-display">
              Media Inquiries
            </h2>
            <p className="text-dark-700 mb-4">
              For press inquiries, interview requests, or media resources:
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-sm text-dark-600 mb-1">Email:</p>
                <a href="mailto:press@boltmarket.com" className="text-primary-600 font-semibold hover:text-primary-700">
                  press@boltmarket.com
                </a>
              </div>
              <div>
                <p className="text-sm text-dark-600 mb-1">Phone:</p>
                <a href="tel:+1-800-BOLT-123" className="text-primary-600 font-semibold hover:text-primary-700">
                  +1-800-BOLT-123
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Latest Press Releases
        </h2>
        <div className="space-y-6">
          {releases.map((release) => (
            <div
              key={release.id}
              className={`rounded-lg border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all cursor-pointer ${release.color}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold mb-3">
                    {release.category}
                  </span>
                  <h3 className="text-xl font-bold text-dark-900 mb-2 font-display hover:text-primary-600">
                    {release.title}
                  </h3>
                  <p className="text-dark-700 mb-4">
                    {release.excerpt}
                  </p>
                  <p className="text-sm text-dark-500">
                    {release.date}
                  </p>
                </div>
              </div>
              <button className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                award: 'Best Marketplace Platform 2024',
                org: 'Tech Innovation Awards',
                year: '2024'
              },
              {
                award: 'Most Trusted E-commerce Company',
                org: 'Consumer Trust Report',
                year: '2024'
              },
              {
                award: 'Fastest Growing Startup',
                org: 'Global Business Review',
                year: '2023'
              },
              {
                award: 'Best Workplace Culture',
                org: 'Great Place to Work',
                year: '2023'
              },
              {
                award: 'Innovation Excellence Award',
                org: 'International Commerce Council',
                year: '2023'
              },
              {
                award: 'Customer Choice Award',
                org: 'Digital Commerce Association',
                year: '2022'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-primary-100">
                <Award size={28} className="text-amber-500 mb-3" />
                <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">
                  {item.award}
                </h3>
                <p className="text-dark-600 mb-2">{item.org}</p>
                <p className="text-sm text-dark-500">{item.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Media Kit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {mediaKit.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <Icon size={32} className="text-primary-600 mb-4" />
                <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-dark-600 mb-4">
                  {item.description}
                </p>
                <button className="text-primary-600 font-semibold hover:text-primary-700">
                  Download →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Media Mentions */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Featured In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentions.map((mention, idx) => (
              <a
                key={idx}
                href="#"
                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
              >
                <h4 className="text-sm font-semibold text-dark-600 mb-2 uppercase tracking-wider">
                  {mention.publication}
                </h4>
                <p className="text-dark-900 font-semibold line-clamp-2">
                  {mention.headline}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Quick Facts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-dark-900 mb-6 font-display">Company</h3>
            <ul className="space-y-3 text-dark-700">
              <li><strong>Founded:</strong> 2020</li>
              <li><strong>Headquarters:</strong> San Francisco, CA</li>
              <li><strong>Employees:</strong> 500+</li>
              <li><strong>Active Users:</strong> 5 Million+</li>
              <li><strong>Countries:</strong> 150+</li>
              <li><strong>GMV:</strong> $2B+ Annually</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-dark-900 mb-6 font-display">Leadership</h3>
            <ul className="space-y-4 text-dark-700">
              <li>
                <strong>Sarah Chen</strong><br/>
                <span className="text-dark-600">CEO & Founder</span>
              </li>
              <li>
                <strong>David Kumar</strong><br/>
                <span className="text-dark-600">CTO & Co-founder</span>
              </li>
              <li>
                <strong>Maria Rodriguez</strong><br/>
                <span className="text-dark-600">COO</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Contact Our Press Team
          </h2>
          <p className="text-dark-300 mb-8 text-lg">
            Have a question or need additional resources? We're here to help.
          </p>
          <a
            href="mailto:press@boltmarket.com"
            className="inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}

export default PressPage;
