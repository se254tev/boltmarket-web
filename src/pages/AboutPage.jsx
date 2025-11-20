import React from 'react';
import { Users, Target, Zap, Heart, Award, TrendingUp } from 'lucide-react';

/**
 * About Page
 * Company story, mission, vision, team, and achievements
 */
function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Customer-Centric',
      description: 'Everything we do is guided by what\'s best for our users.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously improve and innovate to stay ahead.'
    },
    {
      icon: Heart,
      title: 'Trust',
      description: 'We build trust through transparency and security.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We help our users grow their businesses and wealth.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Bolt Market founded' },
    { year: '2021', event: '100,000 users milestone' },
    { year: '2022', event: 'Series A funding round' },
    { year: '2023', event: '10 million transactions' },
    { year: '2024', event: 'Global expansion to 50 countries' }
  ];

  const stats = [
    { number: '5M+', label: 'Active Users' },
    { number: '50M+', label: 'Listings' },
    { number: '$2B+', label: 'GMV Annually' },
    { number: '150+', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            About Bolt Market
          </h1>
          <p className="text-xl text-dark-600 mb-8">
            We're on a mission to make buying and selling accessible to everyone, anywhere in the world.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2 font-display">
                {stat.number}
              </div>
              <p className="text-dark-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-8 font-display">
            Our Story
          </h2>
          <div className="space-y-6 text-dark-700 text-lg">
            <p>
              Bolt Market was founded in 2020 with a simple belief: buying and selling should be simple, safe, and fair for everyone. We saw a gap in the market for a platform that truly prioritizes user experience and security.
            </p>
            <p>
              Starting from a small team of four, we've grown into a global marketplace connecting millions of buyers and sellers. Our rapid growth is a testament to our commitment to solving real problems for our users.
            </p>
            <p>
              Today, Bolt Market operates in over 150 countries, processing billions in transactions annually. But we're not slowing down—we're just getting started on our mission to revolutionize peer-to-peer commerce.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-dark-900 mb-6 font-display">
              Our Mission
            </h2>
            <p className="text-dark-700 text-lg leading-relaxed">
              To empower billions of people to buy and sell anything, anywhere, in a safe, fair, and transparent marketplace that brings communities together.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-dark-900 mb-6 font-display">
              Our Vision
            </h2>
            <p className="text-dark-700 text-lg leading-relaxed">
              To create a world where economic opportunity is accessible to everyone, where trust is the foundation of commerce, and where buying and selling is effortless.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-12 text-center font-display">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-primary-100">
                  <Icon size={32} className="text-primary-600 mb-4" />
                  <h3 className="text-xl font-bold text-dark-900 mb-2 font-display">
                    {value.title}
                  </h3>
                  <p className="text-dark-700">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-12 text-center font-display">
          Our Journey
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-400 to-primary-600"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-1/2 md:px-8">
                  <div className={`bg-white rounded-lg p-8 shadow-sm border border-slate-200 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="text-2xl font-bold text-primary-600 mb-2 font-display">
                      {milestone.year}
                    </div>
                    <p className="text-dark-700 font-semibold">
                      {milestone.event}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex w-full md:w-0 justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary-600 border-4 border-white shadow-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-12 text-center font-display">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Founder', emoji: '👩‍💼' },
              { name: 'David Kumar', role: 'CTO & Co-founder', emoji: '👨‍💻' },
              { name: 'Maria Rodriguez', role: 'COO', emoji: '👩‍🔬' }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-200">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-dark-900 mb-1 font-display">
                  {member.name}
                </h3>
                <p className="text-dark-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-dark-600 text-sm">
                  Leading innovation and growth at Bolt Market with a passion for exceptional user experiences.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-12 text-center font-display">
          Awards & Recognition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Best Marketplace Platform', year: '2024', org: 'Tech Innovation Awards' },
            { title: 'Most Trusted E-commerce Company', year: '2023', org: 'Consumer Trust Report' },
            { title: 'Fastest Growing Startup', year: '2022', org: 'Global Business Review' }
          ].map((award, idx) => (
            <div key={idx} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-8 border border-amber-100">
              <Award size={32} className="text-amber-600 mb-4" />
              <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">
                {award.title}
              </h3>
              <p className="text-dark-600 mb-1">{award.org}</p>
              <p className="text-dark-500 text-sm">{award.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Culture Section */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Users size={40} className="text-primary-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-dark-900 mb-6 font-display">
            Our Culture
          </h2>
          <p className="text-dark-700 text-lg mb-8">
            We believe great products come from great teams. We foster a culture of innovation, collaboration, and continuous learning. Our people are our greatest asset, and we invest in their growth and well-being.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Diversity & Inclusion', 'Work-Life Balance', 'Professional Growth'].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <p className="font-semibold text-dark-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Want to Join Our Team?
          </h2>
          <p className="text-dark-300 mb-8 text-lg">
            We're always looking for talented people who believe in our mission.
          </p>
          <button className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
