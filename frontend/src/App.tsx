import { Board } from './components/Board';

export default function App() {
  const boardId = 1; // ID del tablero estático para el POC

  return <Board boardId={boardId} />;
}