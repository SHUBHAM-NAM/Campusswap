import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

// Connect to socket server
const socket = io('http://localhost:5000');

const ChatBox = ({ bookId, sellerId, sellerName }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Create unique room ID from buyer + seller + book
  const roomId = [user.id, sellerId, bookId]
    .sort()
    .join('_');

  useEffect(() => {
    // Join the room
    socket.emit('join_room', roomId);

    // Load chat history
    const loadHistory = async () => {
      try {
        const res = await api.get(`/chat/${roomId}`);
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      message: newMessage,
      senderName: user.name,
      senderId: user.id,
      bookId,
      createdAt: new Date()
    };

    // Emit to socket
    socket.emit('send_message', messageData);

    // Save to database
    try {
      await api.post('/chat', {
        roomId,
        message: newMessage,
        senderName: user.name,
        bookId
      });
    } catch (error) {
      console.error(error);
    }

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-md">

      {/* Chat Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
          {sellerName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm">{sellerName}</p>
          <p className="text-xs text-blue-200">Chat about this book</p>
        </div>
        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
      </div>

      {/* Messages Area */}
      <div className="h-72 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {loading ? (
          <p className="text-center text-gray-400 text-sm">
            Loading messages...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-20">
            No messages yet. Say hi! 👋
          </p>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === user.id ||
              msg.senderName === user.name;
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

      {/* Message Input */}
      <div className="px-4 py-3 bg-white border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
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
    </div>
  );
};

export default ChatBox;