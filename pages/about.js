import { useState } from "react";
import Layout from "../components/Layout";

export default function About() {
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
      <div className="bg-black text-white py-20 px-6 border-b-8 border-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
            ABOUT
          </h1>
          <p className="text-2xl md:text-3xl font-mono text-yellow-400 mb-4">
            Writer. Explorer. Truth Seeker.
          </p>
          <p className="text-lg md:text-xl font-mono text-white max-w-3xl mx-auto">
            Documenting the messy, beautiful journey of becoming human —<br/>
            one raw thought at a time.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Author Info Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Profile Image */}
          <div className="relative">
            <div className="border-8 border-black overflow-hidden transform hover:rotate-2 transition-transform">
              <img
                src="/nayer_peer.jpeg"
                alt="Syed Nayer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 border-4 border-black px-6 py-3 font-black text-2xl transform rotate-3">
              SYED NAYER
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <div className="bg-yellow-400 border-4 border-black p-8 mb-6 transform hover:scale-[1.02] transition-transform">
              <p className="font-mono text-lg leading-relaxed text-black">
                I'm always eager to connect with people who value growth, balance, and exploration. 
                Whether it's a conversation about personal development, mental well-being, or the 
                journeys we take both within ourselves and across the world, I'd love to hear from you.
              </p>
            </div>
            <div className="border-4 border-black p-8">
              <p className="font-mono text-lg leading-relaxed">
                Let's share ideas, experiences, and stories that inspire us to live wiser, stronger, 
                and more human.
              </p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-8 border-l-8 border-yellow-400 pl-6">
            WHAT I WRITE ABOUT
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Personal Development",
              "Mental Health",
              "Travel & Culture",
              "Life Lessons",
              "Community Building",
              "Authentic Living"
            ].map((topic, index) => (
              <div
                key={topic}
                className={`border-4 border-black p-6 font-black text-xl transform hover:scale-105 transition-all cursor-pointer ${
                  index % 3 === 0 ? "bg-yellow-400" : index % 3 === 1 ? "bg-black text-white hover:bg-yellow-400 hover:text-black" : "bg-white"
                }`}
              >
                {topic.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-black text-white border-8 border-yellow-400 p-12 mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
            GET IN <span className="text-yellow-400">TOUCH</span>
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
              <a href="mailto:syednayer016@gmail.com" className="font-mono text-white hover:text-yellow-400 transition break-all">
                syednayer016@gmail.com
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
            <h3 className="text-3xl font-black text-black mb-6">SEND A MESSAGE</h3>
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
