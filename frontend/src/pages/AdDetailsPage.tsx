import { useParams } from "react-router"; 

const AdDetailsPage = () => { 
    const { routeId } = useParams(); 
    const img = "https://cdn.pixabay.com/photo/2016/03/05/19/51/easter-1238537_1280.jpg"
    
    return(
        <main className="main-content">
            <h2>This is the details about the ad {routeId} !</h2>
            <img style={{width: "70%"}} src={img} alt="illustration"/>
        </main>
    )
}
export default AdDetailsPage ;