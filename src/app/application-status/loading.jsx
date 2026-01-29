export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="h-12 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}