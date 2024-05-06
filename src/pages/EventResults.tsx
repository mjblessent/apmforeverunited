import Navbar from "../components/Navigation/Navbar";
import Nights from "../components/EventResults/Nights";
import Overview from "../components/EventResults/Overview";
import Meals from "../components/EventResults/Meals";
import Footer from "../components/Footer";
import Dietary from "../components/EventResults/Dietary";
import Helpers from "../components/EventResults/Helpers";
import Attendees from "../components/EventResults/Attendees";
import MarriedCouples from "../components/EventResults/MarriedCouples";


const EventResults = () => {
    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <div className=" space-y-10">
            <Overview/>
            <Nights night="dOneNight" message="Night one" />
            <div className="overflow-x-auto text-center">
                <div>
                    <h1 className="text-3xl font-bold">Meals</h1>
                </div>
                <table className="table table-zebra border-4">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>Friday July 26th, 2024</th>
                            <td></td>
                            <td></td>
                            <td><Meals meal="dOneD"/></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>Saturday July 27th, 2024</th>
                            <td><Meals meal="dTwoB"/></td>
                            <td><Meals meal="dTwoL"/></td>
                            <td><Meals meal="dTwoD"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Dietary/>
            <Helpers item="shop" title="Shopping"/>
            <Helpers item="food" title="Food Prep"/>
            <Helpers item="clean" title="Clean Up"/>
            <Helpers item="medical" title="Medical Training"/>
            <Attendees/>
            <MarriedCouples/>
        </div>
        <Footer/>
    </div>
    );
};

export default EventResults;