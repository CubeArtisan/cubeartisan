export default CubeLayout;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
export type CubeLayoutProps = {
    cube: Cube;
    activeLink: string;
    children: React.ReactNode;
    loginCallback: string;
};
declare const CubeLayout: React.FC<CubeLayoutProps>;
//# sourceMappingURL=CubeLayout.d.ts.map