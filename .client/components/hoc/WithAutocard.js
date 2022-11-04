import { Box, Stack, Tooltip, tooltipClasses, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useContext } from 'react';

import CardImage from '@cubeartisan/client/components/CardImage.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import TagContext from '@cubeartisan/client/components/contexts/TagContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { cardFullName, cardTags } from '@cubeartisan/client/utils/Card.js';

const placeholderClass = () => '';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef AutocardProps
 * @property {Card} card
 * @property {boolean} [back]
 * @property {string[]} [tags]
 */

/**
 * @template P
 * @param {React.ComponentType<P>} Tag - The tag for the autocard components
 */
const withAutocard = (Tag) => {
  /**
   * @type {React.ForwardRefRenderFunction<any, AutocardProps & Omit<P, 'card'|'back'>>}
   */
  // eslint-disable-next-line react/prop-types
  const WithAutocardComponent = ({ card, back, tags, ...props }, ref) => {
    const tagContext = useContext(TagContext);
    const tagColorClass = tagContext?.tagColorClass ?? placeholderClass;
    const { autoCardSize } = useContext(DisplayContext);
    tags = tags ?? cardTags(card) ?? [];
    const name = cardFullName(card);
    const width = back ? `calc(${autoCardSize} * 2)` : autoCardSize;
    const cardRender = (
      <Box sx={{ backgroundColor: 'background.darker', width }}>
        <Typography variant="subtitle1" noWrap sx={{ padding: 1, width: '100%' }}>
          {name}
        </Typography>
        <Stack direction="row">
          <CardImage key="front" card={card} width={autoCardSize} />
          {back && <CardImage key="back" card={card} width={autoCardSize} back />}
        </Stack>
        {
          /* eslint-disable-line react/prop-types */ tags && tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', padding: 1 }}>
              {
                /* eslint-disable-line react/prop-types */ tags.map((tag, idx) => (
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
                ))
              }
            </Box>
          )
        }
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
        {/* @ts-ignore */}
        {Tag === CardImage ? <Tag ref={ref} card={card} back={back} {...props} /> : <Tag ref={ref} {...props} />}
      </Tooltip>
    );
  };
  const WithAutocard = forwardRef(WithAutocardComponent);
  if (typeof Tag === 'string') {
    WithAutocard.displayName = `${Tag}WithAutocard`;
  } else if (Tag.displayName) {
    WithAutocard.displayName = `${Tag.displayName}WithAutocard`;
  } else if (Tag.name) {
    WithAutocard.displayName = `${Tag.name}WithAutocard`;
  } else {
    WithAutocard.displayName = 'WithAutocard';
  }
  // @ts-ignore
  WithAutocard.propTypes = {
    // @ts-ignore
    card: CardPropType.isRequired,
    back: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    ...(Tag.propTypes ?? {}),
  };
  // @ts-ignore
  WithAutocard.defaultProps = {
    // @ts-ignore
    back: false,
    tags: undefined,
    ...(Tag.defaultProps ?? {}),
  };
  return WithAutocard;
};
export default withAutocard;
