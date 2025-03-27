import axios from "axios";
import "../index.css"; 
import AdCard, { AdCardProps } from "./AdCard";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { endPoint } from "../endPoint";


const RecentAds = () => {

  const [ads, setAds] = useState<adsTypes[]>([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      let url = `${endPoint}/ads`;
      if (searchParams.get("category")) {
        url += `/?category=${searchParams.get("category")}`;
      }
      const result = await axios.get(url);
      setAds(result.data);
    }
    fetchData();
  }, [searchParams]);

  const [total, setTotal] = useState(0); 
  const removePrice = (ad:AdCardProps) => {
    if (total < ad.price) {
      setTotal(0)
    } else {
      setTotal(total - ad.price)
    }
  }
return( 
  <main className="main-content">
    <h2>Annonces récentes</h2>
    <h3>Total in cart : {total} €</h3>
    <section className="recent-ads">
      {ads.map((ad, i) => 
        <Link to={`/ads/${ad.id}`} key={ad.title+i} className="ad-card-link">
          <AdCard 
            title={ad.title} 
            picture={ad.picture}
            price={ad.price}
          />
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <button 
            className="button button-primary" 
            onClick={() => {
              setTotal(total + ad.price)
            }}>
          Add to cart
          </button>
          <button 
          className="button" 
          onClick={(e) => {
            e.preventDefault(); 
            removePrice(ad)
          }}>
            Remove from cart
          </button>
        </div>
      </Link>
      )}
    </section>
  </main>
)
}
export default RecentAds 