import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";  // ← Add this import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import Notes from "./pages/Notes";
import UploadNote from "./pages/UploadNote";
import Profile from "./pages/Profile";
import MyChats from "./pages/MyChats";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      {user && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {user && <Footer />}   {/* ← Add this */}
    </div>
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
            <Route path="/books/:id" element={
              <ProtectedRoute><BookDetail /></ProtectedRoute>
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
            <Route path="/my-chats" element={
              <ProtectedRoute><MyChats /></ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;