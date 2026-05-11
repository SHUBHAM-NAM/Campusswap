import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);

  const [form, setForm] = useState({
    title: "", author: "", subject: "",
    semester: "", branch: "", price: "",
    condition: "", description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (photo) formData.append('photo', photo);

      await api.post('/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">📖 List a Book</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Book Title" onChange={handleChange} required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="author" placeholder="Author Name" onChange={handleChange} required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="subject" placeholder="Subject" onChange={handleChange} required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="price" type="number" placeholder="Price (₹)" onChange={handleChange} required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <div className="grid grid-cols-2 gap-3">
            <select name="semester" onChange={handleChange} required
              className="border px-4 py-2 rounded-lg focus:outline-none">
              <option value="">Semester</option>
              {[1,2,3,4,5,6].map(s => (
                <option key={s} value={s}>Sem {s}</option>
              ))}
            </select>
            <select name="branch" onChange={handleChange} required
              className="border px-4 py-2 rounded-lg focus:outline-none">
              <option value="">Branch</option>
              {['BCA','BBA','MCA','BA','BSC','BCOM'].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <select name="condition" onChange={handleChange} required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none">
            <option value="">Book Condition</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>

          <textarea name="description" placeholder="Description (optional)"
            onChange={handleChange} rows={3}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <input type="file" accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full border px-4 py-2 rounded-lg" />

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            {loading ? "Listing..." : "List Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;