import React from 'react';
import RealTimeAgo from 'react-timeago';

// This is necessary because on the server react-timeago is not a function, but client it does import correctly..
const TimeAgo = (props) => {
  if (RealTimeAgo) {
    if (RealTimeAgo.default) {
      const Component = RealTimeAgo.default;
      return <Component {...props} />;
    }
    return <RealTimeAgo {...props} />;
  }
  return null;
};
export default TimeAgo;
