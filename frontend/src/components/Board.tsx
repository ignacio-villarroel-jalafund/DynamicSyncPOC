import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './Column';
import { useWebSocketUpdates } from '../hooks/useWebSocketUpdates';
import { useBoardData } from '../hooks/useBoardData';

export const Board: React.FC<{ boardId: number }> = ({ boardId }) => {
  const { columns, setColumns } = useBoardData(boardId);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  const { sendJsonMessage } = useWebSocketUpdates(boardId, (updatedCard) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === updatedCard.column_id
          ? {
              ...col,
              cards: col.cards
                .filter((card) => card.id !== updatedCard.id)
                .concat(updatedCard)
                .sort((a, b) => a.order - b.order),
            }
          : col
      )
    );
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceId = parseInt(result.source.droppableId);
    const destId = parseInt(result.destination.droppableId);

    const movedCard = columns
      .find((col) => col.id === sourceId)!
      .cards[result.source.index];

    const newColumns = [...columns];
    const sourceColumn = newColumns.find((col) => col.id === sourceId)!;
    const destColumn = newColumns.find((col) => col.id === destId)!;

    sourceColumn.cards.splice(result.source.index, 1);
    movedCard.column_id = destId;
    destColumn.cards.splice(result.destination.index, 0, movedCard);

    setColumns(newColumns);

    sendJsonMessage({
      action: 'update_card',
      id: movedCard.id,
      column_id: destId,
      order: result.destination.index,
      title: movedCard.title,
      description: movedCard.description,
    });
  };

  const handleCardTitleChange = (cardId: number, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId ? { ...card, title: newTitle } : card
        ),
      }))
    );

    sendJsonMessage({
      action: 'update_card',
      id: cardId,
      column_id: columns.find((col) => col.cards.some((card) => card.id === cardId))!.id,
      order: columns
        .find((col) => col.cards.some((card) => card.id === cardId))!
        .cards.findIndex((card) => card.id === cardId),
      title: newTitle,
      description: '',
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          padding: '2rem',
        }}
      >
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            onCardTitleChange={handleCardTitleChange}
            editingCardId={editingCardId}
            startEditingTitle={setEditingCardId}
          />
        ))}
      </div>
    </DragDropContext>
  );
};