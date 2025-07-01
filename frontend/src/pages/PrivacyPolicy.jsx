import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black/80 text-white py-10 px-6 md:px-12 min-h-screen">
      <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6 border-b border-cyan-600 pb-2">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-300">
          At <strong>CCNDC (Chardham Clinic and Diagnostic Centre)</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Personal details like name, email, and phone number.</li>
            <li>Medical records submitted during bookings or consultations.</li>
            <li>Technical data like IP address and browser/device info.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>To confirm appointments and provide medical care.</li>
            <li>To deliver personalized experiences and follow-ups.</li>
            <li>To improve our services and protect users.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">3. Data Security</h2>
          <p className="text-gray-300">
            We use industry-standard security measures to protect your data. However, no method is 100% secure. We encourage you to safeguard your credentials at all times.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">4. Sharing Your Information</h2>
          <p className="text-gray-300">
            Your data is never sold or shared without consent. It may only be shared with medical professionals or partners under strict confidentiality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">5. Your Rights</h2>
          <p className="text-gray-300">
            You have full rights to access, update, or delete your information. Email us to raise any concerns or request data changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">6. Contact Us</h2>
          <p className="text-gray-300">
            For questions or support regarding this policy, email us at:
            <br />
            <a
              href="mailto:chardhamclinicdiagnosticcentre@gmail.com"
              className="text-cyan-400 hover:underline"
            >
              chardhamclinicdiagnosticcentre@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-10 text-center">
          © 2025 CCNDC — All Rights Reserved | Last updated: May 5, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
