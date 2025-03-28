import { useParams } from "react-router";

const SearchPage = () => {
  const { keyword } = useParams();
  console.log("keyword", keyword);
  return <p></p>;
};
export default SearchPage;