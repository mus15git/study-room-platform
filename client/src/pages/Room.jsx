import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://study-room-platform-73m5.onrender.com");

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Timer States
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  // Timer Logic
  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Join Room
  useEffect(() => {
    socket.emit("join_room", id);
  }, [id]);

  // Receive Messages
  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  // Send Message
  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      roomId: id,
      sender: user.name,
      message,
    };

    socket.emit("send_message", messageData);

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">
            Study Room
          </h1>

          <p className="text-gray-400 mt-1">
            Welcome, {user.name}
          </p>

          <p className="text-gray-500 text-sm">
            Room ID: {id}
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Leave Room
        </button>
      </div>

      {/* Timer */}
      <div className="bg-zinc-900 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Study Timer
        </h2>

        <div className="text-6xl font-bold mb-5">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="number"
            placeholder="Enter Minutes"
            value={customMinutes}
            onChange={(e) =>
              setCustomMinutes(e.target.value)
            }
            className="bg-zinc-800 p-3 rounded-lg w-40 outline-none"
          />

          <button
            onClick={() => {
              if (
                !customMinutes ||
                Number(customMinutes) <= 0
              )
                return;

              setRunning(false);
              setTime(Number(customMinutes) * 60);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
          >
            Set Timer
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setRunning(true)}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg"
          >
            Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-lg"
          >
            Pause
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setTime(0);
              setCustomMinutes("");
            }}
            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-zinc-900 h-[400px] rounded-2xl p-4 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">
            No messages yet...
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="mb-4 bg-zinc-800 p-3 rounded-lg"
            >
              <p className="text-sm text-gray-400">
                {msg.sender}
              </p>

              <p className="text-lg">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 bg-zinc-900 p-4 rounded-lg outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-8 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;