import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const handleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_large.jpg"
          alt="netflix-background"
        />
      </div>
      <form className="absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        
        {!isSignInForm && (
          <input
            type="Name"
            placeholder="Full Name"
            className="bg-[rgb(21,18,19)] w-full my-4 p-4"
          />
        )}

        <input
          type="email"
          placeholder="Email or mobile Number"
          className="bg-[rgb(21,18,19)] w-full my-4 p-4"
        />

        <input
          type="password"
          placeholder="password"
          className="bg-[rgb(21,18,19)] w-full my-4 p-4"
        />

        <button className="w-full bg-red-700 my-6 p-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <button className="py-4" type="button" onClick={handleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
