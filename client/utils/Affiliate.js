export function getTCGLink(card) {
  const { name, isToken } = card.details;
  const tcgplayerId = card.details.tcgplayer_id;
  let tcgplayerLink = 'https://shop.tcgplayer.com/';
  if (tcgplayerId) {
    tcgplayerLink += `product/productsearch?id=${tcgplayerId}`;
  } else {
    const tcgplayerName = isToken ? `${name} Token` : name;
    tcgplayerLink += `productcatalog/product/show?ProductName=${tcgplayerName}`;
  }

  return tcgplayerLink;
}

export const getCardMarketLink = (card) =>
  `https://www.cardmarket.com/en/Magic/Products/Singles/${card.details.set_name
    .replace(/ /g, '-')
    .replace(/[:,."']/g, '')}/${card.details.name.replace(/ /g, '-').replace(/:/g, '').replace(/\./g, '')}`;

export const getCardHoarderLink = (card) => `https://www.cardhoarder.com/cards?data%5Bsearch%5D=${card.details.name}`;

const ck = (str) =>
  str
    .replace(' - ', '-')
    .replace(/ /g, '-')
    .replace(/[:,."']/g, '')
    .toLowerCase();

export const getCardKingdomLink = (card) =>
  `https://www.cardkingdom.com/mtg/${ck(card.details.set_name)}/${ck(card.details.name)}`;

export const tcgMassEntryUrl = 'https://store.tcgplayer.com/massentry?';

export default { getTCGLink, tcgMassEntryUrl };
