import axios from "axios";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import AdCard, { AdCardProps } from "../components/AdCard";

const SearchPage = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchAds = async () => {
      const result = await axios.get(
        `http://localhost:3000/ads?search=${keyword}`
      );
      console.log("result", result);
      setAds(result.data);
    };
    fetchAds();
  }, [keyword]);
  return (
    <section className="recent-ads">
      {ads.map((ad) => (
        <Link key={ad.id} to={`/ads/${ad.id}`}>
          <AdCard picture={ad.picture} price={ad.price} title={ad.title} />
        </Link>
      ))}
    </section>
  );
};
export default SearchPage;
