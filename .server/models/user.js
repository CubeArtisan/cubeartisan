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

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  username_lower: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  confirmed: {
    type: String,
    required: true,
    default: false,
  },
  about: {
    type: String,
    required: false,
  },
  hide_tag_colors: {
    type: Boolean,
    default: false,
  },
  edit_token: String,
  followed_cubes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube',
      },
    ],
    default: [],
  },
  followed_users: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  users_following: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  notifications: {
    type: [
      {
        user_from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        user_from_name: String,
        url: String,
        date: Date,
        text: String,
      },
    ],
    default: [],
  },
  old_notifications: {
    type: [
      {
        user_from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        user_from_name: String,
        url: String,
        date: Date,
        text: String,
      },
    ],
    default: [],
  },
  image_name: {
    type: String,
    default: 'Ambush Viper',
  },
  image: {
    type: String,
    default: 'https://img.scryfall.com/cards/art_crop/front/0/c/0c082aa8-bf7f-47f2-baf8-43ad253fd7d7.jpg?1562826021',
  },
  artist: {
    type: String,
    default: 'Allan Pollack',
  },
  roles: {
    type: [
      {
        type: String,
        enum: ['Admin', 'ContentCreator', 'Patron'],
      },
    ],
    default: [],
  },
  theme: {
    type: String,
    enum: ['default', 'dark', 'light'],
    default: 'default',
  },
  hide_featured: {
    type: Boolean,
    default: false,
  },
});

UserSchema.index({
  username_lower: 1,
});

UserSchema.index({
  email: 1,
});

export default mongoose.model('User', UserSchema);
