import { json } from 'solid-start';

export const GET = () => {
  const version = process.env.CUBEARTISAN_VERSION;
  return json({
    success: true,
    version,
  });
};
