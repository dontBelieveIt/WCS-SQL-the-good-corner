import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AdCard, { AdCardProps } from "../components/AdCard";
import { endPoint } from "../endPoint";
import axios from "axios";

const SearchPage = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>([]); 
  useEffect(()=>{
    const fetchAds = async () => {
        const result = await axios.get(`${endPoint}/ads/:search=${keyword}`); 
        setAds(result.data);
    }
    fetchAds(); 
  },[keyword])
  console.log("keyword", keyword);
  return (
    <section className="recent-ads">
        {ads.map((ad) => 
            <Link key={ad.id} to={`/ads/${ad.id}`}>
                <AdCard picture={ad.picture} title={ad.title} price={ad.price} />
            </Link>
        )}
    </section>
  );
};
export default SearchPage;