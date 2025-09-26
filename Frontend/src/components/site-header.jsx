import React from "react";
import { Link } from "react-router-dom"; // For navigation in React
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/placeholder-logo.svg"
            alt="EcomSphere logo"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="font-semibold">EcomSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm hover:opacity-80">
            Products
          </Link>
          <Link to="/register" className="text-sm hover:opacity-80">
            Create Account
          </Link>
          <Button asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>EcomSphere</SheetTitle>
              </SheetHeader>
              <div className="mt-6 grid gap-3">
                <Button asChild variant="ghost" className="justify-start">
                  <Link to="/products">Products</Link>
                </Button>
                <Button asChild variant="ghost" className="justify-start">
                  <Link to="/register">Create Account</Link>
                </Button>
                <Button asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
