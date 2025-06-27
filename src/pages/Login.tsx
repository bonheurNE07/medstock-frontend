import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Notification from '../components/Notification';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorNotice, setShowErrorNotice] = useState(false);
  const [show, setShow] = useState(false);
  const isStrong = password.length >= 12;

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state) {
      const { email: locEmail, } = location.state;
      if (locEmail) setEmail(locEmail);
    }
  }, [location.state]);

  const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setShowErrorNotice(true);
      console.error(err);
    }
    // navigate("/farmer-regist")
  };


  return (
    <div className="w-full max-w-md space-y-6 bg-white dark:bg-transparent bg-opacity-80  p-6 rounded-xl shadow-xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Login</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Fill in the login form to use the application
        </p>
      </div>

      {showErrorNotice && (
        <Notification 
          message={`❌ ${email} Invalid User Email address or Password.`} 
          onClose={() => setShowErrorNotice(false)} />
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter Your password
          </label>
          <div className="relative mt-1">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              aria-label="Toggle password visibility"
            >
              <Eye size={18} />
            </button>
          </div>
          {password && (
            <p className={`text-sm mt-1 ${isStrong ? 'text-green-600' : 'text-red-500'}`}>
              {isStrong ? '✓ Good password' : '✗ Too short'}
            </p>
          )}
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600 my-4" />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="text-sm text-center text-gray-700 dark:text-gray-300">
        Not a member?{' '}
        <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
          Register
        </Link>
      </p>
    </div>
  );
}
