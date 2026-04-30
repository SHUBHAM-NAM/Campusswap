import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [myNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("books");
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [profileRes, booksRes, notesRes] = await Promise.all([
        api.get('/user/profile'),
        api.get('/user/my-books'),
        api.get('/user/my-notes'),
      ]);
      setProfile(profileRes.data);
      setEditForm(profileRes.data);
      setMyBooks(booksRes.data);
      setMyNotes(notesRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/user/profile', editForm);
      setProfile(res.data);
      setEditing(false);
      setUpdateMsg("Profile updated successfully! ✅");
      setTimeout(() => setUpdateMsg(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkSold = async (bookId) => {
    try {
      await api.patch(`/books/${bookId}/sold`);
      setMyBooks(myBooks.map(b =>
        b._id === bookId ? { ...b, status: 'sold' } : b
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await api.delete(`/books/${bookId}`);
      setMyBooks(myBooks.filter(b => b._id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${noteId}`);
      setMyNotes(myNotes.filter(n => n._id !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading profile...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                {profile?.name?.charAt(0).toUpperCase()}
              </div>
              {!editing ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
                  <p className="text-gray-500">{profile?.email}</p>
                  <p className="text-gray-500">📱 {profile?.phone}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                      {profile?.branch}
                    </span>
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                      Semester {profile?.semester}
                    </span>
                  </div>
                </>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-3 mt-2">
                  <input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    placeholder="Name"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    value={editForm.phone || ""}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    placeholder="Phone"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="flex gap-2">
                    <select
                      value={editForm.branch || ""}
                      onChange={(e) => setEditForm({...editForm, branch: e.target.value})}
                      className="border px-3 py-2 rounded-lg focus:outline-none"
                    >
                      {['CSE','IT','ECE','ME','CE','EE'].map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <select
                      value={editForm.semester || ""}
                      onChange={(e) => setEditForm({...editForm, semester: e.target.value})}
                      className="border px-3 py-2 rounded-lg focus:outline-none"
                    >
                      {[1,2,3,4,5,6,7,8].map(s => (
                        <option key={s} value={s}>Sem {s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                      Save
                    </button>
                    <button type="button" onClick={() => setEditing(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {updateMsg && <p className="text-green-500 text-sm mt-2">{updateMsg}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {!editing && (
                <button onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  ✏️ Edit Profile
                </button>
              )}
              <button onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 border-t pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{myBooks.length}</p>
              <p className="text-xs text-gray-500">Books Listed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{myNotes.length}</p>
              <p className="text-xs text-gray-500">Notes Uploaded</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {myBooks.filter(b => b.status === 'sold').length}
              </p>
              <p className="text-xs text-gray-500">Books Sold</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("books")}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition
              ${activeTab === "books"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            📚 My Books ({myBooks.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition
              ${activeTab === "notes"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            📝 My Notes ({myNotes.length})
          </button>
        </div>

        {/* My Books Tab */}
        {activeTab === "books" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">My Book Listings</h3>
              <Link to="/add-book"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                + Add Book
              </Link>
            </div>
            {myBooks.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                No books listed yet. <Link to="/add-book" className="text-blue-600">List one now!</Link>
              </p>
            ) : (
              <div className="space-y-3">
                {myBooks.map(book => (
                  <div key={book._id}
                    className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <img
                        src={book.photo || "https://via.placeholder.com/60?text=📚"}
                        alt={book.title}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{book.title}</h4>
                        <p className="text-sm text-gray-500">{book.subject} • Sem {book.semester}</p>
                        <p className="text-blue-600 font-bold">₹{book.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium
                        ${book.status === 'available'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'}`}>
                        {book.status === 'available' ? '🟢 Available' : '🔴 Sold'}
                      </span>
                      <div className="flex gap-2">
                        {book.status === 'available' && (
                          <button
                            onClick={() => handleMarkSold(book._id)}
                            className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-lg hover:bg-orange-200">
                            Mark Sold
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Notes Tab */}
        {activeTab === "notes" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">My Uploaded Notes</h3>
              <Link to="/upload-note"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">
                + Upload Note
              </Link>
            </div>
            {myNotes.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                No notes uploaded yet. <Link to="/upload-note" className="text-purple-600">Upload one now!</Link>
              </p>
            ) : (
              <div className="space-y-3">
                {myNotes.map(note => (
                  <div key={note._id}
                    className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{note.title}</h4>
                      <p className="text-sm text-gray-500">{note.subject} • Sem {note.semester} • {note.branch}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                          {note.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          ⬇️ {note.downloads} downloads
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href={note.fileUrl} target="_blank" rel="noreferrer"
                        className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-200">
                        View PDF
                      </a>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;