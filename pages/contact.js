import { useState } from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-yellow-400 border-8 border-black p-12 text-center transform hover:scale-[1.02] transition-transform">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-black flex items-center justify-center transform rotate-12">
                <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-5xl font-black mb-6">MESSAGE SENT!</h2>
            <p className="text-xl font-mono mb-8 max-w-2xl mx-auto">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={resetForm}
              className="px-8 py-4 bg-black text-white font-black border-4 border-black hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-6 border-b-8 border-yellow-400">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/contact.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl mb-6 leading-none" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            CONTACT
          </h1>
          <p className="text-2xl font-mono text-yellow-400">
            Let's Connect
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Contact Links Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Email */}
          <a
            href="mailto:syednayer@rawspill.com"
            className="border-4 border-black p-8 bg-white hover:bg-yellow-400 transition-all transform hover:scale-105 group"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'mailto:syednayer@rawspill.com';
            }}
          >
            <div className="flex flex-col items-center text-center">
              <svg className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-black text-xl mb-2">EMAIL</h3>
              <p className="font-mono text-sm break-all">syednayer@rawspill.com</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/syednayer/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-4 border-black p-8 bg-white hover:bg-yellow-400 transition-all transform hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <svg className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <h3 className="font-black text-xl mb-2">LINKEDIN</h3>
              <p className="font-mono text-sm">Connect with me</p>
            </div>
          </a>
        </div>

        {/* Contact Form Section */}
        <div className="bg-black text-white border-8 border-yellow-400 p-12">
          <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
            SEND A <span className="text-yellow-400">MESSAGE</span>
          </h2>
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="border-4 border-yellow-400 p-6 bg-black">
              <div className="flex items-center mb-2">
                <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-black text-yellow-400 text-lg">EMAIL</span>
              </div>
              <a href="mailto:syednayer@rawspill.com" className="font-mono text-white hover:text-yellow-400 transition break-all">
                syednayer@rawspill.com
              </a>
            </div>
            
            <div className="border-4 border-yellow-400 p-6 bg-black">
              <div className="flex items-center mb-2">
                <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-black text-yellow-400 text-lg">RESPONSE TIME</span>
              </div>
              <p className="font-mono text-white">Usually within a week</p>
            </div>
          </div>

          {/* Quick Response Topics */}
          <div className="mb-12">
            <h3 className="text-3xl font-black mb-6 text-yellow-400">QUICK RESPONSE TOPICS</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Personal development discussions",
                "Mental health awareness & support ideas",
                "Travel stories & experiences",
                "Writing collaborations",
                "Community growth"
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 bg-yellow-400 text-black font-mono text-sm border-2 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="border-4 border-yellow-400 bg-white p-8">
            <h3 className="text-3xl font-black text-black mb-6">CONTACT FORM</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-black font-black mb-2 text-lg">
                  NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.name ? "border-red-600" : "border-black"
                  } font-mono focus:outline-none focus:border-yellow-400`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-600 font-mono text-sm mt-2 font-bold">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-black font-black mb-2 text-lg">
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.email ? "border-red-600" : "border-black"
                  } font-mono focus:outline-none focus:border-yellow-400`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 font-mono text-sm mt-2 font-bold">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-black font-black mb-2 text-lg">
                  MESSAGE * (MIN 10 CHARACTERS)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.message ? "border-red-600" : "border-black"
                  } font-mono focus:outline-none focus:border-yellow-400 resize-none`}
                  placeholder="Share your thoughts, ideas, or questions..."
                />
                {errors.message && (
                  <p className="text-red-600 font-mono text-sm mt-2 font-bold">{errors.message}</p>
                )}
                <p className="text-gray-700 font-mono text-sm mt-2">
                  {formData.message.length} characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-black text-white font-black border-4 border-black hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
