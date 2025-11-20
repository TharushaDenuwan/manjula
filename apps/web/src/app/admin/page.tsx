import { getAllPosts } from "@/features/post/actions/get-all-post.action";
import { getAllProducts } from "@/features/product/actions/get-all-product.action";
import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { FileText, Package, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminPage() {
  // Fetch latest posts and products
  const [postsData, productsData] = await Promise.all([
    getAllPosts({ limit: 3, sort: "desc" }),
    getAllProducts({ limit: 3, sort: "desc" })
  ]);

  const latestPosts = postsData.data;
  const latestProducts = productsData.data;
  const totalPosts = postsData.meta.totalCount;
  const totalProducts = productsData.meta.totalCount;

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col bg-gradient-to-br from-[#FAF9F6] to-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-[#D4AF37]/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <AppPageShell
              title="Admin Dashboard"
              description="Welcome back! Here's an overview of your content and statistics."
              actionComponent=""
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-white border-[#D4AF37]/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-600">Total Posts</CardDescription>
                  <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-[#0F172A] mt-2">
                  {totalPosts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span>All time posts</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-white border-[#D4AF37]/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-600">Total Products</CardDescription>
                  <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                    <Package className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-[#0F172A] mt-2">
                  {totalProducts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span>All time products</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-white border-[#D4AF37]/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-600">Recent Posts</CardDescription>
                  <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-[#0F172A] mt-2">
                  {latestPosts.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Latest 3 posts</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-white border-[#D4AF37]/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-600">Recent Products</CardDescription>
                  <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                    <Package className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-[#0F172A] mt-2">
                  {latestProducts.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Latest 3 products</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Latest Posts and Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Latest Posts Section */}
            <Card className="bg-white border-[#D4AF37]/20 shadow-lg">
              <CardHeader className="border-b border-[#D4AF37]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-[#0F172A]">Latest Posts</CardTitle>
                    <CardDescription className="mt-1">Most recent posts from your collection</CardDescription>
                  </div>
                  <Link
                    href="/admin/post"
                    className="text-[#D4AF37] hover:text-[#C19A2F] font-semibold text-sm transition-colors"
                  >
                    View All →
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {latestPosts.length > 0 ? (
                  <div className="space-y-4">
                    {latestPosts.map((post) => (
                      <Link
                        key={post.id}
                        href="/admin/post"
                        className="block group hover:bg-[#D4AF37]/5 rounded-lg p-3 transition-all"
                      >
                        <div className="flex gap-4">
                          {post.postImageUrl && (
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
                              <Image
                                src={post.postImageUrl}
                                alt={post.postTitle}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                              {post.postTitle}
                            </h3>
                            {post.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {post.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No posts yet. Create your first post!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Latest Products Section */}
            <Card className="bg-white border-[#D4AF37]/20 shadow-lg">
              <CardHeader className="border-b border-[#D4AF37]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-[#0F172A]">Latest Products</CardTitle>
                    <CardDescription className="mt-1">Most recent products from your collection</CardDescription>
                  </div>
                  <Link
                    href="/admin/product"
                    className="text-[#D4AF37] hover:text-[#C19A2F] font-semibold text-sm transition-colors"
                  >
                    View All →
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {latestProducts.length > 0 ? (
                  <div className="space-y-4">
                    {latestProducts.map((product) => (
                      <Link
                        key={product.id}
                        href="/admin/product"
                        className="block group hover:bg-[#D4AF37]/5 rounded-lg p-3 transition-all"
                      >
                        <div className="flex gap-4">
                          {product.productImageUrl && (
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
                              <Image
                                src={product.productImageUrl}
                                alt={product.productName}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                              {product.productName}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {product.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              {product.price && (
                                <p className="text-sm font-semibold text-[#D4AF37]">
                                  {product.price}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                {new Date(product.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No products yet. Create your first product!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
