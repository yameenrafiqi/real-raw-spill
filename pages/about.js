import Layout from "../components/Layout";

export default function About() {
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
                Nayer Ahtisham is a writer shaped by a journey through banking halls, corporate boardrooms, and the quiet spaces of personal reflection. He believes that life is not about chasing perfection but about embracing the challenges and struggles that shape who we are. Through writing, he transforms experiences into stories that offer clarity, insight, and inspiration.
                
                Based in Liverpool, UK.
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
      </div>
    </Layout>
  );
}
