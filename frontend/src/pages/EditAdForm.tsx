import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useCreateAdMutation, useGetAdQuery, useGetAllCategoriesQuery } from "../generated/graphql-types";
import NoPageFound from "./NoPageFound";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: number;
  tags: string[];
};

const EditAdForm = () => {
  const { id } = useParams();
  const { data : adData, loading : adLoading, error : adError } = useGetAdQuery({
    variables: { getAdId: Number(id)},
  })
  const { data : categoriesData, loading : categoriesLoading, error : categoriesError} = useGetAllCategoriesQuery()

  const [createAd, {data : createAdData, loading : createAdLoading, error : createAdError}] = useCreateAdMutation()

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = async (formData: Inputs) => {
    try {
      await createAd({
        variables: {
          data: {
            ...formData, 
            price: Number(formData.price),
            category: Number(formData.category), 
            tags: formData.tags.map(Number),
          }
        }
      })
    } catch (error) {
      console.error(error); 
    }
  }


  if (adLoading || categoriesLoading || createAdLoading) return <p>Loading</p>; 
  if (adError || categoriesError || createAdError) return <><NoPageFound /></>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={adData?.getAd.title}
          {...register("title", { required: true })}
        />
      </label>

      <br />

      <label>
        Description
        <input
          defaultValue={adData?.getAd.description}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={adData?.getAd.owner}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={adData?.getAd.location}
          {...register("location", { required: true })}
        />
      </label>

      <br />

      <label>
        Image
        <input
          defaultValue={adData?.getAd.picture}
          {...register("picture", { required: true })}
        />
      </label>

      <br />

      <label>
        Prix
        <input
          type="number"
          defaultValue={adData?.getAd.price}
          {...register("price", { required: true })}
        />
      </label>

      <br />

      <label>
        Categorie
        <select
          defaultValue={adData?.getAd.category.id}
          {...register("category", { required: true })}
        >
          {categoriesData?.getAllCategories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.title}
            </option>
          ))}
        </select>
      </label>

      <br />
      {adData?.getAd.tags.map((el) => (
        <div key={el.id}>
          <label>
            {el.title}
            <input
              defaultChecked={adData?.getAd.tags.some((tag) => tag.id === el.id)}
              value={el.id}
              type="checkbox"
              {...register("tags")}
            />
          </label>
        </div>
      ))}

      <input type="submit" />
    </form>
  );
};
export default EditAdForm;
