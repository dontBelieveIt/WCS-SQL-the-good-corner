import axios from "axios";
import "../index.css"; 
import AdCard, { AdCardProps } from "./AdCard";
import { useEffect, useState } from "react";

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      title: "Table",
      picture: "/images/table.webp",
      price: 120,
      link: "/ads/table"
    },
    {
      title: "Dame-jeanne",
      picture: "/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne"
    },
    {
      title: "Vide-poche",
      picture: "/images/vide-poche.webp",
      price: 4,
      link: "/ads/vide-poche"
    },
    {
      title: "Vaisselier",
      picture: "/images/vaisselier.webp",
      price: 900,
      link: "/ads/vaisselier"
    },
    {
      title: "Bougie",
      picture: "/images/bougie.webp",
      price: 8,
      link: "/ads/bougie"
    },
    {
      title: "Porte-magazine",
      picture: "/images/porte-magazine.webp",
      price: 45,
      link: "/ads/porte-magazine"
    }
  ];
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const result = await axios.get("http://localhost:3000/ads"); 
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])

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
        <div key={i+ad.title}>
          <AdCard 
            title={ad.title} 
            picture={ad.picture}
            price={ad.price}
            link={ad.link} 
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