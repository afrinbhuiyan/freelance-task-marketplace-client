import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e3e4e6] to-teal-50 mt-10">
      {/* Hero Section */}
      <div className="relative bg-teal-700 text-white py-20">
        <div className="absolute inset-0 bg-teal-900/50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Let's Connect
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            We'd love to hear from you. Reach out for inquiries, collaborations, or just to say hello!
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 -mt-16">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-teal-800 mb-6"
              >
                Send Us a Message
              </motion.h2>
              
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  ></textarea>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${isSubmitting ? 'bg-teal-600' : 'bg-teal-700 hover:bg-teal-800'} transition-colors shadow-md`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-teal-50 p-8 md:p-12 relative">
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={"https://media.istockphoto.com/id/2172494039/photo/business-help-desk.jpg?s=612x612&w=0&k=20&c=_Iay3_NildwBpTJK0SXEcrXPhoaf7r8lBwYwo9VU9vE="} 
                  alt="Contact us"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-bold text-teal-800 mb-6"
                >
                  Contact Information
                </motion.h3>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start"
                  >
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-teal-800">Phone</h4>
                      <a href="tel:+1234567890" className="text-gray-700 hover:text-teal-600 transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-teal-800">Email</h4>
                      <a href="mailto:info@example.com" className="text-gray-700 hover:text-teal-600 transition-colors">
                        info@example.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-start"
                  >
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-teal-800">Office</h4>
                      <p className="text-gray-700">
                        123 Business Avenue<br />
                        Tech City, TC 10001<br />
                        United States
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="pt-6"
                  >
                    <h4 className="text-lg font-semibold text-teal-800 mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-teal-100 hover:bg-teal-200 p-3 rounded-full text-teal-600 transition-colors"
                        aria-label="Twitter"
                      >
                        <FaTwitter size={18} />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-teal-100 hover:bg-teal-200 p-3 rounded-full text-teal-600 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="pt-8"
                  >
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">Business Hours</h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2155732918656!2d-73.987844924686!3d40.74844047138911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTkuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;