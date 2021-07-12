import websocket from '@cubeartisan/server/routes/websockets/websocket';

const WebSocketRouter = websocket.router;

const router = new WebSocketRouter();

router.mount('*', 'draft', (request) => {});

export default router;
