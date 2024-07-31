import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/adminlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('adminId', data.adminId);
        setMessage('Login successful!');
        navigate('/questionset');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className={`space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div>
        <label className="block text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'}`}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'}`}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Login
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </form>
  );
};

export default Login;
