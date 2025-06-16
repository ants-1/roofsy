'use client';

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow flex flex-col sm:flex-row gap-1 justify-between items-stretch border border-gray-200 animate-pulse max-w-[45rem] w-full h-[34rem] sm:h-[16rem]">
      {/* Image Skeleton */}
      <div className="relative w-full sm:w-64 h-72 sm:h-full overflow-hidden bg-gray-200 rounded-t-lg sm:rounded-l-lg sm:rounded-r-none" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-2 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-1/2" /> 
        <div className="h-4 bg-gray-200 rounded w-full" /> 
        <div className="h-4 bg-gray-200 rounded w-5/6" /> 
        <div className="h-4 bg-gray-200 rounded w-2/3" /> 
        <div className="h-4 bg-gray-200 rounded w-1/3" /> 
        <div className="flex flex-wrap gap-4 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-20" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md my-8 border border-gray-200 animate-pulse">
      {/* Title */}
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />

      {/* Main Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-200 mb-6" />

      {/* Icons section */}
      <div className="flex flex-wrap gap-8 text-gray-700 mb-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-2 w-32">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>

      {/* Info Lines */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="relative w-full h-32 rounded overflow-hidden bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

