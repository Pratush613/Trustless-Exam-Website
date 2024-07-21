import React, { useState } from 'react';

const ResultsPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = JSON.parse(jsonInput);
      const response = await fetch('http://localhost:3000/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responses)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Results response:', data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Results</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Paste your JSON array here"
            rows="10"
            cols="50"
            className="border py-2 px-4 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Submit
          </button>
        </form>
        {results && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <pre className="bg-white p-4 rounded">{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
