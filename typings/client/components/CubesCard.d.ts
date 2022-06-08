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
declare const CubesCard: ComponentType;
//# sourceMappingURL=CubesCard.d.ts.map