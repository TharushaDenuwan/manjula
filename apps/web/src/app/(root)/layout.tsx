import { Footer } from "@/modules/layouts/footer";
import { Navbar } from "@/modules/layouts/navbar";
import { ContactSidebar } from "@/modules/layouts/social-media";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ContactSidebar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
