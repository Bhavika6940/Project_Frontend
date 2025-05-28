
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import UploadCourse from './pages/UploadCourse';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Course';
import CourseDetail from './pages/CoursesDetail';
import Quiz from './pages/Quiz';
import UploadQuestions from './pages/AssessmentUpload';



function AppWrapper() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Navbar />} {/* Only show navbar if user is logged in */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/upload-course" element={<ProtectedRoute><UploadCourse /></ProtectedRoute>} />
        <Route path="/assessment-upload/:courseId" element={<ProtectedRoute><UploadQuestions/></ProtectedRoute>}/>
        <Route path="/quiz/:aid" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
       
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

export default App;
