import React from 'react';
import { Lock, Shield, Eye, Database, Zap, UserCheck, FileText, Award } from 'lucide-react';

/**
 * Security Page
 * Details security features, certifications, and data protection measures
 */
function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data transmitted between your device and our servers is encrypted with TLS 1.3 protocol.',
      color: 'text-primary-500'
    },
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Optional 2FA adds an extra layer of security to protect your account from unauthorized access.',
      color: 'text-emerald-500'
    },
    {
      icon: Database,
      title: 'Secure Data Storage',
      description: 'User data is encrypted at rest using AES-256 encryption with redundant backups.',
      color: 'text-blue-500'
    },
    {
      icon: Eye,
      title: 'Privacy Controls',
      description: 'You control your data. Granular privacy settings let you decide what information is visible.',
      color: 'text-amber-500'
    },
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'We verify seller identities to reduce fraud and protect both buyers and sellers.',
      color: 'text-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Monitoring',
      description: 'Our security team monitors for suspicious activity 24/7 using AI-powered detection.',
      color: 'text-purple-500'
    }
  ];

  const certifications = [
    {
      title: 'PCI DSS Level 1',
      description: 'Highest level of PCI compliance for secure payment card handling'
    },
    {
      title: 'ISO/IEC 27001',
      description: 'International standard for information security management systems'
    },
    {
      title: 'SOC 2 Type II',
      description: 'Certified for security, availability, processing integrity and confidentiality'
    },
    {
      title: 'GDPR Compliant',
      description: 'Full compliance with General Data Protection Regulation (GDPR)'
    }
  ];

  const protections = [
    {
      title: 'Buyer Protection',
      features: [
        'Secure escrow service holds funds until delivery confirmation',
        'Money-back guarantee if item doesn\'t match description',
        '30-day return period for eligible items',
        'Dispute resolution team available 24/7',
        'Protection up to $10,000 per transaction'
      ]
    },
    {
      title: 'Seller Protection',
      features: [
        'Seller verification badges to build trust',
        'Account insurance against chargebacks',
        'Protection against false claims',
        'Secure communication system',
        'Fraud detection and prevention'
      ]
    },
    {
      title: 'Payment Security',
      features: [
        'PCI DSS certified payment processing',
        'Multiple secure payment gateways',
        'Fraud scoring on every transaction',
        'Encrypted payment token storage',
        'Support for secure payment methods only'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Your Security is Our Priority
          </h1>
          <p className="text-xl text-dark-600 mb-8">
            We use bank-level security to protect your account, payments, and personal information.
          </p>
        </div>
      </div>

      {/* Security Features */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {securityFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className={`${feature.color} mb-4`}>
                  <Icon size={32} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2 font-display">
                  {feature.title}
                </h3>
                <p className="text-dark-600 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-12 text-center font-display">
            Industry Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-start gap-4">
                  <Award size={32} className="text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2 font-display">
                      {cert.title}
                    </h3>
                    <p className="text-dark-600">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protection Details */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-16 text-center font-display">
          Complete Protection for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protections.map((protection, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-dark-900 mb-6 font-display">
                {protection.title}
              </h3>
              <ul className="space-y-3">
                {protection.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 flex-shrink-0 mt-2"></div>
                    <span className="text-dark-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How We Protect Data */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            How We Protect Your Data
          </h2>
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Collection & Minimization
              </h3>
              <p className="text-dark-700 mb-4">
                We only collect the minimum personal information necessary to provide our services. We never ask for sensitive information we don't need.
              </p>
              <p className="text-dark-600 text-sm">
                <strong>Examples:</strong> We never store full credit card numbers, SSNs, or passwords in plain text.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Encryption
              </h3>
              <p className="text-dark-700 mb-4">
                All sensitive data is encrypted both in transit (TLS 1.3) and at rest (AES-256) to protect against unauthorized access.
              </p>
              <p className="text-dark-600 text-sm">
                <strong>Examples:</strong> Payment data, personal information, and messages are all encrypted.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Access Control
              </h3>
              <p className="text-dark-700 mb-4">
                Only authorized team members can access user data, and all access is logged and monitored for security.
              </p>
              <p className="text-dark-600 text-sm">
                <strong>Examples:</strong> Employees use role-based access, multi-factor authentication, and sign NDAs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Regular Audits
              </h3>
              <p className="text-dark-700 mb-4">
                We conduct regular security audits and penetration testing to identify and fix vulnerabilities before they can be exploited.
              </p>
              <p className="text-dark-600 text-sm">
                <strong>Frequency:</strong> Annual external audits, quarterly internal audits, and continuous monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Response */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-12 border border-emerald-200">
          <Shield size={40} className="text-emerald-600 mb-4" />
          <h2 className="text-3xl font-bold text-dark-900 mb-4 font-display">
            Security Incident Response
          </h2>
          <p className="text-dark-700 mb-6">
            In the unlikely event of a security incident, we have a dedicated team ready to respond immediately. We will:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">1.</span>
              <span className="text-dark-700">Assess the situation and contain the breach within minutes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">2.</span>
              <span className="text-dark-700">Notify affected users within 24 hours with full details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">3.</span>
              <span className="text-dark-700">Provide free credit monitoring for 12 months if applicable</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">4.</span>
              <span className="text-dark-700">Work with authorities and publish a transparency report</span>
            </li>
          </ul>
          <p className="text-dark-600">
            <strong>Responsible Disclosure:</strong> Security researchers can report vulnerabilities responsibly to security@boltmarket.com
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Trade with Complete Confidence
          </h2>
          <p className="text-dark-300 mb-8 text-lg">
            Our security measures protect you at every step of your marketplace journey.
          </p>
          <button className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Start Trading Safely
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;
