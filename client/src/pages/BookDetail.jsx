import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";

const BookDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleMarkSold = async () => {
    try {
      await api.patch(`/books/${id}/sold`);
      setBook({ ...book, status: "sold" });
    } catch (error) {
      console.error(error);
      alert("Failed to mark the book as sold. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await api.delete(`/books/${id}`);
      navigate("/books");
    } catch (error) {
      console.error(error);
      alert("Failed to delete the listing. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Book not found!</p>
      </div>
    );
  }

  const isOwner = user?.id === book?.seller?._id;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={book.photo || "https://via.placeholder.com/800x300?text=No+Image"}
          alt={book.title || "Book Image"}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              book.status === "available"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {book.status === "available" ? "🟢 Available" : "🔴 Sold"}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mt-3">{book.title}</h1>
          <p className="text-gray-500 mt-1">by {book.author}</p>
          <p className="text-3xl font-bold text-blue-600 mt-4">₹{book.price}</p>

          <div className="grid grid-cols-2 gap-4 mt-6 bg-gray-50 rounded-xl p-4">
            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="font-semibold text-gray-700">{book.subject}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Condition</p>
              <p
                className={`font-semibold ${
                  book.condition === "Good"
                    ? "text-green-600"
                    : book.condition === "Fair"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {book.condition}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Semester</p>
              <p className="font-semibold text-gray-700">Semester {book.semester}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Branch</p>
              <p className="font-semibold text-gray-700">{book.branch}</p>
            </div>
          </div>

          {book.description && (
            <div className="mt-4">
              <p className="text-xs text-gray-400">Description</p>
              <p className="text-gray-600 mt-1">{book.description}</p>
            </div>
          )}

          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-700 mb-2">👤 Seller Info</p>
            <p className="text-gray-700 font-semibold">{book.seller?.name}</p>
            <p className="text-gray-500 text-sm">{book.seller?.email}</p>
            <p className="text-gray-500 text-sm">
              Branch: {book.seller?.branch} | Sem: {book.seller?.semester}
            </p>
            <a
              href={`tel:${book.seller?.phone}`}
              className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              📞 Call Seller
            </a>
          </div>

          {!isOwner && book.status === "available" && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-700 mb-3">💬 Chat with Seller</h3>
              <ChatBox
                bookId={book._id}
                sellerId={book.seller?._id}
                sellerName={book.seller?.name}
              />
            </div>
          )}

          {isOwner && (
            <div className="mt-6 flex gap-3">
              {book.status === "available" && (
                <button
                  onClick={handleMarkSold}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Mark as Sold
                </button>
              )}
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete Listing
              </button>
            </div>
          )}

          <button
            onClick={() => navigate("/books")}
            className="mt-6 text-sm text-blue-600 hover:underline block"
          >
            ← Back to Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;