export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#212121] transition-colors duration-300">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text To show */}
        <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
