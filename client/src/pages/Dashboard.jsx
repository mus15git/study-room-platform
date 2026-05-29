import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rooms"
      );

      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) {
      return toast.error("Enter room name");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/rooms/create",
        {
          roomName,
          createdBy: user.name,
        }
      );

      toast.success("Room Created");

      setRoomName("");

      fetchRooms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/rooms/${id}`
      );

      toast.success("Room Deleted");

      fetchRooms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Toaster />

      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Study Rooms
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome, {user.name}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Create Room */}

      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) =>
            setRoomName(e.target.value)
          }
          className="bg-zinc-900 p-3 rounded-lg w-[300px] outline-none"
        />

        <button
          onClick={createRoom}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
        >
          Create Room
        </button>
      </div>

      {/* Room Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-zinc-900 p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {room.roomName}
            </h2>

            <p className="text-gray-400">
              Created by: {room.createdBy}
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() =>
                  navigate(`/room/${room._id}`)
                }
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
              >
                Join Room
              </button>

              <button
                onClick={() =>
                  deleteRoom(room._id)
                }
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;