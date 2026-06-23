export default function GalleryLoading() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-32 bg-border/40 rounded animate-pulse mb-8" />

      {/* Heading Skeleton */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 w-80 bg-border/40 rounded mx-auto animate-pulse" />
        <div className="h-5 w-full max-w-xl bg-border/40 rounded mx-auto animate-pulse" />
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-10 w-28 bg-border/30 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Gallery Cards Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-surface border border-border/40 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Square Aspect Ratio Image Box */}
            <div className="aspect-square bg-border/20 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 bg-border/35 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-border/25 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
