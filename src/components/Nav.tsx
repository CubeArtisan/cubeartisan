import { A } from 'solid-start';

const SiteNavbar = () => {
  const userid = '';

  return (
    <nav>
      <ul>
        <li>
          <A href="/">Home</A>
        </li>
        <li>
          <A href="/social">Social</A>
        </li>
        <li>
          <A href={`/${userid}/cubes`}>Your Cubes</A>
        </li>
      </ul>
    </nav>
  );
};

export default SiteNavbar;
