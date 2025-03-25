import { useParams } from "react-router"; 

const AdDetails = () => { 
    const { routeId } = useParams(); 
    
    return(
        <main className="main-content">
            <h2>This is the details about the ad {routeId} !</h2>
        </main>
    )
}
export default AdDetails