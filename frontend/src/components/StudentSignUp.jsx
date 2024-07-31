import { useState } from 'react';


const StudentSignUp = ({ isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/studentSignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Student created successfully!');
        setUsername('');
        setPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create student');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSignUp} className={`space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div>
        <label className="block text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'}`}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'}`}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Sign Up
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default StudentSignUp;
