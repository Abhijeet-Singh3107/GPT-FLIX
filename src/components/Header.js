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
    <div className="absolute top-0 left-0 w-full px-4 py-3 bg-gradient-to-b from-black z-20 flex flex-col md:flex-row justify-between items-center overflow-x-hidden">
      {/* Logo */}
      <img
        className="w-32 md:w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="netflix-logo"
      />

      {/* User + Controls */}
      {user && (
        <div className="flex flex-row items-center gap-2 md:gap-4 mt-2 md:mt-0">
          {showGptSearch && (
            <select
              className="px-3 py-2 h-10 bg-gray-700 text-white rounded-md text-sm md:text-base"
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
            className="px-4 py-2 h-10 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition-colors text-sm md:text-base"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          <img
            className="w-10 h-10 md:w-11 md:h-11 rounded-md border border-gray-400 object-cover"
            src={user?.photoURL || "/userLogo.png"}
            alt="userLogo"
          />

          <button
            onClick={handleSignOut}
            className="px-3 py-2 h-10 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm md:text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
