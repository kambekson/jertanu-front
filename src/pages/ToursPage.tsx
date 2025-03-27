import toursHero from "../assets/toursHero.jpg"
import TourSearchBar from "../components/UI/TourSearchBar"


export default function ToursPage(){
    return(
        <div>
            <div className="relative">
                <img src={toursHero} className="h-[204px] w-full object-cover"></img>
                <div className="absolute flex flex-row inset-1 items-center justify-center">
                    <TourSearchBar/>
                </div>
            </div>
            <div className="container">
                <h1>tours</h1> 
            </div>
        </div>
    )
}