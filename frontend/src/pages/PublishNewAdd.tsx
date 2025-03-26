import axios from "axios";
import { useEffect, useState } from "react";

type Categories = {
    id : number; 
    title : string;
}

const PublishNewAdd = () => {
    const [categories, setCategories] = useState<Categories[]>([]); 
    useEffect(()=>{
        const fetchCategories = async () => {
            const result = await axios.get<Categories[]>("http://localhost:3000/categories"); 
            setCategories(result.data)
        }
        fetchCategories(); 
    },[])

    return(
        <main className="main-content">
            <h2>Publish new add! </h2>
            <div >
            <form onSubmit={(e)=> {
                // Prevent the browser from reloading the page
                e.preventDefault();

                // Read the form Data
                const form = e.target;
                const formData = new FormData(form as HTMLFormElement) ;

                const formJson = Object.fromEntries(formData.entries());
                console.log(formJson);

            }} 
            style={{display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignItems: "flex-start"}}>
            <label>Title
                <input type="text" name="title"></input>
            </label>
            <label>Description
                <textarea name="description"></textarea>
            </label>
            <label>Owner
                <input type="text" name="owner"></input>
            </label>
            <label>Price
                <input type="number" name="price"></input>
            </label>
            <label>Location
                <input type="text" name="location"></input>
            </label>
            <label>Date of creation
                <input type="date" name="createdAt"></input>
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