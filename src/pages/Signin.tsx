import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch(error){
      //setError(error.message);
      setError("error on submit");
    }
  };

  const handleSignUpLink = async () =>{
    console.log("Linked clicked!");
    navigate('/signup');
   
  };

  const handleHomeLink = async () =>{
    console.log("Linked clicked!");
    navigate('/');
   
  };


    return( 
    <form onSubmit={handleSubmit}>
      {error && error}
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">APM Forever United</h1>
      <p className="py-6">Sign in to gain access to excusive features to your personalized one-stop-shop for all your post mission needs such as quick event registration, view your own personal mission history and more!</p>
    </div>
    <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign in</button>
        </div>
        <a className="link link-primary" onClick={handleSignUpLink}>Don't an Account? Sign Up</a>
        <a className="link link-primary" onClick={handleHomeLink}>Don't want an Account? Home page</a>
      </div>
    </div>
  </div>
</div>
    </form>
    
    );
};

export default Signin;