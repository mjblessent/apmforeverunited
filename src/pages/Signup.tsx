import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [mName, setMName] = useState<string>('');
  const [bDay, setBDay] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser
      console.log(user);
      console.log(bDay);
      if (user) {
        console.log("New user!");
        const userData = {
          name: fName + " " + lName,
          fName: fName.toLowerCase(),
          lName: lName.toLowerCase(),
          mName: mName,
          bDay: bDay,
          email: email,
          id: user.uid,
          admin: false,
          verified: false,
          createdAt: serverTimestamp()
        };
        const userDirectory = doc(db, 'user/' + user.uid);
        await setDoc(userDirectory, userData);
      }
      navigate('/');
    } catch {
      setError("error.message")
    }


  };

  const handleLink = async () => {
    //console.log("Linked clicked!");
    navigate('/signin');

  };

  const handleHomeLink = async () => {
    //console.log("Linked clicked!");
    navigate('/');

  };



  return (
    <form onSubmit={handleSubmit}>
      {error && error}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">APM Forever United</h1>
            <p className="py-6 px-20">Sign up to gain access to excusive features to your personalized one-stop-shop for all your post mission needs such as quick event registration, view your own personal mission history and more!
              Accounts are only for those who served in the Arizona Phoenix Mission for the Church of Jesus Christ of Latter-day Saints from July 2017 to July 2020.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                  <span className="label-text">Maiden Name</span>
                </label>
                <p className="text-sm">For Sisters, if you've changed your last name since serving</p>
                <input type="text" value={mName} onChange={(e) => setMName(e.target.value)} placeholder="Maiden Name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Birthday</span>
                </label>
                <input type="date" value={bDay} onChange={(e) => setBDay(e.target.value)} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <p className="text-center ">Upon signing up accounts will need to be verified by a System administrator before gaining full access.
                  By signing up, you consent to the storage and use of any and all information stored and linked to your account including and not limited to full name, phone number, birthday and any other information you wish to share. This information will be kept private and will only
                  be accessible to you and system admins so that they be able to contact you. This is site is not endorsed by, supported by or officially affiliated with the Church of Jesus Christ of Latter-day Saints.</p>
                <button className="btn btn-primary">Signup</button>
              </div>
              <a className="link link-primary" onClick={handleLink}>Already have an Account? Sign In</a>
              <a className="link link-primary" onClick={handleHomeLink}>Don't want an Account? Home page</a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;