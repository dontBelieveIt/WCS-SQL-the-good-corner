import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "http://localhost:3000";
type Input = {
    title : string;
}

const PublishNewTagsCategories = () => {
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
      } = useForm<Input>()
    const onSubmitCategories: SubmitHandler<Input> = async (data) => {
        try {
            await axios.post(`${endPoint}/categories`, data)
            toast.success("New category has been added !" )
        } catch (error) {
            toast.error("An error occured. Try later."); 
            console.error(error); 
        }
       
    }
        
    ;   
    const onSubmitTags: SubmitHandler<Input> = async (data) =>
        await axios.post(`${endPoint}/tags`, data)
    toast.success("The new tag has been created !")
    ; 
   
    return(
        <main className="main-content">
            <h2>Add new category</h2>
            <form onSubmit={handleSubmit(onSubmitCategories)}>
                <label>New category title :
                    <input type="text" className="text-field main-search-field" {...register("title")}></input>
                </label>
                <input type="submit" className="button button-primary"></input>
            </form>
            <br></br>
            <hr></hr>
            <h2>Add new tags</h2>
            <form onSubmit={handleSubmit(onSubmitTags)}>
                <label>New tag name :
                    <input type="text" className="text-field main-search-field" {...register("title")}></input>
                </label>
                <input type="submit" className="button button-primary"></input>
            </form>
            
        </main>
    )
}
export default PublishNewTagsCategories