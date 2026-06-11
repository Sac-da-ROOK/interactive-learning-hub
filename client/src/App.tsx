import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page component imports
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import LessonViewer from './pages/LessonViewer';
import Quiz from './pages/Quiz';
import Flashcards from './pages/Flashcards';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

// Global layout wrapper
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar will go here later */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar will go here later */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* Protected/Student Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonViewer />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/flashcards/:id" element={<Flashcards />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;