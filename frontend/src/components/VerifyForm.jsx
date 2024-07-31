import { useState } from 'react';


const VerifyForm = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = JSON.parse(jsonInput); // Parse the JSON input
      const response = await fetch(`http://localhost:3000/verifyStateMachine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Verification response:', data);
      setResult(data);
      setError(null);
    } catch (error) {
      console.error('Error verifying state machine:', error);
      setError('Invalid JSON format or network error.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Verify State Machine</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="jsonInput"
            placeholder='{"studentId": "", "questionId": "", "response": "", "timestamp": "", "signature": ""}'
            value={jsonInput}
            onChange={handleChange}
            className="border py-2 px-4 rounded w-full h-64"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Verify
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <pre className="bg-white p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyForm;
