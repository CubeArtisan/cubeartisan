import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import TimeAgo from '@cubeartisan/client/components/utils/TimeAgo.js';

const PreviewCard = ({ href, date, image, title, subtitle, username }) => {
  const handleClick = useCallback(
    (event) => {
      if (!event.target.getAttribute('data-sublink') && href) {
        window.location.href = href;
      }
    },
    [href],
  );
  return (
    <Card sx={{ margin: 1, paddingBottom: 1 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" alt={title} src={image} />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </CardContent>
      </CardActionArea>
      <Typography variant="caption" sx={{ marginLeft: 2 }}>
        By{' '}
        <Link data-sublink href={`/user/${username}`}>
          {username}
        </Link>
        {' — '}
        <TimeAgo date={date} />
      </Typography>
    </Card>
  );
};
PreviewCard.propTypes = {
  href: PropTypes.string,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  username: PropTypes.string.isRequired,
};
PreviewCard.defaultProps = {
  href: null,
  subtitle: '',
};
export default PreviewCard;
