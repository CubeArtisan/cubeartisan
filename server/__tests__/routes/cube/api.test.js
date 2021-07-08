import router from '@cubeartisan/server/routes/cube';
import request from 'supertest';
import express from 'express';
import Cube from '@cubeartisan/server/models/cube';
import carddb from '@cubeartisan/server/serverjs/cards';
import dbSetup from '@cubeartisan/server/__tests__/helpers/dbTestSetup';
import cubefixture from '@cubeartisan/server/__tests__/fixtures/examplecube';

const fixturesPath = 'fixtures';
const { exampleCube } = cubefixture;
const cubeID = exampleCube.shortID;

const app = express();
app.use('/', router);

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbSetup.connect();
  await carddb.initializeCardDb(fixturesPath, true);
  await new Cube(cubefixture.exampleCube).save();
});

afterAll(async () => {
  await dbSetup.close(mongoServer);
  carddb.unloadCardDb();
});

test('cubelist', () => {
  return request(app)
    .get(`/${cubeID}/export/plaintext`)
    .expect(200)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect((res) => {
      const lines = res.text
        .trim()
        .split('\n')
        .map((l) => l.trim());
      expect(lines[0]).toEqual('Acclaimed Contender');
      expect(lines.length).toEqual(exampleCube.cards.length);
    });
});
