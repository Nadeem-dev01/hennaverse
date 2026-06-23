export default function BlogLoading() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Blog Header Skeleton */}
      <header className="text-center mb-12 space-y-4">
        <div className="h-10 w-96 bg-border/40 rounded mx-auto animate-pulse" />
        <div className="h-5 w-80 bg-border/40 rounded mx-auto animate-pulse" />
      </header>

      {/* Blog Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-surface border border-border/40 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Blog Image Skeleton */}
            <div className="aspect-video bg-border/20 animate-pulse" />
            
            {/* Blog Content Skeleton */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex items-center gap-4">
                  <div className="h-4 w-16 bg-border/30 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-border/30 rounded animate-pulse" />
                </div>
                {/* Title */}
                <div className="h-6 w-11/12 bg-border/35 rounded animate-pulse" />
                {/* Description lines */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full bg-border/20 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-border/20 rounded animate-pulse" />
                </div>
              </div>
              
              {/* Read button */}
              <div className="h-4 w-24 bg-border/30 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
