import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Categories = {
    id : number; 
    title : string;
}

type inputTypes = {
    title : string; 
    description : string ; 
    owner : string; 
    price : number; 
    picture : string; 
    location : string; 
    createdAt : Date;
    category_id : number; 
}

const PublishNewAdd = () => {
    // To show the different categories and fetch them from the BD
    const [categories, setCategories] = useState<Categories[]>([]); 
    useEffect(()=>{
        const fetchCategories = async () => {
            const result = await axios.get<Categories[]>("http://localhost:3000/categories"); 
            setCategories(result.data)
        }
        fetchCategories(); 
    },[])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<inputTypes>()
    const onSubmit: SubmitHandler<inputTypes> = (data) => console.log(data)

    const img = "https://cdn.pixabay.com/photo/2016/03/05/19/51/easter-1238537_1280.jpg"; 

    return(
        <main className="main-content">
            <h2>Publish new add! </h2>
            <div >
            <form onSubmit={handleSubmit(onSubmit)}
            style={{display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignItems: "flex-start"}}>
            <label>Title
                <input type="text" {...register("title", {required:true})}></input>
            </label>
            <label>Description
                <textarea defaultValue={"This item is the best !"}{...register("description")}></textarea>
            </label>
            <label>Owner
                <input type="text" {...register("owner", {required:true})}></input>
            </label>
            <label>Add an image
                <input type="text" defaultValue={img} {...register("picture")}></input>
            </label>
            <label>Price
                <input type="number" {...register("price", {required:true})}></input>
            </label>
            <label>Location
                <input type="text" {...register("location", {required: true})}></input>
            </label>
            <label>Date of creation
                <input type="date" {...register("createdAt", {required:true })}></input>
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