import { useEffect, useState } from "react";

export default function DependencyGraph({ tasks }) {
  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    // fetch dependencies from backend
    fetch("http://127.0.0.1:8000/api/dependencies/")
      .then((res) => res.json())
      .then((data) => setDependencies(data));
  }, [tasks]);

  const getColor = (status) => {
    switch (status) {
      case "completed":
        return "#22c55e"; // green
      case "in_progress":
        return "#3b82f6"; // blue
      case "blocked":
        return "#ef4444"; // red
      default:
        return "#9ca3af"; // gray
    }
  };

  const radius = 30;
  const spacing = 180;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-8">
      <h2 className="text-xl font-semibold mb-4 text-green-600">
        🧠 Dependency Graph
      </h2>

      <svg width="100%" height="300">
        {/* ARROW DEFINITION */}
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="#555" />
          </marker>
        </defs>

        {/* DRAW EDGES */}
        {dependencies.map((dep, index) => {
          const fromIndex = tasks.findIndex(
            (t) => t.id === dep.depends_on
          );
          const toIndex = tasks.findIndex(
            (t) => t.id === dep.task
          );

          if (fromIndex === -1 || toIndex === -1) return null;

          const x1 = fromIndex * spacing + 80;
          const x2 = toIndex * spacing + 80;
          const y = 150;

          return (
            <line
              key={index}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#555"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* DRAW NODES */}
        {tasks.map((task, index) => {
          const x = index * spacing + 80;
          const y = 150;

          return (
            <g key={task.id}>
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={getColor(task.status)}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dy="5"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {task.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
