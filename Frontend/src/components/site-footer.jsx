import React from "react";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <p className="font-semibold">EcomSphere</p>
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} EcomSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
