

import React, { useState } from 'react';

const VerifyForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    questionId: '',
    response: '',
    timestamp: '',
    signature: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/verifyStateMachine', {
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
    } catch (error) {
      console.error('Error verifying state machine:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Verify State Machine</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            className="border py-2 px-4 rounded"
            required
          />
          <input
            type="text"
            name="questionId"
            placeholder="Question ID"
            value={formData.questionId}
            onChange={handleChange}
            className="border py-2 px-4 rounded"
            required
          />
          <input
            type="text"
            name="response"
            placeholder="Response"
            value={formData.response}
            onChange={handleChange}
            className="border py-2 px-4 rounded"
            required
          />
          <input
            type="text"
            name="timestamp"
            placeholder="Timestamp"
            value={formData.timestamp}
            onChange={handleChange}
            className="border py-2 px-4 rounded"
            required
          />
          <input
            type="text"
            name="signature"
            placeholder="Signature"
            value={formData.signature}
            onChange={handleChange}
            className="border py-2 px-4 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Verify
          </button>
        </form>
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
