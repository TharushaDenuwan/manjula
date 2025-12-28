import { Footer } from "@/modules/layouts/footer";
import { Navbar } from "@/modules/layouts/navbar";
import { Providers } from "@/modules/layouts/providers";
import { ContactSidebar } from "@/modules/layouts/social-media";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ContactSidebar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
