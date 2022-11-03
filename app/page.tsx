import Link from "next/link";
import Hero from "../lib/components/Hero";

const heroText = {
  mainText: "CubeArtisan",
  subText: "build, analyze, and share cubes",
};

export default function Home() {
  return <Hero {...heroText} />;
}
