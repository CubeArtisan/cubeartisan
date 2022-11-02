import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Social</a>
        </li>
        <li>
          <a href="/">Your Cubes</a>
        </li>
      </ul>
    </nav>
  );
}
