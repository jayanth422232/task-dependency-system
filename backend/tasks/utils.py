from .models import TaskDependency

def has_circular_dependency(start_task_id, target_task_id):
    visited = set()

    def dfs(task_id):
        if task_id in visited:
            return False
        visited.add(task_id)

        dependencies = TaskDependency.objects.filter(task_id=task_id)
        for dep in dependencies:
            if dep.depends_on_id == start_task_id:
                return True
            if dfs(dep.depends_on_id):
                return True
        return False

    return dfs(target_task_id)

from .models import Task, TaskDependency

def update_task_status(task):
    dependencies = TaskDependency.objects.filter(task=task)

    if not dependencies.exists():
        # No dependencies → task is free to work
        if task.status == 'blocked':
            task.status = 'pending'
            task.save()
        return

    for dep in dependencies:
        if dep.depends_on.status != 'completed':
            task.status = 'blocked'
            task.save()
            return

    # All dependencies completed
    task.status = 'pending'
    task.save()
