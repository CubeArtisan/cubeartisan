/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';

import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';

const LoginModal = ({ isOpen, toggle, loginCallback }) => (
  <Modal open={isOpen} onClose={toggle}>
    <Box
      sx={{
        display: 'block',
        padding: 4,
        backgroundColor: 'background.paper',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid',
        boxShadow: 24,
      }}
    >
      <Typography variant="h4">Login</Typography>
      <Divider sx={{ marginY: 1 }} />
      <CSRFForm method="POST" action="/login">
        <TextField
          label="Username or Email Address:"
          maxLength="1000"
          name="username"
          id="email"
          sx={{ marginY: 1 }}
          fullWidth
        />
        <TextField
          label="Password:"
          maxLength="1000"
          name="password"
          id="password"
          type="password"
          sx={{ marginY: 1 }}
          fullWidth
        />
        <input type="hidden" name="loginCallback" value={loginCallback} />
        <Button type="submit" color="success" fullWidth variant="contained">
          Login
        </Button>
      </CSRFForm>
    </Box>
  </Modal>
);

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  loginCallback: PropTypes.string.isRequired,
};

export default LoginModal;
