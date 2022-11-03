import Link from "next/link";
import SearchIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import BellIcon from "@heroicons/react/24/solid/BellIcon";

export default function Navbar() {
  return (
    <header className="clamp mt-4 mb-8 flex px-2 pt-3 leading-7">
      <Link className="mr-8 text-xl font-semibold" href="/">
        CubeArtisan
      </Link>
      <nav className="flex w-full justify-between ">
        <ul className="flex justify-around">
          <li className="mx-2">
            <Link className="hover:underline" href="/">
              Home
            </Link>
          </li>
          <li className="mx-2">
            <Link className="hover:underline" href="/social">
              Social
            </Link>
          </li>
          <li className="mx-2">|</li>
          <li className="mx-2">
            <Link className="hover:underline" href="/user/jesseb34r/cubes">
              Your Cubes
            </Link>
          </li>
        </ul>
        <ul className="flex">
          <li className="mx-2">
            <SearchIcon className="h-6 w-6" />
          </li>
          <li className="mx-2">
            <PlusIcon className="h-6 w-6" />
          </li>
          <li className="mx-2">
            <BellIcon className="h-6 w-6" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
