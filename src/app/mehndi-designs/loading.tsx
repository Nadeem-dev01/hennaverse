export default function MehndiDesignsLoading() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-32 bg-border/40 rounded animate-pulse mb-8" />

      {/* Heading Skeleton */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 w-64 bg-border/40 rounded mx-auto animate-pulse" />
        <div className="h-5 w-96 bg-border/40 rounded mx-auto animate-pulse" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col glass rounded-2xl overflow-hidden border border-border/40"
          >
            {/* Image Placeholder */}
            <div className="relative aspect-video bg-border/20 animate-pulse flex items-end p-4">
              <div className="space-y-2 w-full">
                <div className="h-6 w-1/2 bg-border/40 rounded" />
                <div className="h-4 w-1/3 bg-border/30 rounded" />
              </div>
            </div>
            {/* Description & Link Placeholders */}
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-full bg-border/20 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-border/20 rounded animate-pulse" />
              </div>
              <div className="h-4 w-28 bg-border/30 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
