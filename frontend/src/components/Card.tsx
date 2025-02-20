import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { EditableTitle } from './EditableTitle';
import { CardData } from '../types/types'; // Importa el tipo desde types.ts

interface CardProps {
  card: CardData;
  index: number;
  onSaveTitle: (newTitle: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, index, onSaveTitle }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  const handleStartEdit = () => {
    setIsEditing(true); // Activar el modo de edición
  };

  const handleSaveTitle = (newTitle: string) => {
    onSaveTitle(newTitle); // Notificar al padre para guardar el nuevo título
    setIsEditing(false); // Desactivar el modo de edición
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancelar la edición sin guardar cambios
  };

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: '#f8f9fa',
            padding: '1rem',
            margin: '0.75rem 0',
            borderRadius: '10px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            ...provided.draggableProps.style,
          }}
        >
          {isEditing ? (
            <EditableTitle
              value={card.title}
              onSave={handleSaveTitle} // Guardar el título
              onCancel={handleCancelEdit} // Cancelar la edición
            />
          ) : (
            <h4
              style={{
                margin: '0 0 0.5rem 0',
                fontWeight: 'bold',
                color: '#333',
                cursor: 'pointer',
              }}
              onClick={handleStartEdit} // Activar la edición
              title="Haz clic para editar el título"
            >
              {card.title}
            </h4>
          )}
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
            {card.description}
          </p>
        </div>
      )}
    </Draggable>
  );
};