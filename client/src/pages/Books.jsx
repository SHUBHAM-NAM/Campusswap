import { useState, useEffect } from "react";
import api from "../utils/api";
import BookCard from "../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [condition, setCondition] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/books', {
        params: { search, semester, branch, condition }
      });
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, semester, branch, condition]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📚 Browse Books</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          placeholder="Search book, subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-2 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none"
        >
          <option value="">All Conditions</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      {/* Books Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books found 😕</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;