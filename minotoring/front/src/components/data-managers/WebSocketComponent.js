import { useEffect } from 'react';

export default function WebSocketComponent(props) {
  const { setData } = props;
  useEffect(() => {
    const ws = new WebSocket('ws://0.0.0.0:8888/ws');
    ws.onopen = function() {
      console.log('WebSocket opened');
    };
    ws.onmessage = function(e) {
      setData(JSON.parse(e.data).area);
    };
    ws.onclose = function(e) {
      console.log('WebSocket closed');
    };
    return function cleanup() {
      ws.close();
    };
  });

  return null;
}
