export interface CardData {
    id: number;
    title: string;
    description: string;
    column_id: number;
    order: number;
  }
  
  export interface ColumnData {
    id: number;
    title: string;
    cards: CardData[];
  }