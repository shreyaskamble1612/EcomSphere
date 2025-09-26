import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom"; // Optional, for SPA navigation

export function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Discover amazing products at unbeatable prices
          </h1>
          <p className="text-pretty text-muted-foreground text-lg">
            Handpicked quality, fast delivery, and secure checkout—everything you need for a delightful shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Shop Now Button */}
            <Button asChild size="lg">
              <Link to="/products">Shop Now</Link>
            </Button>

            {/* Create Account Button */}
            <Button asChild size="lg" variant="outline">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-card">
          <img
            src="/modern-ecommerce-hero-mockup.jpg"
            alt="Preview of curated products"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
