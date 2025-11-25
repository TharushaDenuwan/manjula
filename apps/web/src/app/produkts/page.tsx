import { getAllProducts } from "@/features/product/actions/get-all-product.action";
import { ProductGrid } from "./product-grid";

export default async function ProduktsPage() {
  const productsData = await getAllProducts();

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/p9.JPG')",
          }}
        />

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#fffefc] text:shadow-xl">
              Unsere Produkte
            </h1>

            {/* Separator Line */}
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto my-6" />

            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white">
              Entdecken Sie unsere sorgfältig ausgewählten ayurvedischen
              Produkte für Ihr Wohlbefinden
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductGrid products={productsData.data} />
    </div>
  );
}
