import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Categories } from "../types/Categories";
import { adsTypes } from "../types/adsTypes";

const endPoint = "http://localhost:3000"; 

const PublishNewAdd = () => {
    // To show the different categories and fetch them from the BD
    const [categories, setCategories] = useState<Categories[]>([]); 
    useEffect(()=>{
        try {
            const fetchCategories = async () => {
            const result = await axios.get<Categories[]>(`${endPoint}/categories`); 
            setCategories(result.data)
        }
        fetchCategories(); 
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

    const onSubmit: SubmitHandler<adsTypes> = async (data) => await axios.post(`${endPoint}/ads`, data); 

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
            <label>Date of creation
                <input type="date" defaultValue={"01/01/2021"}{...register("createdAt", {required:true })}></input>
            </label>
            <select name="category_id">
                {categories.map(item => 
                    <option value={item.id} key={item.id}>{item.title}</option>
                )}
            </select>
        <button className="button">Submit</button>
            </form>
            </div>
        </main>
    )
}
export default PublishNewAdd;