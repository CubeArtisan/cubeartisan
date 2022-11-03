declare namespace _default {
    export { defaultOperation };
    export { stringOperation };
    export { stringContainOperation };
    export { equalityOperation };
    export { setOperation };
    export { rarityOperation };
    export { convertParsedCost };
    export { manaCostOperation };
    export { setElementOperation };
}
export default _default;
declare function defaultOperation(op: any, value: any): {
    [x: number]: any;
};
declare function stringOperation(op: any, value: any): {
    $regex: any;
    $options: string;
    $eq?: never;
    $ne?: never;
} | {
    $eq: any;
    $regex?: never;
    $options?: never;
    $ne?: never;
} | {
    $ne: any;
    $regex?: never;
    $options?: never;
    $eq?: never;
};
declare function stringContainOperation(op: any, value: any): {
    $regex: any;
    $options: string;
    $not?: never;
    $ne?: never;
} | {
    $not: {
        $regex: any;
        $options: string;
    };
    $regex?: never;
    $options?: never;
    $ne?: never;
} | {
    $ne: any;
    $regex?: never;
    $options?: never;
    $not?: never;
};
declare function equalityOperation(op: any, value: any): {
    $eq: any;
    $ne?: never;
} | {
    $ne: any;
    $eq?: never;
};
declare function setOperation(op: any, value: any): {
    $all: any;
    $and?: never;
    $or?: never;
    $not?: never;
} | {
    $and: ({
        $all: any;
        $not?: never;
    } | {
        $not: {
            $elemMatch: {
                $nin: any;
            };
        };
        $all?: never;
    })[];
    $all?: never;
    $or?: never;
    $not?: never;
} | {
    $or: ({
        $not: {
            $all: any;
        };
        $elemMatch?: never;
    } | {
        $elemMatch: {
            $nin: any;
        };
        $not?: never;
    })[];
    $all?: never;
    $and?: never;
    $not?: never;
} | {
    $and: ({
        $not: {
            $elemMatch: {
                $nin: any;
            };
            $all?: never;
        };
    } | {
        $not: {
            $all: any;
            $elemMatch?: never;
        };
    })[];
    $all?: never;
    $or?: never;
    $not?: never;
} | {
    $not: {
        $elemMatch: {
            $nin: any;
        };
    };
    $all?: never;
    $and?: never;
    $or?: never;
} | {
    $and: ({
        $elemMatch: {
            $nin: any;
        };
        $all?: never;
    } | {
        $all: any;
        $elemMatch?: never;
    })[];
    $all?: never;
    $or?: never;
    $not?: never;
};
declare function rarityOperation(op: any, value: any): {
    $eq: any;
    $ne?: never;
} | {
    $ne: any;
    $eq?: never;
};
declare function convertParsedCost(parsedCost: any): any;
declare function manaCostOperation(op: any, value: any): {
    $eq: any;
    $ne?: never;
} | {
    $ne: any;
    $eq?: never;
};
declare function setElementOperation(value: any): any;
//# sourceMappingURL=mongoOperations.d.ts.map