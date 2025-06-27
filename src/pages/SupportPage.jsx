import React, { useState } from "react";
import {
  FaHeadset,
  FaQuestionCircle,
  FaTicketAlt,
  FaBook,
  FaClock,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
  FaDiscord,
  FaEnvelope,
  FaUserCircle,
  FaRobot,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! I'm your virtual assistant. How can I help you today?",
      time: "Just now",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleQuestion = (categoryId, questionIndex) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [`${categoryId}-${questionIndex}`]:
        !prev[`${categoryId}-${questionIndex}`],
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: newMessage, time: "Just now" };
    setChatMessages([...chatMessages, userMsg]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand your question. Let me check that for you.",
        "Thanks for reaching out! Our team will get back to you soon.",
        "I can help with that. Here's what I found...",
        "That's a great question! Here's the information you need.",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMsg = { sender: "bot", text: randomResponse, time: "Just now" };
      setChatMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSearch = () => {
    // Your search logic here
    console.log("Searching for:", searchQuery);
    // Maybe navigate to search results or filter content
  };

  const faqCategories = [
    {
      id: "account",
      title: "Account & Billing",
      icon: "🔐",
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            'You can reset your password by clicking on "Forgot Password" on the login page. We\'ll send a reset link to your registered email address.',
        },
        {
          question: "How can I update my payment method?",
          answer:
            "Navigate to your Account Settings > Billing section. From there you can add or update your payment information.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: "🛠️",
      questions: [
        {
          question: "What are the system requirements?",
          answer:
            "Our platform works on all modern browsers. For best performance, we recommend Chrome or Firefox with at least 4GB RAM.",
        },
        {
          question: "How do I report a bug?",
          answer:
            'Please use the "Report an Issue" form in our Help Center. Include as many details as possible about the problem you encountered.',
        },
        {
          question: "Is there a mobile app available?",
          answer:
            "Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play.",
        },
      ],
    },
    {
      id: "general",
      title: "General Questions",
      icon: "❓",
      questions: [
        {
          question: "What is your refund policy?",
          answer:
            "We offer a 30-day money-back guarantee for all our premium plans. Contact our support team to initiate a refund.",
        },
        {
          question: "How do I cancel my subscription?",
          answer:
            "You can cancel anytime from your Account Settings. Your subscription will remain active until the end of the current billing period.",
        },
        {
          question: "Where can I find my invoice?",
          answer:
            "All invoices are available in your Account Settings under the Billing section. You can download PDF copies at any time.",
        },
      ],
    },
  ];

  const supportTickets = [
    {
      id: 1,
      subject: "Login issues after update",
      status: "Open",
      date: "2023-06-15",
      priority: "High",
      lastUpdated: "2 hours ago",
      messages: 3,
    },
    {
      id: 2,
      subject: "Feature request: Dark mode",
      status: "In Progress",
      date: "2023-06-10",
      priority: "Medium",
      lastUpdated: "1 day ago",
      messages: 5,
    },
    {
      id: 3,
      subject: "Billing question about invoice #12345",
      status: "Resolved",
      date: "2023-06-05",
      priority: "Low",
      lastUpdated: "5 days ago",
      messages: 2,
    },
    {
      id: 4,
      subject: "API integration documentation",
      status: "Open",
      date: "2023-06-18",
      priority: "Medium",
      lastUpdated: "30 minutes ago",
      messages: 1,
    },
  ];

  const supportChannels = [
    {
      name: "Live Chat",
      icon: <FaHeadset className="text-2xl" />,
      description: "Instant help from our support team",
      action: () => setIsChatOpen(true),
      availability: "Available now",
      color: "bg-teal-600",
      responseTime: "Instant",
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-2xl" />,
      description: "Detailed support with attachments",
      action: () => (window.location.href = "mailto:support@techtronix.com"),
      availability: "24/7",
      color: "bg-teal-700",
      responseTime: "Within 24 hours",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-2xl" />,
      description: "Quick messaging support",
      action: () => window.open("https://wa.me/1234567890", "_blank"),
      availability: "9AM-5PM (GMT)",
      color: "bg-teal-800",
      responseTime: "Within 2 hours",
    },
    {
      name: "Discord",
      icon: <FaDiscord className="text-2xl" />,
      description: "Join our developer community",
      action: () => window.open("https://discord.gg/techtronix", "_blank"),
      availability: "24/7",
      color: "bg-teal-900",
      responseTime: "Varies",
    },
  ];

  const popularArticles = [
    {
      title: "Getting Started Guide",
      views: "12.5k",
      category: "Onboarding",
    },
    {
      title: "API Integration Tutorial",
      views: "8.2k",
      category: "Developers",
    },
    {
      title: "Troubleshooting Common Issues",
      views: "6.7k",
      category: "Technical",
    },
    {
      title: "Billing and Subscription FAQ",
      views: "5.9k",
      category: "Account",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            onClick={() => setIsChatOpen(true)}
            className="btn btn-circle bg-teal-600 text-white shadow-xl w-16 h-16 hover:bg-teal-700 border-none"
          >
            <FaHeadset className="text-2xl" />
          </button>
        </motion.div>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 bg-white shadow-2xl rounded-lg overflow-hidden border border-teal-200">
          <div className="bg-teal-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="avatar online">
                <div className="w-8 rounded-full bg-teal-500 p-1">
                  <FaRobot className="text-white text-lg" />
                </div>
              </div>
              <h3 className="font-bold text-lg ml-2">Support Assistant</h3>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="btn btn-sm btn-circle btn-ghost hover:bg-teal-700"
            >
              ✕
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.sender === "user"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">
                  {msg.time}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat chat-start">
                <div className="chat-bubble bg-gray-200 text-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="input input-bordered w-full focus:ring-2 focus:ring-teal-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="btn bg-teal-600 text-white hover:bg-teal-700 border-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
        <div className="hero-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-6"
            >
              <FaHeadset className="text-6xl mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              TechTronix Support Center
            </h1>
            <p className="text-xl mb-8">
              Fast, friendly help when you need it most. We're here 24/7 to
              solve your problems.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Search our knowledge base..."
                  className="input input-bordered join-item w-full focus:outline-none focus:ring-2 focus:ring-teal-500 
             text-gray-800 dark:text-white 
             bg-white dark:bg-gray-800
             placeholder-gray-500 dark:placeholder-gray-400
             border-gray-300 dark:border-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  className="btn bg-teal-700 text-white hover:bg-teal-800 border-none join-item"
                  onClick={handleSearch}
                >
                  <FaSearch />
                  <span className="sr-only">Search</span>
                </button>
              </div>
              <div className="text-sm mt-2 text-teal-100">
                Popular searches:{" "}
                <span className="underline cursor-pointer mr-3">
                  password reset
                </span>
                <span className="underline cursor-pointer mr-3">billing</span>
                <span className="underline cursor-pointer">API docs</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Support Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              id: "faq",
              icon: <FaQuestionCircle className="text-4xl" />,
              title: "FAQs",
              description: "Browse our frequently asked questions",
              stats: "250+ solutions",
            },
            {
              id: "tickets",
              icon: <FaTicketAlt className="text-4xl" />,
              title: "My Tickets",
              description: "Check your support requests",
              stats: `${supportTickets.length} active`,
            },
            {
              id: "contact",
              icon: <FaHeadset className="text-4xl" />,
              title: "Contact",
              description: "Get direct help from our team",
              stats: "24/7 availability",
            },
          ].map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ y: -5 }}
              className={`card ${
                activeTab === option.id ? "bg-teal-600 text-white" : "bg-white"
              } shadow-xl cursor-pointer border border-gray-200`}
              onClick={() => setActiveTab(option.id)}
            >
              <div className="card-body items-center text-center">
                <div
                  className={`mb-4 ${
                    activeTab === option.id ? "text-white" : "text-teal-600"
                  }`}
                >
                  {option.icon}
                </div>
                <h2 className="card-title">{option.title}</h2>
                <p>{option.description}</p>
                <div
                  className={`badge mt-2 ${
                    activeTab === option.id
                      ? "bg-teal-700"
                      : "bg-teal-100 text-teal-800"
                  }`}
                >
                  {option.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Knowledge Base</h2>
              <div className="divider w-24 mx-auto bg-teal-500 h-0.5"></div>
              <p className="max-w-2xl mx-auto mt-4 text-gray-600">
                Find answers to common questions organized by category
              </p>
            </div>

            {/* Popular Articles */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4 text-teal-800">
                Popular Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {popularArticles.map((article, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="card bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <span className="badge bg-teal-100 text-teal-800 mb-2">
                        {article.category}
                      </span>
                      <h4 className="font-medium mb-2">{article.title}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>👁️ {article.views} views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faqCategories.map((category) => (
                <div
                  key={category.id}
                  className="card bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <h3 className="text-xl font-semibold text-teal-800">
                        {category.title}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {category.questions.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                        >
                          <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleQuestion(category.id, index)}
                          >
                            <h4 className="font-medium text-gray-800 hover:text-teal-600">
                              {item.question}
                            </h4>
                            {expandedQuestions[`${category.id}-${index}`] ? (
                              <FaChevronUp className="text-teal-600" />
                            ) : (
                              <FaChevronDown className="text-gray-400" />
                            )}
                          </div>
                          {expandedQuestions[`${category.id}-${index}`] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 text-gray-600 text-sm"
                            >
                              {item.answer}
                              <button className="mt-2 text-teal-600 text-xs font-medium hover:underline">
                                Was this helpful?
                              </button>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-teal-600 text-sm font-medium hover:underline">
                      View all {category.title} articles →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* My Tickets Section */}
        {activeTab === "tickets" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-teal-800">
                  My Support Tickets
                </h2>
                <p className="text-gray-600">
                  Track your ongoing support requests
                </p>
              </div>
              <div className="flex gap-3">
                <button className="btn bg-teal-600 text-white hover:bg-teal-700 border-none">
                  New Ticket
                </button>
                <button className="btn btn-outline border-teal-600 text-teal-600 hover:bg-teal-50">
                  View History
                </button>
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
              <table className="table">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="text-teal-800">Ticket ID</th>
                    <th className="text-teal-800">Subject</th>
                    <th className="text-teal-800">Status</th>
                    <th className="text-teal-800">Date</th>
                    <th className="text-teal-800">Priority</th>
                    <th className="text-teal-800">Messages</th>
                    <th className="text-teal-800">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <td className="font-medium">#{ticket.id}</td>
                      <td>
                        <a href="#" className="text-teal-600 hover:underline">
                          {ticket.subject}
                        </a>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            ticket.status === "Open"
                              ? "bg-orange-100 text-orange-800"
                              : ticket.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td>{ticket.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            ticket.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center">
                          <FaEnvelope className="text-gray-400 mr-1" />
                          {ticket.messages}
                        </span>
                      </td>
                      <td>{ticket.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
              <div>
                Showing 1 to {supportTickets.length} of {supportTickets.length}{" "}
                entries
              </div>
              <div className="join">
                <button className="join-item btn btn-sm bg-white border-gray-300">
                  Previous
                </button>
                <button className="join-item btn btn-sm bg-teal-600 text-white border-teal-600">
                  1
                </button>
                <button className="join-item btn btn-sm bg-white border-gray-300">
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Support Section */}
        {activeTab === "contact" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-teal-800">
                Contact Our Support Team
              </h2>
              <div className="divider w-24 mx-auto bg-teal-500 h-0.5"></div>
              <p className="max-w-2xl mx-auto mt-4 text-gray-600">
                Choose your preferred support channel to get help from our team
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-teal-800">
                  Support Channels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportChannels.map((channel, index) => (
                    <motion.div
                      key={channel.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        transition: { duration: 0.2 },
                      }}
                      className={`card relative overflow-hidden rounded-xl bg-gradient-to-br ${channel.color} text-white shadow-md backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300`}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      <div className="card-body p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm flex-shrink-0 shadow-inner border border-white/5">
                            {React.cloneElement(channel.icon, {
                              className: "text-2xl",
                            })}
                          </div>
                          <div className="flex-1">
                            <h3 className="card-title text-xl font-semibold tracking-tight">
                              {channel.name}
                            </h3>
                            <p className="text-white/90 mt-2 text-sm leading-relaxed">
                              {channel.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
                          <div className="badge py-2 px-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                channel.status === "online"
                                  ? "bg-emerald-400"
                                  : "bg-amber-400"
                              } mr-2.5 ${
                                channel.status === "online"
                                  ? "pulse-animation"
                                  : ""
                              }`}
                            ></span>
                            <span className="text-xs font-medium tracking-wide">
                              {channel.availability}
                            </span>
                          </div>
                          <div className="text-xs text-white/80 font-medium">
                            <span className="text-white/60">
                              Avg. response:
                            </span>{" "}
                            {channel.responseTime}
                          </div>
                        </div>

                        <div className="card-actions mt-6">
                          <motion.button
                            onClick={channel.action}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-sm w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 py-2.5"
                          >
                            Connect Now
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-teal-800 mb-3">
                    Community Support
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Join our active community forum where users help each other
                    with solutions and tips.
                  </p>
                  <button className="btn btn-outline border-teal-600 text-teal-600 hover:bg-teal-50">
                    Visit Community Forum
                  </button>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="card bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="card-body p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-teal-100 text-teal-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-teal-800">
                          Submit a Support Ticket
                        </h3>
                        <p className="text-gray-600">
                          Fill out the form below and our team will get back to
                          you as soon as possible.
                        </p>
                      </div>
                    </div>

                    <form className="space-y-6">
                      {/* Subject Field */}
                      <div className="form-control">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.01 }}
                        >
                          <input
                            type="text"
                            required
                            className="input w-full border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg transition-all duration-200"
                            placeholder="What's your issue about?"
                          />
                        </motion.div>
                      </div>

                      {/* Description Field */}
                      <div className="form-control">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <textarea
                            rows={5}
                            required
                            className="textarea w-full border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg transition-all duration-200"
                            placeholder="Please describe your issue in detail..."
                          ></textarea>
                        </motion.div>
                        <p className="mt-1 text-xs text-gray-500">
                          Include any error messages, steps to reproduce, and
                          screenshots if possible
                        </p>
                      </div>

                      {/* Priority and Category */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Priority Field */}
                        <div className="form-control">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Priority <span className="text-red-500">*</span>
                          </label>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <select className="select w-full border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg transition-all duration-200">
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high" selected>
                                High
                              </option>
                              <option value="critical">Critical</option>
                            </select>
                          </motion.div>
                        </div>

                        {/* Category Field */}
                        <div className="form-control">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                          </label>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <select className="select w-full border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg transition-all duration-200">
                              <option value="technical">Technical</option>
                              <option value="billing">Billing</option>
                              <option value="account">Account</option>
                              <option value="feature">Feature Request</option>
                              <option value="other">Other</option>
                            </select>
                          </motion.div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="form-control">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Attachments
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 rounded-lg cursor-pointer transition-all duration-200">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, PDF up to 5MB
                              </p>
                            </div>
                            <input type="file" className="hidden" multiple />
                          </label>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <div className="form-control">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm border-gray-300 checked:border-teal-600 [--chkbg:theme(colors.teal.600)] [--chkfg:white]"
                          />
                          <span className="label-text text-gray-700">
                            Include system diagnostics to help troubleshoot
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="form-control pt-4">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn bg-teal-600 hover:bg-teal-700 text-white border-none rounded-lg py-3 px-6 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Submit Ticket
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resources Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-teal-800">
            Additional Resources
          </h2>
          <div className="divider w-24 mx-auto bg-teal-500 h-0.5"></div>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Explore our comprehensive resources to get the most out of
            TechTronix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Knowledge Base Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="card relative overflow-hidden rounded-xl h-64 group"
          >
            <figure className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Knowledge Base"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </figure>
            <div className="card-body absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-4">
                  <FaBook className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold">Knowledge Base</h3>
              </div>
              <p className="mb-6 text-white/90 leading-relaxed">
                Browse our comprehensive documentation, tutorials and how-to
                guides
              </p>
              <div className="card-actions">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="btn btn-outline border-white/50 hover:border-white/80 text-white hover:bg-white/10 flex items-center gap-2"
                >
                  Explore Now
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* System Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card relative overflow-hidden rounded-xl h-64 group"
          >
            <figure className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="System Status"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/50 to-transparent"></div>
            </figure>
            <div className="card-body absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-4">
                  <FaClock className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold">System Status</h3>
              </div>
              <p className="mb-6 text-white/90 leading-relaxed">
                Check our platform status, scheduled maintenance and incident
                reports
              </p>
              <div className="card-actions">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="btn btn-outline border-white/50 hover:border-white/80 text-white hover:bg-white/10 flex items-center gap-2"
                >
                  View Status
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our dedicated support team is ready to assist you with any
              questions or issues.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsChatOpen(true)}
                className="btn btn-accent btn-lg bg-white text-teal-600 hover:bg-gray-100 border-none"
              >
                <FaHeadset className="mr-2" /> Start Live Chat
              </button>
              <button className="btn btn-outline btn-lg text-white hover:bg-teal-700 hover:border-teal-700">
                <FaEnvelope className="mr-2" /> Email Support
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
