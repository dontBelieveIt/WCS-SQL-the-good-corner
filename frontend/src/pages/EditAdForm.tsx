import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdDetails, Category, Tag } from "../types";
import { useParams } from "react-router";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [ad, setAd] = useState<AdDetails>();
  useEffect(() => {
    const fetchCategoriesAndTagsAndAd = async () => {
      const categories = await axios.get("http://localhost:3000/categories");
      setCategories(categories.data);
      const tags = await axios.get("http://localhost:3000/tags");
      setTags(tags.data);
      const ad = await axios.get(`http://localhost:3000/ads/${id}`);
      setAd(ad.data);
    };
    fetchCategoriesAndTagsAndAd();
  }, [id]);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.put(`http://localhost:3000/ads/${id}`, data);
  };

  if (ad === undefined) {
    return <p>Loading</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={ad.title}
          {...register("title", { required: true })}
        />
      </label>

      <br />

      <label>
        Description
        <input
          defaultValue={ad.description}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={ad.owner}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={ad.location}
          {...register("location", { required: true })}
        />
      </label>

      <br />

      <label>
        Image
        <input
          defaultValue={ad.picture}
          {...register("picture", { required: true })}
        />
      </label>

      <br />

      <label>
        Prix
        <input
          type="number"
          defaultValue={ad.price}
          {...register("price", { required: true })}
        />
      </label>

      <br />

      <label>
        Categorie
        <select
          defaultValue={ad.category.id}
          {...register("category", { required: true })}
        >
          {categories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.title}
            </option>
          ))}
        </select>
      </label>

      <br />
      {tags.map((el) => (
        <div key={el.id}>
          <label>
            {el.title}
            <input
              defaultChecked={ad.tags.some((tag) => tag.id === el.id)}
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
