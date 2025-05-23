import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Categories } from "../types/Categories";
import { adsTypes } from "../types/adsTypes";
import { Link } from "react-router";
import { Tags } from "../types/Tags";
import { toast } from "react-toastify";
import endPoint from "../../endPoint";

const PublishNewAdd = () => {
    // To show the different categories and fetch them from the BD
    const todayDate = new Date("2015-03-25");
    const [categories, setCategories] = useState<Categories[]>([]);     
    const [tags, setTags] = useState<Tags[]>([]); 
    useEffect(()=>{
        try {
            const fetchCategoriesAndTags = async () => {
                // fetch categories from DB
                    const CategorieResult = await axios.get<Categories[]>(`${endPoint}/categories`); 
                    setCategories(CategorieResult.data); 
                // fetch tags from DB
                    const TagsResult = await axios.get<Tags[]>(`${endPoint}/tags`); 
                    setTags(TagsResult.data); 
            }

        fetchCategoriesAndTags(); 
        } catch (error) {
            console.error(error); 
        }
        

    },[])
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
      } = useForm<adsTypes>()

    const onSubmit: SubmitHandler<adsTypes> = async (data) => {
        try {
            await axios.post(`${endPoint}/ads`, data)
            console.log(data)
            toast.success("New add created !")
        } catch (error) {
            console.error(error); 
            toast.error("Oups, an error occured.");
        }

    } ; 

    const img = "https://cdn.pixabay.com/photo/2016/03/05/19/51/easter-1238537_1280.jpg"; 

    return(
        <main className="main-content">
            <h2>Publish new add! </h2>
            <div >
            <form onSubmit={handleSubmit(onSubmit)}
            style={{display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignItems: "flex-start"}}>
            <label>Title
                <input type="text" defaultValue={"New add"}{...register("title", {required:true})}></input>
            </label>
            <label>Description
                <textarea defaultValue={"This smiling rock is the best !"}{...register("description")}></textarea>
            </label>
            <label>Owner
                <input type="text" defaultValue={"Jay Doe"}{...register("owner", {required:true})}></input>
            </label>
            <label>Add an image
                <input type="text" defaultValue={img} {...register("picture")}></input>
            </label>
            <label>Price
                <input type="number" defaultValue={12}{...register("price", {required:true})}></input>
            </label>
            <label>Location
                <input type="text" defaultValue={"Neverland"}{...register("location", {required: true})}></input>
            </label>
            <select name="category_id">
                {categories.map(item => 
                    <option value={item.id} key={item.id}>{item.title}</option>
                )}
            </select>
            <fieldset>
                <legend>Tags</legend>
                {tags.map((tag)=> 
                <div key={tag.id}>
                {/* <input value={tag.id} type="checkbox" {...register("tags")}/> */}
                <label htmlFor={tag.title}>{tag.title}</label>
                </div>
                )}
                
                </fieldset>
        <button className="button">Submit</button>
            </form>
            <Link to="categories-and-tags">Or, you can add a new category or new tags</Link>
            </div>
        </main>
    )
}
export default PublishNewAdd;