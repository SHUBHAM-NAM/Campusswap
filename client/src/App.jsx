import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Notes from "./pages/Notes";
import UploadNote from "./pages/UploadNote";
import BookDetail from "./pages/BookDetail";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute><Home /></ProtectedRoute>
            } />
            <Route path="/books" element={
              <ProtectedRoute><Books /></ProtectedRoute>
            } />
            <Route path="/add-book" element={
              <ProtectedRoute><AddBook /></ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute><Notes /></ProtectedRoute>
            } />
            <Route path="/upload-note" element={
              <ProtectedRoute><UploadNote /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/books/:id" element={
  <ProtectedRoute><BookDetail /></ProtectedRoute>
} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;