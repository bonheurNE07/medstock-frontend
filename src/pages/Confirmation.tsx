import React, { useState, useEffect, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Repeat2 } from 'lucide-react';
import Notification from '../components/Notification';
import { sendVerificationCode, verifyCode } from '../services/register';

const Confirmation: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);
  const [showErrorNotice, setShowErrorNotice] = useState(false);
  const [showResentStatus, setShowResentStatus] = useState(false);
  const [sentStatusMessage, setSentStatusMessage] = useState<string>('');
  const [codeStatus, setCodeStatus] = useState('');
  const [code, setCode] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const phone = location.state?.phone || '';

  // Redirect if state is missing
  useEffect(() => {
    if (!email || !phone) {
      navigate('/registration'); // go back to registration if accessed directly
    }
  }, [email, phone, navigate]);

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const code_verification_status = await verifyCode(email, code);
      await setCodeStatus(code_verification_status.message);
      await setShowNotice(true);
      await navigate('/setpassword',{
      state: {
        email,
      },
    });
    }
    catch (error) {
      setShowErrorNotice(true);
      console.error(error);
    }
  };

  const handleResent = async () => {
    try {
      const sent_status = await sendVerificationCode(email, phone);
      await setSentStatusMessage(sent_status.message);
      await setShowResentStatus(true)
    } catch (error) {
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
        <div className="w-3 h-3 rounded-full bg-blue-600" />
        <div className="flex items-center justify-center h-3">
          <span className="text-teal-700 text-sm">→</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-gray-300" />
      </div>

      {/* Title + Description */}
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white">Confirmation</h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-1">
          Fill in the confirmation code we’ve sent you on your email. It will take a couple of minutes.
        </p>
      </div>

      {/* Notification */}
      {showNotice && (
        <Notification 
        message={`✅ ${codeStatus}`} 
        onClose={() => setShowNotice(false)}/>
      )}
      {showErrorNotice && (
        <Notification 
        message={`❌ ${code} Invalid or expired code.\nResend.`} 
        onClose={() => setShowErrorNotice(false)} />
      )}
      {showResentStatus && (
        <Notification 
        message={`✅ ${sentStatusMessage}`} 
        onClose={() => setShowNotice(false)}/>
      )}


      {/* Form */}
      <form className="space-y-4" onSubmit={handleConfirm}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your email address
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your phone number
          </label>
          <input
            type="text"
            value={phone}
            readOnly
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmation code
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="—— ——"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 w-full px-4 py-2 border-b-2 border-blue-500 focus:outline-none text-center bg-transparent text-xl tracking-widest"
          />
          <p className="text-sm text-gray-600 mt-1">Confirm email address with code from SMS message</p>
          <button
            type="button"
            className="flex items-center text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
            onClick={handleResent}
          >
            <span className='flex items-center'><Repeat2 size={18} /><span className='mx-1'>Send again</span></span>
          </button>
        </div>

        <hr className="border-t border-gray-300 dark:border-gray-600 my-4" />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default Confirmation;
