// Load Environment Variables
import mongoose from 'mongoose';
import Cube from '@cubeartisan/server/models/cube.js';
import Deck from '@cubeartisan/server/models/deck.js';
import Draft from '@cubeartisan/server/models/draft.js';
import GridDraft from '@cubeartisan/server/models/gridDraft.js';
import cubeMigrations from '@cubeartisan/server/models/migrations/cubeMigrations.js';
import deckMigrations from '@cubeartisan/server/models/migrations/deckMigrations.js';
import draftMigrations from '@cubeartisan/server/models/migrations/draftMigrations.js';
import gridDraftMigrations from '@cubeartisan/server/models/migrations/gridDraftMigrations.js';
import { applyPendingMigrationsPre } from '@cubeartisan/server/models/migrations/migrationMiddleware.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

const MIGRATABLE = Object.freeze([
  { name: 'GridDraft', model: GridDraft, migrate: applyPendingMigrationsPre(gridDraftMigrations) },
  { name: 'Cube', model: Cube, migrate: applyPendingMigrationsPre(cubeMigrations) },
  { name: 'Deck', model: Deck, migrate: applyPendingMigrationsPre(deckMigrations) },
  { name: 'Draft', model: Draft, migrate: applyPendingMigrationsPre(draftMigrations) },
]);

const migratableDocsQuery = (currentSchemaVersion) => {
  if (currentSchemaVersion === 1) {
    return { schemaVersion: null };
  }
  return { schemaVersion: currentSchemaVersion - 1 };
};

(async () => {
  await Promise.all([carddb.initializeCardDb('private', true), connectionQ]);
  for (const { name, model, migrate } of MIGRATABLE) {
    console.log(`Starting ${name}...`);
    const query = migratableDocsQuery(model.CURRENT_SCHEMA_VERSION);

    const count = await model.estimatedDocumentCount(query);
    const cursor = model.find(query).cursor();
    console.log(`Found ${count} documents`);

    let totalProcessed = 0;

    const asyncMigrate = async (doc) => {
      if (doc.schemaVersion === model.CURRENT_SCHEMA_VERSION) {
        totalProcessed += 1;
        console.log(`Skipping ${name} ${totalProcessed}: ${doc._id}`);
        return 0;
      }
      let migrated;
      try {
        migrated = await migrate(doc);
      } catch (e) {
        console.error(`Could not migrate ${name} with id ${doc._id}.`);
        console.debug(e);
        return 0;
      }
      if (migrated) {
        try {
          await migrated.save();
          totalProcessed += 1;
          console.log(`Finished ${name} ${totalProcessed}: ${migrated._id}`);
        } catch (e) {
          console.error(`Failed to save migrated ${name} with id ${doc._id}.`);
          console.debug(e);
          return 0;
        }
      } else {
        console.error(`${name} with id ${doc._id} was in an invalid format.`);
        return 0;
      }
      return 1;
    };

    await cursor.eachAsync(asyncMigrate, { parallel: 100 });

    console.log(`Finished: ${name}s. ${totalProcessed} were successful.`);
  }
  mongoose.disconnect();
  console.log('done');
  process.exit();
})();
