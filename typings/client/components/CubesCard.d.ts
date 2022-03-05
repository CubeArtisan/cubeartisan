export default CubesCard;
export type ComponentType = import('react').FunctionComponent<{
    cubes: [any];
    title: string;
    lean: boolean;
    header?: {
        sideLink: string;
        sideText: string;
        hLevel: number;
    };
}>;
/**
 * @typedef { import('react').FunctionComponent<{ cubes: [any], title: string, lean: Boolean, header?: { sideLink: string, sideText: string, hLevel: number } }>} ComponentType
 * @type ComponentType
 * */
declare const CubesCard: ComponentType;
//# sourceMappingURL=CubesCard.d.ts.map