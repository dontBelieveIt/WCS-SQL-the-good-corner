import { useParams } from "react-router"; 
import { endPoint } from "../endPoint";

import { useEffect, useState } from "react";
import axios from "axios";
import NoPageFound from "./NoPageFound";

type thisAdTypes = {
  id : number; 
  title : string; 
  description : string ; 
  owner : string; 
  price : number; 
  picture : string; 
  location : string; 
  createdAt : Date;
  category_id : number; 
}

const AdDetailsPage = () => { 
  const { id } = useParams(); 
  const [ thisAd, setThisAd] = useState<thisAdTypes>(); 
  useEffect(() => {
  const fetchData = async () => { 
    try {
      const result = await axios.get(`${endPoint}/ads/${id}`); 
      setThisAd(result.data)
    } catch (error) {
      console.error(error)
    }
  }
    fetchData();
  }, [id])
  // const ad = thisAd.find((ad)=> ad.id === id);
  if (!thisAd) {
    return (
      <NoPageFound />
    )
  } else {
    document.title = `The Good Corner - ${thisAd.title}`
    
    return(
        <main className="main-content">
  <h2 className="ad-details-title">{thisAd.title}</h2>
            <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={thisAd.picture}/>
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{thisAd.price} €</div>
          <div className="ad-details-description">{thisAd.description}</div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Ad published by <b>{thisAd.owner}</b> the {new Date(thisAd.createdAt).toLocaleDateString()} at {" "}
            {new Date(thisAd.createdAt).toLocaleTimeString()}.
          </div>
          <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
            ><svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
            >
              <path
                d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
              ></path>
            </svg>
            Envoyer un email</a>
        </div>
      </section>
        </main>
    )
}}
export default AdDetailsPage