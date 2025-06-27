import React, { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Notification from '../components/Notification';
import { setPassword } from '../services/register';

interface LocationState {
  email?: string;
}

const SetUpPassword: React.FC = () => {
  const [UserPassword, setUserPassword] = useState<string>('');
  const [Status, setStatus] = useState<string>('')
  const [show, setShow] = useState<boolean>(false);
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [showErrorNotice, setShowErrorNotice] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email || '';

  const isStrong = UserPassword.length >= 12;

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const code_vrification_status = await setPassword(email, UserPassword);
      await setStatus(code_vrification_status.message);
      await setShowNotice(true);
      await navigate('/login', { state: { email } });
    } catch (error) {
      setShowErrorNotice(true);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-transparent bg-opacity-80 p-6 rounded-xl shadow-xl">
        {/* Stepper */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              {i < 2 && (
                <div className="flex items-center justify-center h-3">
                  <span className="text-teal-700 text-sm">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Set a Password</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Fill in the registration form by setting up the password. It will take a couple of seconds.
          </p>
        </div>

        {showNotice && (
          <Notification 
          message={`✅ ${Status}`} 
          onClose={() => setShowNotice(false)}/>
        )}
        {showErrorNotice && (
          <Notification 
          message={`❌ ${email} Invalid Password.`} 
          onClose={() => setShowErrorNotice(false)} />
        )}
        

        <form className="space-y-4" onSubmit={handleConfirm}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              readOnly
              required
              placeholder="example@gmail.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Set your password
            </label>
            <div className="relative mt-1">
              <input
                type={show ? 'text' : 'password'}
                maxLength={24}
                value={UserPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
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
            {UserPassword && (
              <p className={`text-sm mt-1 ${isStrong ? 'text-green-600' : 'text-red-500'}`}>
                {isStrong ? '✓ Good password' : '✗ Too short'}
              </p>
            )}
          </div>

          <hr className="border-t border-gray-300 dark:border-gray-600 my-4" />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUpPassword;
