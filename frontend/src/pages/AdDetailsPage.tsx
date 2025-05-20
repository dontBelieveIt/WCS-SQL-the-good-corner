import { useNavigate, useParams } from "react-router";
import NoPageFound from "./NoPageFound";
import { toast } from "react-toastify";
import { useDeleteAdMutation, useGetAdQuery } from "../generated/graphql-types";

const AdDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deleteAd] = useDeleteAdMutation({
    variables: { deleteAdId: Number(id) },
  });

  const { data, loading, error} = useGetAdQuery({
    variables: { getAdId: Number(id) },
  });

  if (loading) return <><NoPageFound /></>;
  if (error) return <p>Oups, something unexpected happened.</p>;

  return (
    <main className="main-content">
      <h2 className="ad-details-title">{data?.getAd.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={data?.getAd.picture} />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{data?.getAd.price} €</div>
          <div className="ad-details-description">{data?.getAd.description}</div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Ad published by <b>{data?.getAd.owner}</b> the {new Date(data?.getAd.createdAt).toLocaleDateString()} at {" "}
            {new Date(data?.getAd.createdAt).toLocaleTimeString()}.
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
        <div>
          <button className="button" onClick={async () => {
            try {
              await deleteAd({ variables: { deleteAdId: Number(id) } });
              navigate("/");
              toast.success("Ad has been deleted !");
            } catch (error) {
              console.error(error);
              toast.error("Ad couldn't be deleted.")
            }
          }}>Delete add</button>
        </div>
      </section>
    </main>
  )
}
export default AdDetailsPage