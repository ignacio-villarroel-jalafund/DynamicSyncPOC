import useWebSocket from 'react-use-websocket';

export const useWebSocketUpdates = (boardId: number, onMessage: (data: any) => void) => {
  const { sendJsonMessage } = useWebSocket(`ws://localhost:8000/ws/board/${boardId}/`, {
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      onMessage(data);
    },
  });

  return { sendJsonMessage };
};