import React, { ReactNode } from "react";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div style={{ backgroundColor: "#ecf6ff" }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
