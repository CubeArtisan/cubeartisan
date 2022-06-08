export default withAutocard;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type AutocardProps = {
    card: Card;
    front?: string | undefined;
    back?: string | undefined;
    tags?: string[] | undefined;
};
declare function withAutocard<P>(Tag: import("react").ComponentType<P>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<AutocardProps & P> & import("react").RefAttributes<any>>;
//# sourceMappingURL=WithAutocard.d.ts.map