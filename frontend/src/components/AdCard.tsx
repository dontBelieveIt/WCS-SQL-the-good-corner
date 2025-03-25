import { Link } from "react-router";
import "../index.css"; 

export type AdCardProps = {
    title:string; 
    picture: string; 
    price: number; 
    link: string;
}

const AdCard = ({title, picture, price, link} :AdCardProps) => {
    return( 
        <div className="ad-card-container">
            <Link to={link} className="ad-card-link">
              <img className="ad-card-image" src={picture} />
              <div className="ad-card-text">
                <div className="ad-card-title">{title}</div>
                <div className="ad-card-price">{price} €</div>
              </div>
            </Link>
        </div>
    )
}
export default AdCard