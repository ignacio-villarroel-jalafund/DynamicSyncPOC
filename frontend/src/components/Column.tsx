import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from './Card';
import { ColumnData } from '../types/types';

interface ColumnProps {
  column: ColumnData;
  onCardTitleChange: (cardId: number, newTitle: string) => void;
  editingCardId: number | null;
  startEditingTitle: (cardId: number) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, onCardTitleChange, editingCardId, startEditingTitle }) => {
  return (
    <Droppable droppableId={String(column.id)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            width: '260px',
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
            border: '1px solid #ddd',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', color: '#333' }}>
            {column.title}
          </h3>
          {column.cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              isEditing={editingCardId === card.id}
              onStartEdit={() => startEditingTitle(card.id)}
              onSaveTitle={(newTitle) => onCardTitleChange(card.id, newTitle)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};