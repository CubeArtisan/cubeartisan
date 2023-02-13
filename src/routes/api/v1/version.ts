import { json } from 'solid-start';

export const GET = () => {
  const version = process.env['CUBEARTISAN_VERSION']; // eslint-disable-line dot-notation
  return json({
    success: true,
    data: { version },
  });
};
