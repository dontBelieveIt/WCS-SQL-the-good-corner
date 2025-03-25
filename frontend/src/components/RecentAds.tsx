import "../index.css"; 
import AdCard, { AdCardProps } from "./AdCard";
import { useState } from "react";

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      title: "Table",
      imgUrl: "/images/table.webp",
      price: 120,
      link: "/ads/table"
    },
    {
      title: "Dame-jeanne",
      imgUrl: "/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne"
    },
    {
      title: "Vide-poche",
      imgUrl: "/images/vide-poche.webp",
      price: 4,
      link: "/ads/vide-poche"
    },
    {
      title: "Vaisselier",
      imgUrl: "/images/vaisselier.webp",
      price: 900,
      link: "/ads/vaisselier"
    },
    {
      title: "Bougie",
      imgUrl: "/images/bougie.webp",
      price: 8,
      link: "/ads/bougie"
    },
    {
      title: "Porte-magazine",
      imgUrl: "/images/porte-magazine.webp",
      price: 45,
      link: "/ads/porte-magazine"
    }
  ];
  console.log(ads); 

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
            imgUrl={ad.imgUrl}
            price={ad.price}
            link={ad.link}/>
            <button className="button" onClick={() => {
              setTotal(total + ad.price)
            }}>Add price to cart</button>
            <button className="button" onClick={(e) => {
              e.preventDefault(); 
              removePrice(ad)}}>Remove price from cart</button>
          </div>
         
           )}
        </section>
      </main>
    )
}
export default RecentAds 