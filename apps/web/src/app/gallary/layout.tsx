import { Footer } from "@/modules/layouts/footer";
import { Navbar } from "@/modules/layouts/navbar";

export default function MassageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
