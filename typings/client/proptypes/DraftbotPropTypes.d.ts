export const StepPropType: PropTypes.Requireable<PropTypes.InferProps<{
    action: PropTypes.Validator<string>;
    amount: PropTypes.Requireable<number>;
}>>;
export const ColorPropType: PropTypes.Requireable<string>;
export const DrafterStatePropType: PropTypes.Requireable<PropTypes.InferProps<{
    cards: PropTypes.Validator<(PropTypes.InferProps<{
        _id: PropTypes.Requireable<string>;
        index: PropTypes.Requireable<number>;
        imgUrl: PropTypes.Requireable<string>;
        imgBackUrl: PropTypes.Requireable<string>;
        cardID: PropTypes.Validator<string>;
        colors: PropTypes.Requireable<(string | null | undefined)[]>;
        tags: PropTypes.Requireable<(string | null | undefined)[]>;
        details: PropTypes.Requireable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            name: PropTypes.Validator<string>;
            image_normal: PropTypes.Validator<string>;
            image_flip: PropTypes.Requireable<string>;
            image_small: PropTypes.Requireable<string>;
        }>>;
        addedTmsp: PropTypes.Requireable<string>;
    }> | null | undefined)[]>;
    picked: PropTypes.Validator<number[]>;
    trashed: PropTypes.Validator<number[]>;
    seen: PropTypes.Requireable<number[]>;
    cardsInPack: PropTypes.Validator<number[]>;
    packNum: PropTypes.Validator<number>;
    pickNum: PropTypes.Validator<number>;
    numPacks: PropTypes.Validator<number>;
    packSize: PropTypes.Validator<number>;
    pickedNum: PropTypes.Validator<number>;
    trashedNum: PropTypes.Validator<number>;
    stepNumber: PropTypes.Validator<number>;
    pickNumber: PropTypes.Validator<number>;
    step: PropTypes.Requireable<PropTypes.InferProps<{
        action: PropTypes.Validator<string>;
        amount: PropTypes.Requireable<number>;
    }>>;
}>>;
export const BotStatePropType: PropTypes.Requireable<PropTypes.InferProps<{
    cardIndex: PropTypes.Validator<number>;
    probabilities: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    cards: PropTypes.Validator<(PropTypes.InferProps<{
        _id: PropTypes.Requireable<string>;
        index: PropTypes.Requireable<number>;
        imgUrl: PropTypes.Requireable<string>;
        imgBackUrl: PropTypes.Requireable<string>;
        cardID: PropTypes.Validator<string>;
        colors: PropTypes.Requireable<(string | null | undefined)[]>;
        tags: PropTypes.Requireable<(string | null | undefined)[]>;
        details: PropTypes.Requireable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            name: PropTypes.Validator<string>;
            image_normal: PropTypes.Validator<string>;
            image_flip: PropTypes.Requireable<string>;
            image_small: PropTypes.Requireable<string>;
        }>>;
        addedTmsp: PropTypes.Requireable<string>;
    }> | null | undefined)[]>;
    picked: PropTypes.Validator<number[]>;
    trashed: PropTypes.Validator<number[]>;
    seen: PropTypes.Requireable<number[]>;
    cardsInPack: PropTypes.Validator<number[]>;
    packNum: PropTypes.Validator<number>;
    pickNum: PropTypes.Validator<number>;
    numPacks: PropTypes.Validator<number>;
    packSize: PropTypes.Validator<number>;
    pickedNum: PropTypes.Validator<number>;
    trashedNum: PropTypes.Validator<number>;
    stepNumber: PropTypes.Validator<number>;
    pickNumber: PropTypes.Validator<number>;
    step: PropTypes.Requireable<PropTypes.InferProps<{
        action: PropTypes.Validator<string>;
        amount: PropTypes.Requireable<number>;
    }>>;
}>>;
export const OraclePropType: PropTypes.Requireable<PropTypes.InferProps<{
    title: PropTypes.Validator<string>;
    tooltip: PropTypes.Requireable<string>;
    perConsideredCard: PropTypes.Requireable<boolean>;
    weights: PropTypes.Validator<number[][]>;
    computeWeight: PropTypes.Validator<(...args: any[]) => any>;
    computeValue: PropTypes.Validator<(...args: any[]) => any>;
}>>;
export const OracleResultPropType: PropTypes.Requireable<PropTypes.InferProps<{
    title: PropTypes.Validator<string>;
    tooltip: PropTypes.Requireable<string>;
    weight: PropTypes.Validator<number>;
    value: PropTypes.Validator<number>;
}>>;
export const BotEvaluationPropType: PropTypes.Requireable<PropTypes.InferProps<{
    score: PropTypes.Validator<number>;
    oracleResults: PropTypes.Validator<PropTypes.InferProps<{
        title: PropTypes.Validator<string>;
        tooltip: PropTypes.Requireable<string>;
        weight: PropTypes.Validator<number>;
        value: PropTypes.Validator<number>;
    }>[]>;
    totalProbability: PropTypes.Requireable<number>;
}>>;
export const PackPropType: PropTypes.Requireable<PropTypes.InferProps<{
    cards: PropTypes.Validator<number[]>;
    steps: PropTypes.Requireable<PropTypes.InferProps<{
        action: PropTypes.Validator<string>;
        amount: PropTypes.Requireable<number>;
    }>[]>;
}>>;
export const SeatPropType: PropTypes.Requireable<PropTypes.InferProps<{
    bot: PropTypes.Requireable<boolean>;
    name: PropTypes.Validator<string>;
    userid: PropTypes.Requireable<string>;
    drafted: PropTypes.Validator<number[][][]>;
    sideboard: PropTypes.Validator<number[][][]>;
    pickorder: PropTypes.Validator<number[]>;
    trashorder: PropTypes.Validator<number[]>;
}>>;
export const DraftPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
    basics: PropTypes.Validator<number[]>;
    cards: PropTypes.Validator<PropTypes.InferProps<{
        _id: PropTypes.Requireable<string>;
        index: PropTypes.Requireable<number>;
        imgUrl: PropTypes.Requireable<string>;
        imgBackUrl: PropTypes.Requireable<string>;
        cardID: PropTypes.Validator<string>;
        colors: PropTypes.Requireable<(string | null | undefined)[]>;
        tags: PropTypes.Requireable<(string | null | undefined)[]>;
        details: PropTypes.Requireable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            name: PropTypes.Validator<string>;
            image_normal: PropTypes.Validator<string>;
            image_flip: PropTypes.Requireable<string>;
            image_small: PropTypes.Requireable<string>;
        }>>;
        addedTmsp: PropTypes.Requireable<string>;
    }>[]>;
    cube: PropTypes.Validator<string>;
    initial_state: PropTypes.Validator<PropTypes.InferProps<{
        cards: PropTypes.Validator<number[]>;
        steps: PropTypes.Requireable<PropTypes.InferProps<{
            action: PropTypes.Validator<string>;
            amount: PropTypes.Requireable<number>;
        }>[]>;
    }>[][]>;
    seats: PropTypes.Validator<PropTypes.InferProps<{
        bot: PropTypes.Requireable<boolean>;
        name: PropTypes.Validator<string>;
        userid: PropTypes.Requireable<string>;
        drafted: PropTypes.Validator<number[][][]>;
        sideboard: PropTypes.Validator<number[][][]>;
        pickorder: PropTypes.Validator<number[]>;
        trashorder: PropTypes.Validator<number[]>;
    }>[]>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=DraftbotPropTypes.d.ts.map