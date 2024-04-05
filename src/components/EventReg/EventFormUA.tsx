import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase/config";
import Description from "./Description";
import { useNavigate } from "react-router-dom";

const EventFormUA = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [plusOne, setPlusOne] = useState<string>('noplusone');
  const [plusOneName, setPlusOneName] = useState<string>('');
  const [dOneNight, setdOneNight] = useState(false);
  const [dTwoNight, setdTwoNight] = useState(false);
  const [dThreeNight, setdThreeNight] = useState(false);
  const [dOneD, setdOneD] = useState(false);
  const [dTwoB, setdTwoB] = useState(false);
  const [dTwoL, setdTwoL] = useState(false);
  const [dTwoD, setdTwoD] = useState(false);
  const [dThreeB, setdThreeB] = useState(false);
  const [dThreeL, setdThreeL] = useState(false);
  const [dThreeD, setdThreeD] = useState(false);
  const [dFourB, setdFourB] = useState(false);
  const [dietary, setDietary] = useState<string>('');
  const [medical, setMedical] = useState<string>('no');
  const [food, setFood] = useState<string>('no');
  const [clean, setClean] = useState<string>('no');
  const [shop, setShop] = useState<string>('no');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
        const fileId = uuidv4();
        const formData = {
            fName: fName.toLowerCase(),
            lName: lName.toLowerCase(),
            email: email,
            plusOne: plusOne,
            plusOneName: plusOneName,
            dOneNight: dOneNight,
            dTwoNight: dTwoNight,
            dThreeNight: dThreeNight,
            dOneD: dOneD,
            dTwoB: dTwoB,
            dTwoL: dTwoL,
            dTwoD: dTwoD,
            dThreeB: dThreeB,
            dThreeL: dThreeL,
            dThreeD: dThreeD,
            dFourB: dFourB,
            dietary: dietary,
            medical: medical,
            food: food,
            clean: clean,
            shop: shop,
            createdAt: serverTimestamp()
        };

        const formDirectory = doc(db, 'submissions/' + fileId);
        await setDoc(formDirectory,formData);
        navigate('/');
    } catch(error){
      //setError(error.message);
      setError("error on submit");
    }
  };

    return( 
    <form onSubmit={handleSubmit} className="w-fit max-h-fit mx-auto">
        {error && error}
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <Description />
                <div className="card sm:max-w-lg shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="First Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
                        </div>
                        <label className="form-control w-full max-w-xs" >
                            <div className="label">
                                <span className="label-text">If you are bringing a plus one, please specify if you are married or significant other. Otherwise, select No plus one</span>
                            </div>
                            <select className="select select-bordered" value={plusOne} onChange={(e) => setPlusOne(e.target.value)}>
                                <option value={"noplusone"}>No Plus one</option>
                                <option value={"spouse"}>Spouse</option>
                                <option value={"signifcantother"}>Signifcant other</option>
                            </select>
                        </label>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Plus One Name</span>
                            </label>
                            <input type="text" value={plusOneName} onChange={(e) => setPlusOneName(e.target.value)} placeholder="Plus One Name" className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <ul>
                            <span className="label-text">Do you plan on staying the night? Select nights you plan to stay</span>
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Thursday July 26th, 2024</span> 
                                        <input type="checkbox" checked={dOneNight} onChange={() => setdOneNight(!dOneNight)} className="checkbox checkbox-primary" />
                                    </label>
                                </li>
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Friday July 27th, 2024</span> 
                                        <input type="checkbox" checked={dTwoNight} onChange={() => setdTwoNight(!dTwoNight)} className="checkbox checkbox-primary" />
                                    </label>
                                </li>
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Saturday July 28th, 2024</span> 
                                        <input type="checkbox" checked={dThreeNight} onChange={() => setdThreeNight(!dThreeNight)} className="checkbox checkbox-primary" />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="overflow-x-auto">
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
                                        <td><input type="checkbox" className="checkbox checkbox-primary" disabled /></td>
                                        <td><input type="checkbox" className="checkbox checkbox-primary" disabled/></td>
                                        <td><input type="checkbox" checked={dOneD} onChange={() => setdOneD(!dOneD)} className="checkbox checkbox-primary" /></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <th>Friday July 27th, 2024</th>
                                        <td><input type="checkbox" checked={dTwoB} onChange={() => setdTwoB(!dTwoB)} className="checkbox checkbox-primary" /></td>
                                        <td><input type="checkbox" checked={dTwoL} onChange={() => setdTwoL(!dTwoL)} className="checkbox checkbox-primary" /></td>
                                        <td><input type="checkbox" checked={dTwoD} onChange={() => setdTwoD(!dTwoD)} className="checkbox checkbox-primary" /></td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr>
                                        <th>Saturday July 28th, 2024</th>
                                        <td><input type="checkbox" checked={dThreeB} onChange={() => setdThreeB(!dThreeB)} className="checkbox checkbox-primary" /></td>
                                        <td><input type="checkbox" checked={dThreeL} onChange={() => setdThreeL(!dThreeL)} className="checkbox checkbox-primary" /></td>
                                        <td><input type="checkbox" checked={dThreeD} onChange={() => setdThreeD(!dThreeD)} className="checkbox checkbox-primary" /></td>
                                    </tr>
                                    {/* row 4 */}
                                    <tr>
                                        <th>Sunday July 29th, 2024</th>
                                        <td><input type="checkbox" checked={dFourB} onChange={() => setdFourB(!dFourB)} className="checkbox checkbox-primary" /></td>
                                        <td><input type="checkbox" className="checkbox checkbox-primary" disabled/></td>
                                        <td><input type="checkbox" className="checkbox checkbox-primary" disabled/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Any dietary restrictions?</span>
                            </label>
                            <input type="text" value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder="Dietary restrictions" className="input input-bordered"/>
                        </div>
                        <label className="form-control w-full max-w-xs" >
                            <div className="label">
                                <span className="label-text">If you have medical training, would you be willing to provide basic medical assistence during the planning and the event itself, such as with first aid or medical opinion.</span>
                            </div>
                            <select className="select select-bordered" value={medical} onChange={(e) => setMedical(e.target.value)}>
                                <option value={"no"}>No medical training / not wanting to assist</option>
                                <option value={"yes"}>Medically trained / willing to assist</option>
                            </select>
                        </label>
                        <div>
                            <div className="label">
                                <span className="label-text">Would you be willing to help with the Food Preparations? Which could include setting out food and simple cooking tasks </span>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Yes, wiling and able to help</span> 
                                    <input type="radio"  value="yes" onChange={(e) => setFood(e.target.value)} name="radio-1" className="radio radio-primary"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">No, not wiling or able to help</span> 
                                    <input type="radio"  value="no" onChange={(e) => setFood(e.target.value)} name="radio-1" className="radio radio-primary"/>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">Would you be willing to help with clean up? Which could includes cleaning up after meals and around the cabin after the event </span>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Yes, wiling and able to help</span> 
                                    <input type="radio"  value="yes" onChange={(e) => setClean(e.target.value)} name="radio-2" className="radio radio-primary"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">No, not wiling or able to help</span> 
                                    <input type="radio"  value="no" onChange={(e) => setClean(e.target.value)} name="radio-2" className="radio radio-primary"/>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">Would you be willing to help shop before the event? Which could involve setting up a time days before the event to go grocery shopping with Sister Collins</span>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Yes, wiling and able to help</span> 
                                    <input type="radio"  value="yes" onChange={(e) => setShop(e.target.value)} name="radio-3" className="radio radio-primary"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">No, not wiling or able to help</span> 
                                    <input type="radio"  value="no" onChange={(e) => setShop(e.target.value)} name="radio-3" className="radio radio-primary"/>
                                </label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

);
};

export default EventFormUA;