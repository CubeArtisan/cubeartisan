// eslint-disable-next-line import/no-named-default
import { styled as styledOrig } from '@mui/material';

const styled = typeof styledOrig === 'function' ? styledOrig : styledOrig.default;
export default styled;
