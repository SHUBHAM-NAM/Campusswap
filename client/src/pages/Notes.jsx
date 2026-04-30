import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import NoteCard from "../components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [type, setType] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notes', {
        params: { search, semester, branch, type }
      });
      setNotes(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search, semester, branch, type]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">📝 Notes & PYQs</h1>
        <Link
          to="/upload-note"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium"
        >
          + Upload Note
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          placeholder="Search notes, subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-2 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none"
        >
          <option value="">All Semesters</option>
          {[1,2,3,4,5,6,7,8].map(s => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none"
        >
          <option value="">All Branches</option>
          {['CSE','IT','ECE','ME','CE','EE'].map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="Notes">Notes</option>
          <option value="PYQ">PYQ</option>
          <option value="Assignment">Assignment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found 😕</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;