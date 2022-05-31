import { Link } from '@mui/material';
import PropTypes from 'prop-types';

import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import LinkModal from '@cubeartisan/client/components/modals/LinkModal.js';

const LinkWithModal = withModal(Link, LinkModal);

const ExternalLink = ({ href, ...props }) => (
  <LinkWithModal href={`/leave?url=${encodeURIComponent(href)}`} modalProps={{ link: href }} {...props} />
);
ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
};
export default ExternalLink;
