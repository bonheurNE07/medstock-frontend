import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { sendVerificationCode } from '../services/register';

const Registration: React.FC = () => {
  const [showNotice, setShowNotice] = useState(true);
  const [showErrorNotice, setShowErrorNotice] = useState(false);
  const [showMailStatus, setShowMailStatus] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+250');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullPhone = `${countryCode} ${phone}`;
    try {
      await sendVerificationCode(email, fullPhone);
      await setShowMailStatus(true);
      await navigate('/confirmation', {
      state: {
        email,
        phone: fullPhone,
      },
    });
    }
    catch (error) {
      setShowErrorNotice(true);
      console.error(error);
    }
    
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white dark:bg-transparent bg-opacity-80 p-6 rounded-xl shadow-xl">
      {/* Stepper */}
      <div className="flex justify-center items-center space-x-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-blue-600" />
        <div className="flex items-center justify-center h-3">
            <span className="text-teal-700 text-sm">→</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        <div className="flex items-center justify-center h-3">
            <span className="text-teal-700 text-sm">→</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-gray-300" />
       </div>


      {/* Title + Description */}
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white">Registration</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Fill in the registration form. It only takes a few minutes.
        </p>
      </div>

      {/* Notice Box */}
      {showNotice && (
        <Notification 
        message="We take privacy seriously. Your personal data is securely protected." 
        onClose={() => setShowNotice(false)} />
      )}
      {showMailStatus && (
        <Notification 
        message={`✅ Verification code sent to : ${email} email address.`} 
        onClose={() => setShowNotice(false)} />
      )}
      {showErrorNotice && (
        <Notification 
        message={`❌ Failed to send verification code to ${email} email address.`} 
        onClose={() => setShowErrorNotice(false)} />
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your phone number
          </label>
          <div className="flex space-x-2 mt-1">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-24 px-2 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="+250">+250</option>
              <option value="+243">+243</option>
              <option value="+254">+254</option>
            </select>
            <input
              type="tel"
              maxLength={9}
              placeholder="555 555-1234"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600 my-4" />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Send Code
        </button>
      </form>
    </div>
  );
}


export default Registration;