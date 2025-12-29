# Task Dependency Management System
A full-stack web application for managing tasks with dependencies, preventing circular dependencies, and visualizing task relationships through a graphical representation.
## Overview
The Task Dependency Management System allows users to create tasks, define dependencies between them, automatically update task statuses based on dependency completion, and visualize the dependency structure using a graph. The system ensures logical consistency by preventing circular dependencies and restricting deletion of tasks that other tasks depend on.
## Features
- Create tasks with title and description
- Update task status (Pending, In Progress, Completed, Blocked)
- Delete tasks with dependency safety checks
- Add dependencies between tasks
- Prevent circular dependencies
- Automatically update task status based on dependencies
- Visualize task dependencies using a graph
- RESTful backend APIs
- Interactive frontend user interface
## Tech Stack
### Backend
- Django
- Django REST Framework
- SQLite (default Django database)
### Frontend
- React
- Tailwind CSS
- HTML5 / SVG / Canvas for dependency graph visualization
## Task Status Logic
- Pending – Task is created but not started
- In Progress – All dependencies are completed
- Blocked – One or more dependencies are incomplete
- Completed – Task has been finished
## Dependency Rules
- A task cannot depend on itself
- Circular dependencies are detected and prevented
- Tasks that other tasks depend on cannot be deleted
## How to Run the Project
### Backend Setup
cd backend
venv\Scripts\Activate.ps1
python manage.py runserver
Backend runs at http://127.0.0.1:8000
### Frontend Setup
cd frontend_app
npm install
npm start
Frontend runs at http://localhost:3000
## API Endpoints
| Method | Endpoint | Description |

| GET | /api/tasks/ | Retrieve all tasks |

| POST | /api/tasks/ | Create a new task |

| PATCH | /api/tasks/{id}/ | Update task status |

| POST | /api/tasks/{id}/dependencies/ | Add a dependency |

| DELETE | /api/tasks/{id}/delete/ | Delete a task |

| GET | /api/dependencies/ | Retrieve all dependencies |

## Project Structure
task-dependency-system/

├── backend/

│   ├── taskmanager/

│   ├── tasks/

│   └── db.sqlite3

├── frontend_app/

│   ├── src/

│   ├── components/

│   └── package.json

└── README.md

## Notes
- SQLite is used for simplicity and rapid development
- The project can be easily migrated to MySQL using Django ORM
- No external graph visualization libraries are used
