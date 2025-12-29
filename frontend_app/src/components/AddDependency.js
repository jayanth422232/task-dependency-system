import { useState } from "react";

export default function AddDependency({ tasks, refresh }) {
  const [taskId, setTaskId] = useState("");
  const [dependsOnId, setDependsOnId] = useState("");
  const [msg, setMsg] = useState("");

  const add = async () => {
    setMsg("");
    const res = await fetch(
      `http://127.0.0.1:8000/api/tasks/${taskId}/dependencies/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depends_on_id: dependsOnId }),
      }
    );

    const data = await res.json();
    if (!res.ok) setMsg(data.error);
    else {
      setMsg("Dependency added successfully");
      refresh();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-purple-300">
        🔗 Add Dependency
      </h2>

      <select className="w-full mb-3 p-2 bg-black/40 rounded" onChange={e => setTaskId(e.target.value)}>
        <option>Select Task</option>
        {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
      </select>

      <select className="w-full mb-4 p-2 bg-black/40 rounded" onChange={e => setDependsOnId(e.target.value)}>
        <option>Depends On</option>
        {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
      </select>

      <button onClick={add} className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded">
        Add Dependency
      </button>

      {msg && <p className="mt-3 text-center text-sm text-yellow-300">{msg}</p>}
    </div>
  );
}
