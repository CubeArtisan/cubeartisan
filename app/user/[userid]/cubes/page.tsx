export default function UserCubes({ params }: { params: { userid: string } }) {
  return <h1>{params.userid}'s Cubes</h1>;
}
