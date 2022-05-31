import { Box, Stack, Tooltip, tooltipClasses, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useContext } from 'react';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import TagContext from '@cubeartisan/client/components/contexts/TagContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import {
  cardFinish,
  cardFullName,
  cardImageBackUrl,
  cardImageFlip,
  cardImageNormal,
  cardImageUrl,
  cardTags,
} from '@cubeartisan/client/utils/Card.js';

const placeholderClass = () => '';

const RenderImage = ({ name, src, foil }) => {
  const { autoCardSize } = useContext(DisplayContext);
  return (
    <Box>
      {foil && (
        <Box
          component="img"
          key="foil"
          alt="Foil Overlay"
          src="/content/foilOverlay.png"
          sx={{ width: autoCardSize, position: 'absolute', pointerEvents: 'none', mixBlendMode: 'color-burn' }}
        />
      )}
      <Box component="img" key="frontImage" src={src} alt={name} sx={{ width: autoCardSize }} />
    </Box>
  );
};
RenderImage.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string.isRequired,
  foil: PropTypes.bool,
};
RenderImage.defaultProps = {
  name: 'Unknown Card Image',
  foil: false,
};

/**
 * @typedef {{ card?: import('@cubeartisan/client/proptypes/CardPropType.js').Card, front?: string, back?: string, tags?: string[] }} AutocardProps
 */

/**
 * @template {object} P
 * @param {import('react').ComponentType<P>} Tag - The tag for the autocard components
 * @returns {import('react').ForwardRefExoticComponent<AutocardProps & P>}
 */
const withAutocard = (Tag) => {
  /**
   * @typedef {import('react').ForwardRefExoticComponent<AutocardProps & P>} ComponentType
   * @type ComponentType
   */
  // @ts-ignore
  const WithAutocard = forwardRef(({ card, front, back, tags, ...props }, ref) => {
    const tagContext = useContext(TagContext);
    const tagColorClass = tagContext?.tagColorClass ?? placeholderClass;
    const { autoCardSize, showCustomImages } = useContext(DisplayContext);
    card = card ?? { cardID: '', tags: [], details: { image_normal: '', _id: '', name: '' } };
    tags = tags ?? cardTags(card) ?? [];
    front = front || (showCustomImages && cardImageUrl(card)) || cardImageNormal(card);
    back = back || (showCustomImages && cardImageBackUrl(card)) || cardImageFlip(card);
    const foil = cardFinish(card) === 'Foil';
    const name = cardFullName(card);
    const width = back ? `calc(${autoCardSize} * 2)` : autoCardSize;
    const cardRender = (
      <Box sx={{ backgroundColor: 'background.darker', width }}>
        <Typography variant="subtitle1" noWrap sx={{ padding: 1, width: '100%' }}>
          {name}
        </Typography>
        <Stack direction="row">
          <RenderImage key="front" name={`${name}${back ? ' Front' : ''}`} src={front} foil={foil} />
          {back && <RenderImage key="back" name={`${name} Back`} src={back} foil={foil} />}
        </Stack>
        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', padding: 1 }}>
            {tags.map((tag, idx) => (
              <Typography
                sx={{
                  width: 'fit-content',
                  backgroundColor: tagColorClass(tag.trim()),
                  padding: 0.5,
                  margin: 0.5,
                  border: '1px solid',
                  borderRadius: '0.5rem',
                }}
                variant="body2"
                key={`${tag}-${idx}` /* eslint-disable-line */}
              >
                {tag.trim()}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    );
    return (
      <Tooltip
        title={cardRender}
        followCursor
        placement="right-end"
        sx={{
          [`& .${tooltipClasses.tooltip}`]: {
            width,
            padding: 0,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Tag ref={ref} {...props} />
      </Tooltip>
    );
  });
  WithAutocard.propTypes = {
    card: CardPropType,
    front: PropTypes.string,
    back: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    ...Tag.propTypes,
  };
  WithAutocard.defaultProps = {
    card: null,
    front: null,
    back: null,
    tags: null,
    ...Tag.defaultProps,
  };
  if (typeof Tag === 'string') {
    WithAutocard.displayName = `${Tag}WithAutocard`;
  } else if (Tag.displayName) {
    WithAutocard.displayName = `${Tag.displayName}WithAutocard`;
  } else if (Tag.name) {
    WithAutocard.displayName = `${Tag.name}WithAutocard`;
  } else {
    WithAutocard.displayName = 'WithAutocard';
  }
  return WithAutocard;
};

export default withAutocard;
