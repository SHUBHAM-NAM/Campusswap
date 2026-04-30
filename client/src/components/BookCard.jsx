import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={book.photo || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 font-bold text-lg">₹{book.price}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium
            ${book.condition === 'Good' ? 'bg-green-100 text-green-600' :
              book.condition === 'Fair' ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'}`}>
            {book.condition}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Sem {book.semester}</span>
          <span>{book.branch}</span>
        </div>
        <Link
          to={`/books/${book._id}`}
          className="block mt-3 text-center bg-blue-600 text-white py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;