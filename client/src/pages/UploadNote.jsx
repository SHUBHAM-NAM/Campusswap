import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const UploadNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    semester: "",
    branch: "",
    type: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate all fields
    if (!form.title || !form.subject || !form.semester || !form.branch || !form.type) {
      setError("Please fill all fields");
      return;
    }

    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('subject', form.subject);
      formData.append('semester', form.semester);
      formData.append('branch', form.branch);
      formData.append('type', form.type);
      formData.append('file', file);

      await api.post('/notes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/notes');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">
          📤 Upload Notes / PYQ
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Note Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="subject"
            placeholder="Subject Name"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg focus:outline-none"
            >
              <option value="">Semester</option>
              {[1,2,3,4,5,6,7,8].map(s => (
                <option key={s} value={s}>Sem {s}</option>
              ))}
            </select>

            <select
              name="branch"
              value={form.branch}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg focus:outline-none"
            >
              <option value="">Branch</option>
              {['CSE','IT','ECE','ME','CE','EE','BCA','BBA','MBA'].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none"
          >
            <option value="">Type of Document</option>
            <option value="Notes">Notes</option>
            <option value="PYQ">Previous Year Questions (PYQ)</option>
            <option value="Assignment">Assignment</option>
            <option value="Other">Other</option>
          </select>

          {/* PDF Upload */}
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="pdfUpload"
            />
            <label htmlFor="pdfUpload" className="cursor-pointer">
              <p className="text-purple-500 font-medium">
                {file ? `✅ ${file.name}` : '📄 Click to select PDF file'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Only PDF files allowed
              </p>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading... please wait" : "Upload Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNote;