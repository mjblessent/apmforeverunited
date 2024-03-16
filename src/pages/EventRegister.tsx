import Navbar from "../components/Navigation/Navbar";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const EventRegister = () => {
    //const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [plusOne, setPlusOne] = useState<string>('noplusone');
  const [plusOneName, setPlusOneName] = useState<string>('');
  const [dietary, setDietary] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
        const formData = {
            fName: fName,
            lName: lName,
            email: email,
            plusOne: plusOne,
            plusOneName: plusOneName,
        };
        console.log(formData);
    } catch(error){
      setError(error.message)
    }
  };


    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <h1>Register for event!</h1>
        <form onSubmit={handleSubmit}>
            {error && error}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Mission reunion!</h1>
                        <p className="py-6">Details for the reunion</p>
                    </div>
                    <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
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
                                    <span className="label-text">If you have a plus one, please specify if you are married or significant other. Otherwise, select No plus one</span>
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
                                <label className="label">
                                    <span className="label-text">Any dietary restrictions?</span>
                                </label>
                                <input type="text" value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder="Dietary restrictions" className="input input-bordered"/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
};

export default EventRegister;