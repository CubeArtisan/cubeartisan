import Link from 'next/link';

interface DirectoryItem {
  heading: string;
  listItems: Array<{ label: string, link: string }>;
}

const directory: DirectoryItem[] = [
  {
    heading: 'Directory',
    listItems: [
      { label: 'Home', link: '/' },
      { label: 'Social', link: '/social' },
      { label: 'Profile', link: '/user/jesseb34r' },
    ],
  },
  {
    heading: 'Contact',
    listItems: [
      { label: 'Discord', link: '/' },
      { label: 'GitHub', link: '/' },
      { label: 'Twitter', link: '/' },
    ],
  },
  {
    heading: 'Help',
    listItems: [
      { label: 'Docs', link: '/' },
      { label: 'Dev Blog', link: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 mb-14 w-full">
      <hr className="mx-auto mb-4 h-1 w-[80%] rounded border-0 bg-gray-700 " />
      <nav className="flex justify-around text-center">
        {directory.map((directoryItem: DirectoryItem) => (
          <div key={directoryItem.heading}>
            <h2 className="mb-1 font-semibold">{directoryItem.heading}</h2>
            <ul className="flex flex-col">
              {directoryItem.listItems.map((listItem) => (
                <Link key={listItem.label} className="hover:underline" href={listItem.link}>
                  {listItem.label}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </footer>
  );
}
