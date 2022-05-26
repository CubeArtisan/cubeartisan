import { Box, Stack, styled, Tooltip, tooltipClasses, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { forwardRef, useContext, useRef } from 'react';

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
  cardName,
  cardTags,
} from '@cubeartisan/client/utils/Card.js';

const placeholderClass = () => '';

const StyledCardTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    width: 'fit-content',
    padding: 0,
    backgroundColor: 'background.paper',
  },
});

const StyledCardImage = styled('img')({
  width: 300,
});

const StyledFoilImage = styled(StyledCardImage)({
  position: 'absolute',
  pointerEvents: 'none',
  mixBlendMode: 'color-burn',
});

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
    const { showCustomImages } = useContext(DisplayContext);
    const backupRef = useRef();
    card = card ?? { cardID: '', tags: [], details: { image_normal: '', _id: '', name: '' } };
    tags = tags ?? cardTags(card) ?? [];
    front = front || (showCustomImages && cardImageUrl(card)) || cardImageNormal(card);
    back = back || (showCustomImages && cardImageBackUrl(card)) || cardImageFlip(card);
    const foil = cardFinish(card) === 'Foil';
    const name = cardFullName(card);
    console.debug(name, 'is foil:', foil);
    const cardRender = (
      <Box sx={{ backgroundColor: 'background.paper', width: 'fit-content' }}>
        <Typography sx={{ width: '100%', backgroundColor: 'background.darker' }}>{name}</Typography>
        <Box sx={{ width: 'fit-content' }}>
          <Stack direction="row">
            <Box>
              {foil && <StyledFoilImage key="foil" alt={cardName(card)} src="/content/foilOverlay.png" />}
              <StyledCardImage key="frontImage" src={front} alt={back ? `${name} Front` : name} />
            </Box>
            {back && (
              <Box>
                {foil && <StyledFoilImage key="foil" alt={`${cardName(card)}: Back`} src="/content/foilOverlay.png" />}
                <StyledCardImage key="backImage" src={back} alt={`${name} Back`} />
              </Box>
            )}
          </Stack>
          {tags && tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: 300 }}>
              {tags.map((tag) => (
                <Typography
                  sx={{ width: 'fit-content', backgroundColor: tagColorClass(tag.trim()), padding: 2 }}
                  variant="body2"
                  key={tag}
                >
                  {tag.trim()}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
    return (
      <StyledCardTooltip
        title={cardRender}
        PopperProps={{
          disablePortal: true,
        }}
      >
        <Tag ref={ref ?? backupRef} {...props} />
      </StyledCardTooltip>
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
