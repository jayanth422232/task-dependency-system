from django.urls import path
from .views import TaskListCreate, TaskUpdate, AddDependency, TaskDelete, DependencyList

urlpatterns = [
    path("tasks/", TaskListCreate.as_view()),
    path("tasks/<int:task_id>/", TaskUpdate.as_view()),
    path("tasks/<int:task_id>/dependencies/", AddDependency.as_view()),
    path("tasks/<int:task_id>/delete/", TaskDelete.as_view()),
    path("dependencies/", DependencyList.as_view()),

]
