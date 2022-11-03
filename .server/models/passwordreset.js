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
import mongoose from 'mongoose';

const PasswordResetSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: false,
  },
  code: {
    type: String,
    required: true,
  },
});

PasswordResetSchema.index({
  code: 1,
  email: 1,
});

export default mongoose.model('PasswordReset', PasswordResetSchema);
