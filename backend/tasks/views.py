from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Task, TaskDependency
from .serializers import TaskSerializer
from .utils import has_circular_dependency, update_task_status


class TaskListCreate(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        return Response(TaskSerializer(tasks, many=True).data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskUpdate(APIView):
    def patch(self, request, task_id):
        task = Task.objects.get(id=task_id)
        task.status = request.data.get("status", task.status)
        task.save()

        # update tasks that depend on this task
        dependents = TaskDependency.objects.filter(depends_on=task)
        for dep in dependents:
            update_task_status(dep.task)

        return Response(TaskSerializer(task).data)


class AddDependency(APIView):
    def post(self, request, task_id):
        depends_on_id = request.data.get("depends_on_id")

        if not depends_on_id:
            return Response(
                {"error": "depends_on_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if task_id == depends_on_id:
            return Response(
                {"error": "Task cannot depend on itself"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if has_circular_dependency(task_id, depends_on_id):
            return Response(
                {"error": "Circular dependency detected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        TaskDependency.objects.create(
            task_id=task_id,
            depends_on_id=depends_on_id
        )

        # block task if dependency is not completed
        task = Task.objects.get(id=task_id)
        update_task_status(task)

        return Response(
            {"message": "Dependency added successfully"},
            status=status.HTTP_201_CREATED
        )

class TaskDelete(APIView):
    def delete(self, request, task_id):
        task = Task.objects.get(id=task_id)

        dependents = task.dependents.all()
        if dependents.exists():
            return Response(
                {
                    "error": "Other tasks depend on this task",
                    "affected": [d.task.id for d in dependents]
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        task.delete()
        return Response({"message": "Task deleted"})

class DependencyList(APIView):
    def get(self, request):
        data = TaskDependency.objects.values("task_id", "depends_on_id")
        return Response([
            {
                "task": d["task_id"],
                "depends_on": d["depends_on_id"]
            }
            for d in data
        ])