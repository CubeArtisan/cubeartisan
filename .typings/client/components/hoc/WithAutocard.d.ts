export default withAutocard;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type AutocardProps = {
    card: Card;
    back?: boolean | undefined;
    tags?: string[] | undefined;
};
declare function withAutocard<P>(Tag: import("react").ComponentType<P>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<AutocardProps & Omit<P, "card" | "back">> & import("react").RefAttributes<any>>;
//# sourceMappingURL=WithAutocard.d.ts.map