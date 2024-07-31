import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QueueData from '../components/QueueData';


const QueueVerifyButtons = () => {
  const [queueData, setQueueData] = useState([]);
  const navigate = useNavigate();

  const handleQueueClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/queue`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Queue response:', data);
      setQueueData(data);
    } catch (error) {
      console.error('Error fetching queue data:', error);
    }
  };

  const handleVerifyClick = () => {
    navigate('/verify');
  };

  const handleResultsClick = () => {
    navigate('/results');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Queue, Verify and Results Buttons</h1>
        <div className="space-x-4">
          <button
            onClick={handleQueueClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Queue
          </button>
          <button
            onClick={handleVerifyClick}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Verify
          </button>
          <button
            onClick={handleResultsClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Results
          </button>
        </div>
        <QueueData data={queueData} />
      </div>
    </div>
  );
};

export default QueueVerifyButtons;
