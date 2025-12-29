import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import AddDependency from "./components/AddDependency";
import DependencyGraph from "./components/DependencyGraph";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/tasks/");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Task Dependency Management
        </h1>
        <p className="text-gray-300 mt-2">
          Visualize • Manage • Control Dependencies
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskForm refresh={fetchTasks} />
        <AddDependency tasks={tasks} refresh={fetchTasks} />
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-6">
        <TaskList tasks={tasks} refresh={fetchTasks} />
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-6 pb-10">
        <DependencyGraph tasks={tasks} />
      </div>
    </div>
  );
}
