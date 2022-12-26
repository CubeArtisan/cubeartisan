import { json } from 'solid-start';

export const GET = () => {
  const version = import.meta.env.VITE_CUBEARTISAN_VERSION;
  return json({
    success: true,
    data: { version },
  });
};
