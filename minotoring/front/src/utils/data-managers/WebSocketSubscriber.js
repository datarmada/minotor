class WebSocketSubscriber {
  constructor() {
    // eslint-disable-next-line no-undef
    this.ws = new WebSocket('ws://0.0.0.0:8888/ws');
    this.ws.onopen = () => {
      console.log('WebSocket opened');
    };
    this.ws.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  subscribeToPredictionData(callback) {
    this.ws.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      if (data.predictions) {
        callback(data.predictions);
      }
    });
  }

  subscribeToFeatureData(callback) {
    this.ws.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      if (data.features) {
        callback(data.features);
      }
    });
  }
}

export default new WebSocketSubscriber();
