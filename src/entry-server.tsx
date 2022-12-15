import { createHandler, renderAsync, StartServer } from 'solid-start/entry-server';

import getMongoConnection from '@cubeartisan/cubeartisan/backend/mongoConnection';

getMongoConnection();

export default createHandler(renderAsync((event) => <StartServer event={event} />));
