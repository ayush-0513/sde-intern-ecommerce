function SkeletonLoader() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-64 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}
export default SkeletonLoader;