export function CardPage({ card, data, versions, related, loginCallback }: {
    card: any;
    data: any;
    versions: any;
    related: any;
    loginCallback: any;
}): JSX.Element;
export namespace CardPage {
    namespace propTypes {
        const card: PropTypes.Validator<PropTypes.InferProps<{
            name: PropTypes.Validator<string>;
            elo: PropTypes.Validator<number>;
            image_normal: PropTypes.Validator<string>;
            image_flip: PropTypes.Requireable<string>;
            scryfall_uri: PropTypes.Validator<string>;
            tcgplayer_id: PropTypes.Validator<number>;
            _id: PropTypes.Validator<string>;
            set: PropTypes.Validator<string>;
            set_name: PropTypes.Validator<string>;
            collector_number: PropTypes.Validator<string>;
            legalities: PropTypes.Validator<PropTypes.InferProps<{}>>;
            parsed_cost: PropTypes.Validator<string[]>;
            oracle_text: PropTypes.Validator<string>;
            oracle_id: PropTypes.Validator<string>;
            type: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            loyalty: PropTypes.Validator<string>;
            power: PropTypes.Validator<string>;
            toughness: PropTypes.Validator<PropTypes.InferProps<{}>>;
            prices: PropTypes.Validator<PropTypes.InferProps<{
                usd: PropTypes.Requireable<number>;
                usd_foil: PropTypes.Requireable<number>;
                eur: PropTypes.Requireable<number>;
                tix: PropTypes.Requireable<number>;
            }>>;
        }>>;
        const data: PropTypes.Validator<PropTypes.InferProps<{
            history: PropTypes.Validator<PropTypes.InferProps<{
                prices: PropTypes.Validator<PropTypes.InferProps<{
                    usd: PropTypes.Requireable<number>;
                    usd_foil: PropTypes.Requireable<number>;
                    eur: PropTypes.Requireable<number>;
                    tix: PropTypes.Requireable<number>;
                }>[]>;
                vintage: PropTypes.Validator<boolean>;
                legacy: PropTypes.Validator<boolean>;
                modern: PropTypes.Validator<boolean>;
                standard: PropTypes.Validator<boolean>;
                pauper: PropTypes.Validator<boolean>;
                peasant: PropTypes.Validator<boolean>;
                size180: PropTypes.Validator<number>;
                size360: PropTypes.Validator<number>;
                size450: PropTypes.Validator<number>;
                size540: PropTypes.Validator<number>;
                size720: PropTypes.Validator<number>;
                total: PropTypes.Validator<number[]>;
            }>[]>;
            current: PropTypes.Requireable<PropTypes.InferProps<{
                prices: PropTypes.Validator<PropTypes.InferProps<{
                    usd: PropTypes.Requireable<number>;
                    usd_foil: PropTypes.Requireable<number>;
                    eur: PropTypes.Requireable<number>;
                    tix: PropTypes.Requireable<number>;
                }>[]>;
                vintage: PropTypes.Validator<boolean>;
                legacy: PropTypes.Validator<boolean>;
                modern: PropTypes.Validator<boolean>;
                standard: PropTypes.Validator<boolean>;
                pauper: PropTypes.Validator<boolean>;
                peasant: PropTypes.Validator<boolean>;
                size180: PropTypes.Validator<number>;
                size360: PropTypes.Validator<number>;
                size450: PropTypes.Validator<number>;
                size540: PropTypes.Validator<number>;
                size720: PropTypes.Validator<number>;
                total: PropTypes.Validator<number[]>;
            }>>;
        }>>;
        const related: PropTypes.Validator<PropTypes.InferProps<{
            top: PropTypes.Validator<PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>[]>;
            synergistic: PropTypes.Validator<PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>[]>;
            creatures: PropTypes.Validator<PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>[]>;
            spells: PropTypes.Validator<PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>[]>;
            other: PropTypes.Validator<PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>[]>;
        }>>;
        const versions: PropTypes.Validator<PropTypes.InferProps<{
            set_name: PropTypes.Validator<string>;
            image_normal: PropTypes.Validator<string>;
            image_flip: PropTypes.Requireable<string>;
            collector_number: PropTypes.Requireable<string>;
            prices: PropTypes.Validator<PropTypes.InferProps<{
                usd: PropTypes.Requireable<number>;
                usd_foil: PropTypes.Requireable<number>;
                eur: PropTypes.Requireable<number>;
                tix: PropTypes.Requireable<number>;
            }>>;
        }>[]>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CardPage.d.ts.map