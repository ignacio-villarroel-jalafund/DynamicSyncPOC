import { useEffect, useState } from 'react';
import axios from 'axios';

interface Column {
  id: number;
  title: string;
  cards: Card[];
}

interface Card {
  id: number;
  title: string;
  description: string;
  column_id: number;
  order: number;
}

export const useBoardData = (boardId: number) => {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/boards/${boardId}/`)
      .then((res) => setColumns(res.data.columns));
  }, [boardId]);

  return { columns, setColumns };
};