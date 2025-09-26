// src/components/Cta.jsx
import { Link } from "react-router-dom";
import { Button } from "../ui/button"; // adjust import path if needed

export function Cta() {
  return (
    <section className="border-y bg-muted">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to start shopping?
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          Browse our extensive collection and find exactly what you’re looking for.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg">
            <Link to="/products">Browse All Products</Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
