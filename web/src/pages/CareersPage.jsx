import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Users, Heart, Zap } from 'lucide-react';

/**
 * Careers Page
 * Job listings, company culture, benefits, and application form
 */
function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Senior Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      level: 'Senior',
      salary: '$150K - $200K',
      description: 'Lead product strategy and development for our core marketplace platform.'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      level: 'Mid-level',
      salary: '$120K - $160K',
      description: 'Build and scale our web and mobile platforms using modern tech stack.'
    },
    {
      id: 3,
      title: 'Head of Security',
      department: 'Security',
      location: 'New York, NY',
      level: 'Senior',
      salary: '$180K - $220K',
      description: 'Lead our security team and ensure platform safety for millions of users.'
    },
    {
      id: 4,
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'Remote',
      level: 'Mid-level',
      salary: '$130K - $170K',
      description: 'Build ML models and analytics to drive business insights and user experience.'
    },
    {
      id: 5,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Multiple',
      level: 'Mid-level',
      salary: '$80K - $110K',
      description: 'Help our enterprise customers succeed and grow their business on Bolt.'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      level: 'Senior',
      salary: '$140K - $180K',
      description: 'Manage and optimize our cloud infrastructure and deployment pipelines.'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      items: ['Comprehensive health insurance', 'Mental health support', 'Gym membership']
    },
    {
      icon: DollarSign,
      title: 'Compensation',
      items: ['Competitive salary', 'Stock options', 'Bonus programs']
    },
    {
      icon: Zap,
      title: 'Professional Growth',
      items: ['Learning budget', 'Conference attendance', 'Mentorship program']
    },
    {
      icon: Users,
      title: 'Work Life Balance',
      items: ['Flexible hours', 'Remote work options', 'Generous PTO']
    }
  ];

  const values = [
    'Innovation', 'Transparency', 'Collaboration', 'Integrity', 'Customer Focus', 'Diversity'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Join Our Team
          </h1>
          <p className="text-xl text-dark-600 mb-8">
            Help us revolutionize commerce. We're looking for talented people who are passionate about our mission.
          </p>
        </div>
      </div>

      {/* Culture Section */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Why Work at Bolt Market?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Impact',
                desc: 'Your work directly impacts millions of users globally every day.'
              },
              {
                title: 'Growth',
                desc: 'Scale your skills and career alongside our rapidly growing company.'
              },
              {
                title: 'Culture',
                desc: 'Be part of a diverse, inclusive team that values collaboration.'
              },
              {
                title: 'Innovation',
                desc: 'Use cutting-edge technology to solve real-world problems.'
              },
              {
                title: 'Flexibility',
                desc: 'Work remotely or from our offices—it\'s up to you.'
              },
              {
                title: 'Support',
                desc: 'We invest in your well-being and professional development.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">{item.title}</h3>
                <p className="text-dark-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-8 text-center font-display">
          Our Values
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="px-6 py-3 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full font-semibold text-primary-700 border border-primary-200"
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Benefits & Perks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <Icon size={32} className="text-primary-600 mb-4" />
                  <h3 className="text-lg font-bold text-dark-900 mb-4 font-display">
                    {benefit.title}
                  </h3>
                  <ul className="space-y-2">
                    {benefit.items.map((item, iidx) => (
                      <li key={iidx} className="text-dark-700 text-sm">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Open Positions
        </h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-dark-900 font-display mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-dark-600">
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} /> {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} /> {job.salary}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                    {job.level}
                  </span>
                  <span className="text-2xl text-primary-600">{selectedJob?.id === job.id ? '−' : '+'}</span>
                </div>
              </div>

              {selectedJob?.id === job.id && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-dark-700 mb-6">
                    {job.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-dark-900 mb-2">Key Responsibilities</h4>
                      <ul className="space-y-2 text-dark-700 text-sm">
                        <li>• Lead initiatives that impact the platform</li>
                        <li>• Collaborate with cross-functional teams</li>
                        <li>• Mentor junior team members</li>
                        <li>• Contribute to company culture</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 mb-2">Requirements</h4>
                      <ul className="space-y-2 text-dark-700 text-sm">
                        <li>• 5+ years in relevant field</li>
                        <li>• Proven track record of success</li>
                        <li>• Strong communication skills</li>
                        <li>• Passion for our mission</li>
                      </ul>
                    </div>
                  </div>
                  <button className="bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Internship Program */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark-900 mb-6 font-display">
            Internship Program
          </h2>
          <p className="text-dark-700 text-lg mb-8">
            Launch your career with Bolt Market. Our internship program offers mentorship, real-world experience, and the opportunity to work on impactful projects alongside our team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary-600 mb-2 font-display">10+</div>
              <p className="text-dark-700">Internship positions available</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary-600 mb-2 font-display">3-6</div>
              <p className="text-dark-700">Months duration</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary-600 mb-2 font-display">Paid</div>
              <p className="text-dark-700">Competitive stipend</p>
            </div>
          </div>
          <button className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Apply for Internship
          </button>
        </div>
      </div>

      {/* Diversity & Inclusion */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-8 text-center font-display">
          Diversity & Inclusion
        </h2>
        <p className="text-dark-700 text-lg text-center mb-12 max-w-3xl mx-auto">
          We believe diverse teams build better products. We're committed to creating an inclusive workplace where everyone feels valued, heard, and empowered to succeed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-dark-900 mb-4 font-display">Equal Opportunity</h3>
            <p className="text-dark-700">
              We hire based on merit. We don't discriminate based on race, color, religion, gender, or other characteristics.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-dark-900 mb-4 font-display">Inclusive Culture</h3>
            <p className="text-dark-700">
              Our culture celebrates differences. We encourage diverse perspectives and believe they make us stronger.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-dark-900 mb-4 font-display">Belonging</h3>
            <p className="text-dark-700">
              Every employee belongs at Bolt. We provide resources and support to help you thrive.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Ready to Make an Impact?
          </h2>
          <p className="text-dark-300 mb-8 text-lg">
            View all open positions and apply today to join our growing team.
          </p>
          <button className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Explore Careers
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareersPage;
