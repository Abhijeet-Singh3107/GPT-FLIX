import React, { useRef, useState } from "react";
import Header from "./Header";
import checkValidData from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { backgroundLOGO } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleClick = () => {
    // validate the form data
    checkValidData(email, password);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    // console.log(message);
    if (message) return;

    // now sign in sign up logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: "/userLogo.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  };

  const handleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0"> 
        <img
          className="h-full w-full object-cover" 
          src={backgroundLOGO}
          alt="netflix-background"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-11/12 max-w-md p-8 sm:p-12 my-24 mx-auto right-0 left-0 text-white bg-black/80 rounded-md"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text" 
            placeholder="Full Name"
            className="bg-gray-700 w-full my-2 p-4 rounded"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email or mobile Number"
          className="bg-gray-700 w-full my-2 p-4 rounded"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="bg-gray-700 w-full my-2 p-4 rounded" 
        />

        <p className="text-red-500 font-semibold text-base py-2">
          {errorMessage}
        </p>

        <button
          className="w-full bg-red-600 my-6 p-3 rounded font-bold hover:bg-red-700 transition-colors"
          onClick={handleClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-400">
          {isSignInForm ? "New to Netflix? " : "Already registered? "}
          <button
            className="text-white hover:underline"
            type="button"
            onClick={handleSignInForm}
          >
            {isSignInForm ? "Sign Up Now" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
