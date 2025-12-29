export default function TaskList({ tasks, refresh }) {
  const updateStatus = async (id, status) => {
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  };

  const deleteTask = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/tasks/${id}/delete/`,
      { method: "DELETE" }
    );

    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
    } else {
      refresh();
    }
  };

  const badge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-yellow-300">
        📋 Tasks
      </h2>

      {tasks.map((task) => (
        /* 🔽 TASK ROW START */
        <div
          key={task.id}
          className="bg-black/40 rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-black/60 transition"
        >
          {/* LEFT */}
          <div>
            <h3 className="font-semibold text-lg text-white">
              {task.title}
            </h3>
            <p className="text-sm text-gray-300">
              {task.description}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full text-white ${badge(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex gap-3 items-center">
            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task.id, e.target.value)
              }
              className="bg-black/60 border border-gray-600 rounded px-3 py-1 text-white"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>

            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
            >
              🗑 Delete
            </button>
          </div>
        </div>
        /* 🔼 TASK ROW END */
      ))}
    </div>
  );
}
