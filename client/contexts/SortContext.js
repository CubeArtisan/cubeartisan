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
import { createContext, Component } from 'react';
import PropTypes from 'prop-types';

const SortContext = createContext({
  primary: 'Color Category',
  secondary: 'Types-Multicolor',
  tertiary: 'Mana Value',
  quaternary: 'Alphabetical',
  showOther: false,
});

export class SortContextProvider extends Component {
  constructor(props) {
    super(props);
    const {
      defaultSorts: [
        primary = 'Color Category',
        secondary = 'Types-Multicolor',
        tertiary = 'Mana Value',
        quaternary = 'Alphabetical',
      ],
      showOther = false,
    } = this.props;

    this.state = {
      primary,
      secondary,
      tertiary,
      quaternary,
      showOther,
    };

    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    for (const stage of ['primary', 'secondary', 'tertiary', 'quaternary']) {
      const select = document.getElementById(`${stage}SortSelect`);
      if (select) {
        select.addEventListener('change', (event) => {
          this.setState({
            [stage]: event.target.value,
          });
        });
      }
    }
  }

  changeSort(change) {
    this.setState(change);
  }

  render() {
    const value = {
      ...this.state,
      changeSort: this.changeSort,
    };
    return <SortContext.Provider value={value} {...this.props} />;
  }
}

SortContextProvider.propTypes = {
  defaultSorts: PropTypes.arrayOf(PropTypes.string).isRequired,
  showOther: PropTypes.bool.isRequired,
};

SortContext.Wrapped = (Tag) => (props) =>
  <SortContext.Consumer>{(value) => <Tag {...props} {...value} />}</SortContext.Consumer>;

export default SortContext;
