export default Draft;
declare const Draft: mongoose.Model<{
    cards: {
        index: number;
        name: string;
        rarity: string;
        cmc: number;
        colorCategory: string;
        finish: string;
        status: string;
        tags: {
            type?: string;
            minlength?: unknown;
        }[];
        type_line: string;
        isUnlimited: boolean;
        colors?: {
            enum: unknown[];
            type?: string;
        }[];
        addedTmsp?: Date;
        cardID?: string;
        imgBackUrl?: string;
        imgUrl?: string;
        notes?: string;
    }[];
    schemaVersion: number;
    basics: number[];
    seats: {
        sideboard: number[][][];
        pickorder: number[];
        drafted: number[][][];
        trashorder: number[];
        name?: string;
        bot?: boolean;
        userid?: mongoose.Types.ObjectId;
    }[];
    initial_state: {
        cards: {
            type?: number;
            min?: unknown;
        }[];
        steps: {
            amount: number;
            action?: string;
        }[];
    }[][];
    cas: number;
    timeout?: number;
    seed?: string;
    cube?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    cards: {
        index: number;
        name: string;
        rarity: string;
        cmc: number;
        colorCategory: string;
        finish: string;
        status: string;
        tags: {
            type?: string;
            minlength?: unknown;
        }[];
        type_line: string;
        isUnlimited: boolean;
        colors?: {
            enum: unknown[];
            type?: string;
        }[];
        addedTmsp?: Date;
        cardID?: string;
        imgBackUrl?: string;
        imgUrl?: string;
        notes?: string;
    }[];
    schemaVersion: number;
    basics: number[];
    seats: {
        sideboard: number[][][];
        pickorder: number[];
        drafted: number[][][];
        trashorder: number[];
        name?: string;
        bot?: boolean;
        userid?: mongoose.Types.ObjectId;
    }[];
    initial_state: {
        cards: {
            type?: number;
            min?: unknown;
        }[];
        steps: {
            amount: number;
            action?: string;
        }[];
    }[][];
    cas: number;
    timeout?: number;
    seed?: string;
    cube?: mongoose.Types.ObjectId;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=draft.d.ts.map