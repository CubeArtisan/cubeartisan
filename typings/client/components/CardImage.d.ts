export default CardImage;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type SxProps = import('@mui/system').SxProps;
export type CardImageProps = {
    card: Card;
    back?: boolean | undefined;
    width?: string | number | undefined;
    sx?: SxProps | undefined;
    cardModal?: boolean | undefined;
};
declare const CardImage: React.ForwardRefExoticComponent<CardImageProps & React.HTMLAttributes<HTMLImageElement>>;
//# sourceMappingURL=CardImage.d.ts.map