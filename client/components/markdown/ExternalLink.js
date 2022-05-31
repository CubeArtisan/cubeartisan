import PropTypes from 'prop-types';

import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import LinkModal from '@cubeartisan/client/components/modals/LinkModal.js';

const Link = withModal('a', LinkModal);

const ExternalLink = ({ href, ...props }) => (
  <Link href={`/leave?url=${encodeURIComponent(href)}`} modalProps={{ link: href }} {...props} />
);
ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
};
export default ExternalLink;
