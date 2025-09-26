import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Truck, CreditCard, Star } from "lucide-react";

const items = [
  {
    title: "Fast Delivery",
    description: "Get your orders delivered quickly and safely to your doorstep.",
    Icon: Truck,
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence using our industry-standard secure checkout.",
    Icon: CreditCard,
  },
  {
    title: "Quality Products",
    description: "A curated selection of high-quality products at great prices.",
    Icon: Star,
  },
];

export function Features() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose EcomSphere?</h2>
          <p className="mt-2 text-muted-foreground text-lg">
            Experience the best online shopping with these standout features
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, description, Icon }) => {
            const IconComponent = Icon;
            return (
              <Card key={title} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex w-10 h-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground">{description}</CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
