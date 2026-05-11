import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const MyChats = () => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Setup socket
  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Socket connected:', socketRef.current.id);
      setConnected(true);
    });

    socketRef.current.on('connect_error', (err) => {
      console.log('❌ Socket error:', err.message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Load seller's books
  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await api.get('/user/my-books');
        setMyBooks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, []);

  // When book selected - load buyers
  useEffect(() => {
    if (!selectedBook) return;
    const fetchBuyers = async () => {
      try {
        const res = await api.get(`/chat/book/${selectedBook._id}/buyers`);
        setBuyers(res.data);
        setSelectedBuyer(null);
        setMessages([]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBuyers();
  }, [selectedBook]);

  // When buyer selected - load chat
  useEffect(() => {
    if (!selectedBuyer || !selectedBook) return;

    const roomId = [user.id, selectedBuyer._id, selectedBook._id]
      .sort().join('_');

    // Join room
    socketRef.current.emit('join_room', roomId);
    console.log('Joined room:', roomId);

    // Load history
    const loadMessages = async () => {
      try {
        const res = await api.get(`/chat/${roomId}`);
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadMessages();

    // Listen for new messages
    socketRef.current.on('receive_message', (data) => {
      console.log('📨 Message received:', data);
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socketRef.current.off('receive_message');
    };
  }, [selectedBuyer, selectedBook]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedBuyer || !selectedBook) return;

    const roomId = [user.id, selectedBuyer._id, selectedBook._id]
      .sort().join('_');

    const messageData = {
      roomId,
      message: newMessage,
      senderName: user.name,
      senderId: user.id,
      bookId: selectedBook._id,
      createdAt: new Date()
    };

    // Emit via socket
    socketRef.current.emit('send_message', messageData);

    // Save to DB
    try {
      await api.post('/chat', {
        roomId,
        message: newMessage,
        senderName: user.name,
        bookId: selectedBook._id
      });
    } catch (error) {
      console.error(error);
    }

    setNewMessage("");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading chats...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        💬 My Chats
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">

        {/* Column 1 - My Books */}
        <div className="bg-white rounded-xl shadow-md p-4 overflow-y-auto">
          <h2 className="font-bold text-gray-700 mb-4 sticky top-0 bg-white pb-2 border-b">
            📚 My Listed Books
          </h2>
          {myBooks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-10">
              No books listed yet
            </p>
          ) : (
            <div className="space-y-2">
              {myBooks.map(book => (
                <div
                  key={book._id}
                  onClick={() => setSelectedBook(book)}
                  className={`p-3 rounded-lg cursor-pointer transition
                    ${selectedBook?._id === book._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                >
                  <p className="font-medium text-sm truncate">
                    {book.title}
                  </p>
                  <p className={`text-xs mt-1
                    ${selectedBook?._id === book._id
                      ? 'text-blue-200'
                      : 'text-gray-400'}`}>
                    ₹{book.price} •
                    <span className={book.status === 'available'
                      ? 'text-green-500' : 'text-red-400'}>
                      {" "}{book.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2 - Buyers */}
        <div className="bg-white rounded-xl shadow-md p-4 overflow-y-auto">
          <h2 className="font-bold text-gray-700 mb-4 sticky top-0 bg-white pb-2 border-b">
            👥 Interested Buyers
          </h2>
          {!selectedBook ? (
            <p className="text-gray-400 text-sm text-center mt-10">
              ← Select a book first
            </p>
          ) : buyers.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-10">
              No one has chatted about this book yet
            </p>
          ) : (
            <div className="space-y-2">
              {buyers.map(buyer => (
                <div
                  key={buyer._id}
                  onClick={() => setSelectedBuyer(buyer)}
                  className={`p-3 rounded-lg cursor-pointer transition flex items-center gap-3
                    ${selectedBuyer?._id === buyer._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center
                    justify-center font-bold text-sm flex-shrink-0
                    ${selectedBuyer?._id === buyer._id
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-600 text-white'}`}>
                    {buyer.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{buyer.name}</p>
                    <p className={`text-xs
                      ${selectedBuyer?._id === buyer._id
                        ? 'text-blue-200'
                        : 'text-gray-400'}`}>
                      {buyer.branch} • Sem {buyer.semester}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 3 - Chat Window */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">

          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2 flex-shrink-0">
            {selectedBuyer ? (
              <>
                <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {selectedBuyer.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {selectedBuyer.name}
                  </p>
                  <p className="text-xs text-blue-200 truncate">
                    About: {selectedBook?.title}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0
                  ${connected ? 'bg-green-400' : 'bg-red-400'}`}>
                </div>
              </>
            ) : (
              <p className="text-sm text-blue-200">
                Select a buyer to chat
              </p>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {!selectedBuyer ? (
              <p className="text-center text-gray-400 text-sm mt-20">
                Select a book and buyer to view chat 💬
              </p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-400 text-sm mt-20">
                No messages yet
              </p>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.senderName === user.name ||
                  msg.senderId === user.id;
                return (
                  <div key={index}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm
                      ${isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow rounded-bl-none'}`}>
                      {!isMe && (
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                          {msg.senderName}
                        </p>
                      )}
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1
                        ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {selectedBuyer && (
            <div className="px-4 py-3 border-t bg-white flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a reply..."
                className="flex-1 border px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition disabled:opacity-50"
              >
                Send 📤
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyChats;