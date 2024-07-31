import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleStudentClick = () => {
    navigate('/student');
  };

  const handleAllUsersClick = () => {
    navigate('/users');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-green-200 via-blue-200 to-purple-200'} flex flex-col min-h-screen transition-colors duration-500`}>
      {/* Header */}
      <header className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 text-gray-800'} shadow-md`}>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pinimg.com/564x/57/e9/86/57e986970dda41956846e64333af1838.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-lg"
          />
          <h1 className="text-xl font-bold">Trustless ES</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-800' : 'bg-gray-800 hover:bg-gray-700 text-white'} py-2 px-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center">
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} text-center p-10 rounded-xl border-2 border-black shadow-lg transition-colors duration-500 max-w-lg mx-auto`}>
          <h1 className="text-5xl font-extrabold mb-10 animate-pulse md:text-4xl sm:text-3xl">Trustless Examination System</h1>
          <div className="flex flex-wrap justify-center space-x-6 mb-6 gap-4">
            <button
              onClick={handleAdminClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Admin
            </button>
            <button
              onClick={handleStudentClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Student
            </button>
            <button
              onClick={handleAllUsersClick}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              All Users
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-white text-center">
        <p className="text-lg font-semibold">
          Created by{' '}
          <span className="text-yellow-400 font-bold">Vaishnavi Raj</span>,{' '}
          <span className="text-green-400 font-bold">Pratush Sinha</span>, and{' '}
          <span className="text-blue-400 font-bold">Pranav Kumar</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
