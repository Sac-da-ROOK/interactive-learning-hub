import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import LessonViewer from './pages/LessonViewer';
import Quiz from './pages/Quiz';
import Flashcards from './pages/Flashcards';
import Admin from './pages/Admin';
import Login from './pages/Login'; // <-- Import your new Login page

export default function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen font-sans antialiased">
        {/* Navigation Sidebar Panel */}
        <Sidebar />

        {/* Core Layout Right-side viewport wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-7xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:id" element={<LessonViewer />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} /> {/* <-- Route declaration */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}