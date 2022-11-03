const heroText = {
  mainText: "CubeArtisan",
  subText: "build, analyze, and share cubes",
};

export default function Hero({
  mainText,
  subText,
}: {
  mainText: string;
  subText: string;
}) {
  return (
    <section className="flex min-h-[10rem] w-full flex-col items-center justify-center">
      <h1 className="mb-1 text-[2.5rem]">{mainText}</h1>
      <p className="text-md text-gray-600">{subText}</p>
    </section>
  );
}
