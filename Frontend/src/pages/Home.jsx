import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

// Dummy products
const products = [
  { id: 1, name: "Smartphone Pro", price: 499, image: "https://via.placeholder.com/300x200" },
  { id: 2, name: "Wireless Headphones", price: 199, image: "https://via.placeholder.com/300x200" },
  { id: 3, name: "Smart Watch", price: 149, image: "https://via.placeholder.com/300x200" },
  { id: 4, name: "AI Laptop", price: 999, image: "https://via.placeholder.com/300x200" },
];

function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to AivoraAI</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Shop smarter with AI-powered recommendations and seamless shopping experience.
        </p>
        <Link to="/signup">
          <Button size="lg" variant="secondary">Get Started</Button>
        </Link>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Card key={p.id} className="hover:shadow-lg transition">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-600">${p.price}</p>
                <div className="flex justify-between mt-4">
                  <Link to={`/product/${p.id}`}>
                    <Button variant="outline">View</Button>
                  </Link>
                  <Button>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
