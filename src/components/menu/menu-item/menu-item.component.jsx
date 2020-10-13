import React from 'react';
import { withRouter } from 'react-router-dom';

import { Box } from '@material-ui/core';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl}`
      }}
    />
    <Box className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
    </Box>
  </div>
);

export default withRouter(MenuItem);
