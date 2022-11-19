import { json } from 'solid-start';

// eslint-disable-next-line import/prefer-default-export
export const GET = () => {
  const version = process.env.CUBEARTISAN_VERSION;
  return json({
    success: true,
    version,
  });
};
