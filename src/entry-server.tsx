import { createHandler, renderAsync, StartServer } from 'solid-start/entry-server';

import getMongoConnection from '@cubeartisan/cubeartisan/backend/mongoConnection';
import { loadCardDb } from '@cubeartisan/cubeartisan/backend/carddb';

getMongoConnection();

loadCardDb();

export default createHandler(renderAsync((event) => <StartServer event={event} />));
