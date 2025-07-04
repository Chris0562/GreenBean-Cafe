export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-light-cream">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-deep-teal mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-deep-teal mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
    </div>
  );
}
