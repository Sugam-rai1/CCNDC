import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-32 py-10 text-gray-700">

      {/* Header */}
      <div className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-black mb-12 tracking-wide">
        CONTACT <span className="text-black">US</span>
      </div>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row gap-12 mb-20 items-center animate-fade-in">
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-2xl"
          src={assets.contact_image}
          alt="Contact Chardham Clinic"
        />
        <div className="flex flex-col gap-6 text-base text-gray-600 leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Office</h3>
            <p>
              Beside Mayal Hotel on Jorethang Road<br />
              Namchi District, Namchi, Sikkim – 737126
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Details</h3>
            <p>
              <strong>Phone:</strong> +91 89721 06459, +91 89673 55446<br />
              <strong>Email:</strong>{' '}
              <a href="mailto:chardhamclinicdiagnosticentre@gmail.com" className="text-cyan-700 hover:underline">
                chardhamclinicdiagnosticentre@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Us on the Map</h3>
            <p>We're located in the heart of Namchi for easy access and convenience.</p>
            <a
              href="https://www.google.com/maps?q=chardham+clinic+namchi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-cyan-700 text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-cyan-800 transition-all duration-300"
            >
              View on Map
            </a>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-gray-100 rounded-xl p-8 shadow-md text-center">
        <h4 className="text-xl font-semibold text-gray-900 mb-3">Still have questions?</h4>
        <p className="text-gray-600 mb-5">
          Reach out to our support team. We're here to help you every step of the way.
        </p>
        <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=chardhamclinicdiagnosticentre@gmail.com&su=Support%20Request&body=Hi%20CCNDC%20Team%2C%20I%20have%20a%20question%20regarding..."
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all duration-300 inline-block"
>
  Contact Support
</a>

      </div>
    </div>
  );
};

export default Contact;
