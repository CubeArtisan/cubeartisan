// eslint-disable-next-line import/no-named-default
import { default as styledOrig } from 'styled-components';

const styled = typeof styledOrig === 'function' ? styledOrig : styledOrig.default;
export default styled;
