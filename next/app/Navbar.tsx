import BellIcon from '@heroicons/react/24/solid/BellIcon';
import SearchIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Link from 'next/link';

const Navbar = () => (
  <header className="clamp mt-4 mb-8 flex px-2 pt-3 leading-7">
    <Link className="mr-8 text-xl font-semibold" href="/">
      CubeArtisan
    </Link>
    <nav className="flex w-full justify-between">
      <ul className="flex justify-around">
        <Link key="Home" className="mx-2 hover:underline" href="/">
          Home
        </Link>
        <Link key="Social" className="mx-2 hover:underline" href="/social">
          Social
        </Link>
        <li key="|" className="mx-2">
          |
        </li>
        <Link key="Your Cubes" className="mx-2 hover:underline" href="/user/jesseb34r/cubes">
          Your Cubes
        </Link>
      </ul>
      <ul className="flex">
        <SearchIcon key="Search" className="mx-2 h-6 w-6" />
        <PlusIcon key="Plus" className="mx-2 h-6 w-6" />
        <BellIcon key="Bell" className="mx-2 h-6 w-6" />
      </ul>
    </nav>
  </header>
);

export default Navbar;
