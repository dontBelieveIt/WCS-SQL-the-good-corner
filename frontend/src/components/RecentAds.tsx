import AdCard from "./AdCard";
import { Link } from "react-router";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const RecentAds = () => {
  const { data, loading, error } = useGetAllAdsQuery();
  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;

  return (
    <>
      <h2>Annonces récentes ({data?.getAllAds.length})</h2>
      <section className="recent-ads">
        {data?.getAllAds.map((el) => (
          <Link key={el.id} to={`/ads/${el.id}`}>
            <AdCard picture={el.picture} title={el.title} price={el.price} />
          </Link>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
