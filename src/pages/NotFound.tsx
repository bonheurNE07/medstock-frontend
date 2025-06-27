import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#212121] text-center px-6">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Page Not Found</p>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md transition"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
