import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to SmartEcomAI</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          An AI-powered E-commerce platform built with MERN & Machine Learning.  
          Smart recommendations, sentiment analysis, and seamless shopping — all in one.
        </p>
        <div className="space-x-4">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-blue-500 text-white hover:bg-blue-400">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "AI Recommendations", desc: "Personalized product suggestions powered by Machine Learning." },
            { title: "Smart Cart", desc: "Add, remove, and manage your cart with ease and intelligence." },
            { title: "Sentiment Analysis", desc: "Analyze customer reviews to see what buyers feel about products." },
            { title: "Secure Auth", desc: "Fast and safe Login & Signup with JWT-based authentication." },
            { title: "Product Search", desc: "Smart search with keyword matching & AI enhancements." },
            { title: "Fast Checkout", desc: "Quick and simple checkout process with dummy payments." }
          ].map((f, idx) => (
            <Card key={idx} className="shadow-md hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-center" id="about">
        <h2 className="text-3xl font-bold mb-6">About SmartEcomAI</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          SmartEcomAI is a modern E-commerce platform built using the MERN stack and enhanced 
          with Machine Learning. It provides intelligent product recommendations, smart carts, 
          sentiment analysis for reviews, and a smooth shopping experience.  
          <br /> <br />
          Whether you’re a customer looking for the best products, or a developer exploring 
          ML integration with E-commerce, SmartEcomAI demonstrates the power of combining 
          AI with modern web development.
        </p>
      </section>

      {/* Screenshots / Preview Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 text-center" id="preview">
        <h2 className="text-3xl font-bold mb-12">Preview Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: "https://via.placeholder.com/400x250", caption: "Homepage" },
            { img: "https://via.placeholder.com/400x250", caption: "Product Page" },
            { img: "https://via.placeholder.com/400x250", caption: "Cart & Checkout" }
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={s.img} alt={s.caption} className="w-full h-48 object-cover" />
              <p className="p-4 text-gray-700 font-medium">{s.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Smart Shopping?</h2>
        <p className="mb-8">Sign up now and explore the future of E-commerce with AI.</p>
        <Link to="/signup">
          <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-200">
            Sign Up Today
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} SmartEcomAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
