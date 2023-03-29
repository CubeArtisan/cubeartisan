import { APIEvent, json } from 'solid-start';

import { getIdByCardName } from '@cubeartisan/cubeartisan/backend/carddb';

export const GET = async ({ params }: APIEvent) => {
  const cardName = params.cardId;
  const id = await getIdByCardName(cardName!);
  if (id) {
    return json({
      success: true,
      id,
    });
  }
  return json(
    {
      success: false,
      message: `${cardName} not found`,
    },
    { status: 404 },
  );
};
