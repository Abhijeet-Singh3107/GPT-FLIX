import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // toggle GPT search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center">
      {/* Gradient background */}
      <div className="absolute inset-0 h-20 bg-gradient-to-b from-black/70 to-transparent"></div>

      {/* Logo */}
      <div className="relative px-8 py-2">
        <img className="w-44" src={LOGO} alt="netflix-logo" />
      </div>

      {/* User + Sign Out */}
      {user && (
        <div className="relative flex items-center gap-4 px-8">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-500 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-700 transition-colors"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 rounded-md border border-gray-400"
            src={user?.photoURL || "/userLogo.png"}
            alt="userLogo"
          />
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
