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
    if (message) return; // stop the execution here only...

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
      <div className="absolute">
        <img
          src= {backgroundLOGO}
          alt="netflix-background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="Name"
            placeholder="Full Name"
            className="bg-[rgb(21,18,19)] w-full my-4 p-4"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email or mobile Number"
          className="bg-[rgb(21,18,19)] w-full my-4 p-4"
        />

        <input
          ref={password}
          type="password"
          placeholder="password"
          className="bg-[rgb(21,18,19)] w-full my-4 p-4"
        />

        <p className="text-red-500 font-semibold text-lg py-2">
          {errorMessage}
        </p>

        <button className="w-full bg-red-700 my-6 p-2" onClick={handleClick}>
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
