
import React, { useState, useEffect } from 'react';

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [examStarted, setExamStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  useEffect(() => {
    const fetchPuzzleStatus = async () => {
      try {
        const puzzleStatusResponse = await fetch('http://localhost:3000/checkPuzzleStatus');
        if (puzzleStatusResponse.ok) {
          const { puzzleSolvedStatus } = await puzzleStatusResponse.json();
          setPuzzleSolved(puzzleSolvedStatus);
        } else {
          setError('Failed to check puzzle status.');
        }
      } catch (error) {
        console.error('Failed to check puzzle status:', error);
        setError('Failed to check puzzle status.');
      }
    };

    const fetchQuestions = async () => {
      setLoading(true);
      setExamStarted(false);
      setError('');

      try {
        if (puzzleSolved) {
          const questionsResponse = await fetch('http://localhost:3000/decryptedQuestions');
          if (questionsResponse.ok) {
            const data = await questionsResponse.json();
            if (data.length > 0) {
              setQuestions(data);
              setExamStarted(true);
            } else {
              setError('No questions available.');
            }
          } else {
            setError('Failed to fetch questions.');
          }
        } else {
          setError('The puzzle has not been solved yet.');
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError('Failed to fetch questions.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch puzzle status and then fetch questions if needed
    const fetchAllData = async () => {
      await fetchPuzzleStatus();
      fetchQuestions();
    };

    fetchAllData();
  }, [puzzleSolved]);

  const handleAnswerSubmit = () => {
    const currentQuestionId = questions[currentQuestionIndex].questionId;
    localStorage.setItem('currentQuestionId', currentQuestionId);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('You have completed the exam.');
    }
    setAnswer('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Loading...</p>
          <div className="animate-spin h-12 w-12 border-4 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!puzzleSolved) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">The puzzle has not been solved yet. The exam cannot start until the puzzle is solved.</p>
          <div className="animate-spin h-12 w-12 border-4 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return <p className="text-center text-xl">The exam has not yet started.</p>;
  }

  if (questions.length === 0) {
    return <p className="text-center text-xl">No questions available.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
      <div className="space-y-4">
        <p>{currentQuestion.question}</p>
        {['option1', 'option2', 'option3', 'option4'].map((optionKey, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">Option {index + 1}</label>
            <input
              type="radio"
              name="answer"
              value={currentQuestion[optionKey]}
              checked={answer === currentQuestion[optionKey]}
              onChange={() => setAnswer(currentQuestion[optionKey])}
              className="mr-2"
            />
            <span>{currentQuestion[optionKey]}</span>
          </div>
        ))}
        <button
          onClick={handleAnswerSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
