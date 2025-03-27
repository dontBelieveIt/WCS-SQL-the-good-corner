import axios from "axios";
import "../index.css"; 
import AdCard, { AdCardProps } from "./AdCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const endPoint = "http://localhost:3000" ; 

const RecentAds = () => {
  // useEffect(() => {
  //   const fetchData = async () => { 
  //     try {
  //       const result = await axios.get<AdCardProps[]>(`${endPoint}/ads`); 
  //       setAds(result.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData();
  // }, [])

  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      let url = `${endPoint}/ads`;
      if (searchParams.get("category")) {
        url += `/?category=${searchParams.get("category")}`;
      }
      const result = await axios.get(url);
      console.log(url)
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
        <div key={ad.title+i}>
          <AdCard 
            title={ad.title} 
            picture={ad.picture}
            price={ad.price}
            link={`/ads/${ad.id}`} 
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
      </div>
      )}
    </section>
  </main>
)
}
export default RecentAds 