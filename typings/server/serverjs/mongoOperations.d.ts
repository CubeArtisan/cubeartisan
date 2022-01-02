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
    $eq?: undefined;
    $ne?: undefined;
} | {
    $eq: any;
    $regex?: undefined;
    $options?: undefined;
    $ne?: undefined;
} | {
    $ne: any;
    $regex?: undefined;
    $options?: undefined;
    $eq?: undefined;
};
declare function stringContainOperation(op: any, value: any): {
    $regex: any;
    $options: string;
    $not?: undefined;
    $ne?: undefined;
} | {
    $not: {
        $regex: any;
        $options: string;
    };
    $regex?: undefined;
    $options?: undefined;
    $ne?: undefined;
} | {
    $ne: any;
    $regex?: undefined;
    $options?: undefined;
    $not?: undefined;
};
declare function equalityOperation(op: any, value: any): {
    $eq: any;
    $ne?: undefined;
} | {
    $ne: any;
    $eq?: undefined;
};
declare function setOperation(op: any, value: any): {
    $all: any;
    $and?: undefined;
    $or?: undefined;
    $not?: undefined;
} | {
    $and: ({
        $all: any;
        $not?: undefined;
    } | {
        $not: {
            $elemMatch: {
                $nin: any;
            };
        };
        $all?: undefined;
    })[];
    $all?: undefined;
    $or?: undefined;
    $not?: undefined;
} | {
    $or: ({
        $not: {
            $all: any;
        };
        $elemMatch?: undefined;
    } | {
        $elemMatch: {
            $nin: any;
        };
        $not?: undefined;
    })[];
    $all?: undefined;
    $and?: undefined;
    $not?: undefined;
} | {
    $and: ({
        $not: {
            $elemMatch: {
                $nin: any;
            };
            $all?: undefined;
        };
    } | {
        $not: {
            $all: any;
            $elemMatch?: undefined;
        };
    })[];
    $all?: undefined;
    $or?: undefined;
    $not?: undefined;
} | {
    $not: {
        $elemMatch: {
            $nin: any;
        };
    };
    $all?: undefined;
    $and?: undefined;
    $or?: undefined;
} | {
    $and: ({
        $elemMatch: {
            $nin: any;
        };
        $all?: undefined;
    } | {
        $all: any;
        $elemMatch?: undefined;
    })[];
    $all?: undefined;
    $or?: undefined;
    $not?: undefined;
};
declare function rarityOperation(op: any, value: any): {
    $eq: any;
    $ne?: undefined;
} | {
    $ne: any;
    $eq?: undefined;
};
declare function convertParsedCost(parsedCost: any): any;
declare function manaCostOperation(op: any, value: any): {
    $eq: any;
    $ne?: undefined;
} | {
    $ne: any;
    $eq?: undefined;
};
declare function setElementOperation(value: any): any;
//# sourceMappingURL=mongoOperations.d.ts.map