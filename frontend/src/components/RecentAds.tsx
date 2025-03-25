import { useParams } from "react-router";
import "../index.css"; 
import AdCard, { AdCardProps } from "./AdCard";

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
    return( 
      <main className="main-content">
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {ads.map((ad, i) => 
            <AdCard 
            key={i+ad.title}
            title={ad.title} 
            imgUrl={ad.imgUrl}
            price={ad.price}
            link={ad.link}/>
           )}
        </section>
      </main>
    )
}
export default RecentAds 