export default Deck;
declare const Deck: mongoose.Model<{
    cards: {
        index: number;
        name: string;
        rarity: string;
        cmc: number;
        colorCategory: string;
        finish: string;
        status: string;
        tags: string[];
        type_line: string;
        isUnlimited: boolean;
        colors?: string[];
        addedTmsp?: Date;
        cardID?: string;
        imgBackUrl?: string;
        imgUrl?: string;
        notes?: string;
    }[];
    schemaVersion: number;
    basics: number[];
    draft: mongoose.Types.ObjectId;
    cubename: string;
    seats: {
        description: string;
        bot: string[];
        deck: number[][][];
        sideboard: number[][][];
        pickorder: number[];
        name?: string;
        username?: string;
        userid?: mongoose.Types.ObjectId;
    }[];
    owner?: mongoose.Types.ObjectId;
    date?: Date;
    cube?: mongoose.Types.ObjectId;
    cubeOwner?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    cards: {
        index: number;
        name: string;
        rarity: string;
        cmc: number;
        colorCategory: string;
        finish: string;
        status: string;
        tags: string[];
        type_line: string;
        isUnlimited: boolean;
        colors?: string[];
        addedTmsp?: Date;
        cardID?: string;
        imgBackUrl?: string;
        imgUrl?: string;
        notes?: string;
    }[];
    schemaVersion: number;
    basics: number[];
    draft: mongoose.Types.ObjectId;
    cubename: string;
    seats: {
        description: string;
        bot: string[];
        deck: number[][][];
        sideboard: number[][][];
        pickorder: number[];
        name?: string;
        username?: string;
        userid?: mongoose.Types.ObjectId;
    }[];
    owner?: mongoose.Types.ObjectId;
    date?: Date;
    cube?: mongoose.Types.ObjectId;
    cubeOwner?: mongoose.Types.ObjectId;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=deck.d.ts.map