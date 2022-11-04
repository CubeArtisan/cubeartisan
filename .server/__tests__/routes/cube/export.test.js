/* eslint-disable no-restricted-imports,import/no-extraneous-dependencies */
import request from 'supertest';
import Papa from 'papaparse';
import express from 'express';

import carddb from '@cubeartisan/server/serverjs/cards.js';
import Cube from '@cubeartisan/server/models/cube.js';
import { requestLogging } from '@cubeartisan/server/routes/middleware.js';
import dbSetup from '@cubeartisan/server/__tests__/helpers/dbTestSetup.js';
import cubefixture from '@cubeartisan/server/__tests__/fixtures/examplecube.js';
import {
  exportCubeToMtgo,
  exportCubeToCsv,
  exportCubeToCubeCobra,
  exportCubeToForge,
  exportCubeToJson,
  exportCubeToPlaintext,
  exportCubeToXmage,
} from '@cubeartisan/server/routes/cube/export.js';

const splitText = (text) =>
  text
    .trim()
    .split('\n')
    .map((l) => l.trim());

const exampleCubeWithName = (name) => {
  const cube = new Cube(cubefixture.exampleCube);
  cube.name = name;
  return cube;
};

const fixturesPath = '__tests__/fixtures';
const cubeName = '"Galaxy Brain" Cube!!! :)';
const sanitizedCubeName = 'GalaxyBrainCube';
const exampleCube = exampleCubeWithName(cubeName);
const cubeID = exampleCube.shortID;

const app = express();
app.use(requestLogging);
app.use((req, res, next) => {
  req.flash = (kind, message) => req.logger.info(`${kind}: ${message}`);
  next();
});
app.get('/cube/:id/export/csv', exportCubeToCsv);
app.get('/cube/:id/export/cubecobra', exportCubeToCubeCobra);
app.get('/cube/:id/export/forge', exportCubeToForge);
app.get('/cube/:id/export/json', exportCubeToJson);
app.get('/cube/:id/export/mtgo', exportCubeToMtgo);
app.get('/cube/:id/export/plaintext', exportCubeToPlaintext);
app.get('/cube/:id/export/xmage', exportCubeToXmage);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  req.logger.error(err);
  if (!res.statusCode) {
    res.status(500);
  }
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbSetup.connect();
  await carddb.initializeCardDb(fixturesPath, true);
  await exampleCube.save();
}, 60000);

afterAll(async () => {
  await dbSetup.close(mongoServer);
  return carddb.unloadCardDb();
});

test(
  'cubecobra text download',
  () =>
    request(app)
      .get(`/cube/${cubeID}/export/cubecobra`)
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('Content-disposition', `attachment; filename=${sanitizedCubeName}.txt`)
      .expect((res) => {
        const lines = splitText(res.text);
        expect(lines[0]).toEqual('Faerie Guidemother [eld-11]');
        expect(lines.length).toEqual(exampleCube.cards.length);
      }),
  15000,
);

test(
  'plaintext download',
  () =>
    request(app)
      .get(`/cube/${cubeID}/export/plaintext`)
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-disposition', `attachment; filename=${sanitizedCubeName}.txt`)
      .expect((res) => {
        const lines = splitText(res.text);
        expect(lines[0]).toEqual('Faerie Guidemother');
        expect(lines.length).toEqual(exampleCube.cards.length);
      }),
  15000,
);

test(
  'MTGO download',
  () =>
    request(app)
      .get(`/cube/${cubeID}/export/mtgo`)
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('Content-disposition', `attachment; filename=${sanitizedCubeName}.txt`)
      .expect((res) => {
        const lines = splitText(res.text);
        expect(lines[0]).toEqual('1 Faerie Guidemother');
        expect(lines[1]).toEqual('1 Giant Killer');
        // The two Brazen Borrowers in the cube are deduped
        expect(lines.length).toEqual(exampleCube.cards.length - 1);
      }),
  15000,
);

test('csv download', () => {
  const headerFields = [
    'Name',
    'CMC',
    'Type',
    'Color',
    'Set',
    'Collector Number',
    'Rarity',
    'Color Category',
    'Status',
    'Finish',
    'Maybeboard',
    'Image URL',
    'Image Back URL',
    'Tags',
    'Notes',
    'MTGO ID',
  ];

  const faerieGuidemotherData = {
    Name: 'Faerie Guidemother',
    CMC: '1',
    Type: 'Creature - Faerie',
    Color: 'W',
    Set: 'eld',
    'Collector Number': '11',
    Rarity: 'common',
    'Color Category': 'w',
    Status: 'Not Owned',
    Finish: 'Non-foil',
    'MTGO ID': '78110',
    Maybeboard: 'false',
    'Image URL': '',
    'Image Back URL': '',
    Tags: 'New',
    Notes: '',
  };

  return request(app)
    .get(`/cube/${cubeID}/export/csv`)
    .expect(200)
    .expect('Content-Type', 'text/plain')
    .expect('Content-disposition', `attachment; filename=${sanitizedCubeName}.csv`)
    .expect((res) => {
      const parsed = Papa.parse(res.text.trim(), { header: true });
      expect(parsed.errors).toEqual([]);
      expect(parsed.meta.fields.sort()).toEqual(headerFields.sort());
      expect(parsed.data[0]).toEqual(faerieGuidemotherData);
      expect(parsed.data.length).toEqual(exampleCube.cards.length);
    });
}, 15000);

test(
  'forge download',
  () =>
    request(app)
      .get(`/cube/${cubeID}/export/forge`)
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('Content-disposition', `attachment; filename=${sanitizedCubeName}.dck`)
      .expect((res) => {
        const lines = splitText(res.text);
        expect(lines[0]).toEqual('[metadata]');
        expect(lines[1]).toEqual(`Name=${exampleCube.name}`);
        expect(lines[2]).toEqual('[Main]');
        expect(lines[3]).toEqual('1 Faerie Guidemother|ELD');
        // Extra lines expected for [metadata] and [Main] headings, and cube name
        expect(lines.length).toEqual(exampleCube.cards.length + 3);
      }),
  15000,
);

test(
  'xmage download',
  () =>
    request(app)
      .get(`/cube/${cubeID}/export/xmage`)
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('Content-disposition', `attachment; filename=${sanitizedCubeName}.dck`)
      .expect((res) => {
        const lines = splitText(res.text);
        expect(lines[0]).toEqual('1 [ELD:11] Faerie Guidemother');
        expect(lines.length).toEqual(exampleCube.cards.length);
      }),
  15000,
);
