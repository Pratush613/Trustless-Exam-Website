import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const QuestionForm = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      alert('Unauthorized: Admin ID is missing');
      return;
    }

    const payload = {
      adminId,
      question,
      option1,
      option2,
      option3,
      option4,
      correctOption,
    };

    try {
      const response = await fetch(`http://localhost:3000/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        // Reset form fields to initial state
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOption('');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Failed to submit question:', error);
      alert('Failed to submit question');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-2">
      {/* Header */}
      <header className="flex items-center justify-between p-4 mb-4 bg-gradient-to-r rounded-xl from-gray-800 to-gray-900 text-white shadow-md">
        <h1 className="text-xl font-bold">Question Set 📄</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          Go Back to Home
        </button>
      </header>

      {/* Form Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border w-[600px] border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit a New Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the question"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Option 1</label>
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                placeholder="Enter option 1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Option 2</label>
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                placeholder="Enter option 2"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Option 3</label>
              <input
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                placeholder="Enter option 3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Option 4</label>
              <input
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                placeholder="Enter option 4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correct Option</label>
              <input
                type="text"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                placeholder="Enter the correct option"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QuestionForm;
