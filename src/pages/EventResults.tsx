import Navbar from "../components/Navigation/Navbar";
import Nights from "../components/EventResults/Nights";
import Overview from "../components/EventResults/Overview";
import Meals from "../components/EventResults/Meals";
import Footer from "../components/Footer";


const EventResults = () => {
    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <h1>Event Results Page!</h1>
        <div className=" space-y-10">
            <Overview/>
            <Nights night="dOneNight" message="Night one" />
            <Nights night="dTwoNight" message="Night two" />
            <Nights night="dThreeNight" message="Night three" />
            <div className="overflow-x-auto text-center">
                <div>
                    <h1 className="text-3xl font-bold">Meals</h1>
                </div>
                <table className="table table-zebra">
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
                            <th>Thursday July 26th, 2024</th>
                            <td></td>
                            <td></td>
                            <td><Meals meal="dOneD"/></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>Friday July 27th, 2024</th>
                            <td><Meals meal="dTwoB"/></td>
                            <td><Meals meal="dTwoL"/></td>
                            <td><Meals meal="dTwoD"/></td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>Saturday July 28th, 2024</th>
                            <td><Meals meal="dThreeB"/></td>
                            <td><Meals meal="dThreeL"/></td>
                            <td><Meals meal="dThreeD"/></td>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <th>Sunday July 29th, 2024</th>
                            <td><Meals meal="dFourB"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
    </div>
    );
};

export default EventResults;