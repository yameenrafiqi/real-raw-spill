import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function About() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Writer. Explorer. Truth Seeker.";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-6 border-b-8 border-yellow-400">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl mb-6 leading-none animate-slide-in" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            ABOUT
          </h1>
          <p className="text-2xl md:text-3xl font-mono text-yellow-400 mb-4 animate-fade-in min-h-[2em]">
            {typedText}
            <span className="animate-blink">|</span>
          </p>
          <p className="text-lg md:text-xl font-mono text-white max-w-3xl mx-auto animate-fade-in">
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
            <div className="border-4 md:border-8 border-black overflow-hidden transform hover:rotate-2 transition-transform">
              <img
                src="/nayer_peer.jpeg"
                alt="Syed Nayer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 border-4 border-black px-4 md:px-6 py-2 md:py-3 font-black text-lg md:text-2xl transform rotate-3">
              SYED NAYER
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <div className="bg-yellow-400 border-4 border-black p-6 md:p-8 mb-6 transform hover:scale-[1.02] transition-transform">
              <p className="font-mono text-base md:text-lg leading-relaxed text-black">
                Nayer Ahtisham is a writer shaped by a journey through banking halls, corporate boardrooms, and the quiet spaces of personal reflection. He believes that life is not about chasing perfection but about embracing the challenges and struggles that shape who we are. Through writing, he transforms experiences into stories that offer clarity, insight, and inspiration.
                
                Based in Liverpool, UK.
              </p>
            </div>
            <div className="border-4 border-black p-6 md:p-8">
              <p className="font-mono text-base md:text-lg leading-relaxed">
                Let's share ideas, experiences, and stories that inspire us to live wiser, stronger, 
                and more human.
              </p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-6xl font-black mb-8 border-l-4 md:border-l-8 border-yellow-400 pl-4 md:pl-6">
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
                className={`border-4 border-black p-4 md:p-6 font-black text-lg md:text-xl transform hover:scale-105 transition-all cursor-pointer ${
                  index % 3 === 0 ? "bg-yellow-400" : index % 3 === 1 ? "bg-black text-white hover:bg-yellow-400 hover:text-black" : "bg-white"
                }`}
              >
                {topic.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
