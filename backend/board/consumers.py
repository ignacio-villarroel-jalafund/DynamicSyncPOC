import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Card

class BoardConsumer(WebsocketConsumer):
    def connect(self):
        self.board_id = self.scope['url_route']['kwargs']['board_id']
        self.room_group_name = f'board_{self.board_id}'
        
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        
        if action == 'update_card':
            card = Card.objects.get(id=data['id'])
            card.column_id = data['column_id']
            card.order = data['order']
            card.title = data['title']
            card.description = data['description']
            card.save()
            
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'card.updated',
                    'card': {
                        'id': card.id,
                        'title': card.title,
                        'description': card.description,
                        'column_id': card.column_id,
                        'order': card.order,
                    }
                }
            )

    def card_updated(self, event):
        self.send(text_data=json.dumps(event['card']))