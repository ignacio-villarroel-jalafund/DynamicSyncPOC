from django.urls import path
from . import views

urlpatterns = [
    path('boards/<int:pk>/', views.BoardDetailView.as_view(), name='board-detail'),
]