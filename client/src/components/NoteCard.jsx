import api from "../utils/api";

const typeColors = {
  Notes: 'bg-blue-100 text-blue-600',
  PYQ: 'bg-purple-100 text-purple-600',
  Assignment: 'bg-orange-100 text-orange-600',
  Other: 'bg-gray-100 text-gray-600',
};

const NoteCard = ({ note }) => {

  const handleDownload = async () => {
    try {
      const res = await api.patch(`/notes/${note._id}/download`);
      window.open(res.data.fileUrl, '_blank');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      {/* Type Badge */}
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[note.type]}`}>
        {note.type}
      </span>

      {/* Title */}
      <h3 className="font-bold text-lg text-gray-800 mt-2 truncate">
        {note.title}
      </h3>

      {/* Subject */}
      <p className="text-sm text-gray-500 mt-1">📖 {note.subject}</p>

      {/* Meta Info */}
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Sem {note.semester}</span>
        <span>{note.branch}</span>
        <span>⬇️ {note.downloads} downloads</span>
      </div>

      {/* Uploader */}
      <p className="text-xs text-gray-400 mt-1">
        By {note.uploadedBy?.name || 'Unknown'}
      </p>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full mt-3 bg-purple-600 text-white py-1.5 rounded-lg text-sm hover:bg-purple-700 transition"
      >
        📥 Download PDF
      </button>
    </div>
  );
};

export default NoteCard;