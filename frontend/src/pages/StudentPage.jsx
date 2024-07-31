import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLogin from '../components/StudentLogin';
import StudentSignUp from '../components/StudentSignUp';

const StudentPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToHome = () => {
    navigate('/');  // Navigate to the home page
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400'} flex flex-col min-h-screen transition-colors duration-500`}>
      {/* Header with Logo and Dark Mode Toggle */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={navigateToHome}>
          <img src="https://i.pinimg.com/564x/57/e9/86/57e986970dda41956846e64333af1838.jpg" alt="Logo" className="h-10 w-10 rounded-lg" />
          <span className="text-2xl font-extrabold tracking-wide transform transition-transform duration-500 hover:scale-110 hover:text-yellow-400">
            Trustless <span className="text-yellow-400">ES</span>
          </span>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-800' : 'bg-gray-800 hover:bg-gray-700 text-white'} py-2 px-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow">
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-10 rounded-lg shadow-lg w-full max-w-md transition-colors duration-500`}>
          <h1 className="text-3xl font-extrabold mb-6">{isLogin ? 'Student Login' : 'Student Sign Up'}</h1>
          {isLogin ? <StudentLogin /> : <StudentSignUp />}
          <button
            onClick={toggleForm}
            className="mt-6 text-blue-500 hover:text-blue-700 underline transition-colors duration-300"
          >
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
