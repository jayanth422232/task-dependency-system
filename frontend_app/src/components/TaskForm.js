import { useState } from "react";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    if (!title) return;

    await fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    refresh();
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">
        ➕ Create Task
      </h2>

      <input
        className="w-full mb-3 p-3 rounded bg-black/40 border border-gray-600 text-white"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full mb-4 p-3 rounded bg-black/40 border border-gray-600 text-white"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded font-semibold"
      >
        Add Task
      </button>
    </div>
  );
}
