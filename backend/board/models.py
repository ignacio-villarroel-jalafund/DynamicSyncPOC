from django.db import models

class Board(models.Model):
    title = models.CharField(max_length=100)

class Column(models.Model):
    board = models.ForeignKey(
        Board, 
        on_delete=models.CASCADE,
        related_name='columns'
    )
    title = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

class Card(models.Model):
    column = models.ForeignKey(
        Column, 
        on_delete=models.CASCADE,
        related_name='cards'
    )
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)