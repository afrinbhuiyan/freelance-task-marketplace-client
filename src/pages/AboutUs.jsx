import React from 'react';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaHandshake, FaRocket, FaUserTie, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Tech enthusiast with 10+ years in web development',
      image: "https://i.insider.com/5aa2fc7f3be59f28008b45be?width=1116&format=jpeg",
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Design Director',
      bio: 'Creative mind behind our stunning interfaces',
      image: 'https://news.mit.edu/sites/default/files/images/202101/sarah-Williams.JPG',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Makes the impossible possible with code',
      image: 'https://mba.hkubs.hku.hk/wp-content/uploads/2023/01/Michael-Chen-Thumbnail-2.jpg',
      twitter: '#',
      linkedin: '#'
    }
  ];

  const stats = [
    { value: '2015', label: 'Founded in' },
    { value: '250+', label: 'Projects completed' },
    { value: '98%', label: 'Client satisfaction' },
    { value: '15', label: 'Team members' }
  ];

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white mt-10">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-teal-800 mb-6">Our Story</h1>
            <p className="text-xl text-teal-700 mb-8">
              We're a passionate team dedicated to creating digital experiences that matter.
            </p>
            <div className="h-1 w-24 bg-teal-500 mx-auto mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={"https://images.stockcake.com/public/c/8/5/c85dab58-53da-440f-adfa-5cb37449ce40_large/focused-technical-team-stockcake.jpg"} 
                alt="Our team working together" 
                className="rounded-2xl shadow-2xl border-8 border-white"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-teal-800">Building the future, one pixel at a time</h2>
              <p className="text-gray-700">
                Founded in 2015, we started as a small team of developers with a big dream. Today, we've grown into a full-service digital agency, but we've never lost our startup spirit or our commitment to excellence.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-lg shadow-md text-center border-l-4 border-teal-500"
                  >
                    <p className="text-3xl font-bold text-teal-600">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide everything we do, from client interactions to product development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-teal-50 p-8 rounded-xl"
            >
              <div className="text-teal-600 mb-4">
                <FaLightbulb size={32} />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Innovation</h3>
              <p className="text-gray-700">
                We constantly push boundaries to deliver cutting-edge solutions that stand out.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-teal-50 p-8 rounded-xl"
            >
              <div className="text-teal-600 mb-4">
                <FaHandshake size={32} />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Integrity</h3>
              <p className="text-gray-700">
                Honest communication and ethical practices form the foundation of all our relationships.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-teal-50 p-8 rounded-xl"
            >
              <div className="text-teal-600 mb-4">
                <FaRocket size={32} />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Excellence</h3>
              <p className="text-gray-700">
                We're never satisfied with "good enough" - we strive for perfection in every detail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Meet The Team</h2>
            <p className="text-gray-600">
              The brilliant minds behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-teal-800">{member.name}</h3>
                  <p className="text-teal-600 mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                  <div className="mt-4 flex space-x-4">
                    <a 
                      href={member.twitter} 
                      className="text-teal-600 hover:text-teal-800"
                      aria-label={`${member.name}'s Twitter profile`}
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a 
                      href={member.linkedin} 
                      className="text-teal-600 hover:text-teal-800"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-xl mb-8 text-teal-100">
              We'd love to hear about your ideas and help bring them to life.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;