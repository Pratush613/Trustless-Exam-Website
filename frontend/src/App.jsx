import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import LandingPage from './pages/LandingPage';
import Login from './components/AdminLogin'; 
import QuestionSet from './pages/QuestionSet'; 
import ExamPage from './pages/ExamPage';
import QueueVerifyToggle from './pages/QueueVerifyButtons'
import VerifyForm from './components/VerifyForm'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/questionset" element={<QuestionSet />} />
          <Route path="/ExamPage" element={<ExamPage />} />
          <Route path="/users" element ={<QueueVerifyToggle />} />
          <Route path="/verify" element ={<VerifyForm />} />
          <Route path="/results" element ={<ResultsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
