import { createHandler, renderAsync, StartServer } from 'solid-start/entry-server';

import { loadCardDb } from '@cubeartisan/cubeartisan/backend/carddb';
import getMongoConnection from '@cubeartisan/cubeartisan/backend/mongoConnection';

getMongoConnection();

loadCardDb();

export default createHandler(renderAsync((event) => <StartServer event={event} />));
