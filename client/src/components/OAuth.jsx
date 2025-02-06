import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const res_Google = await signInWithPopup(auth, provider);
      console.log(res_Google);
      const res = await fetch(`/api/auth/google`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: res_Google.user.displayName,
          email: res_Google.user.email,
          pic: res_Google.user.photoURL,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleAuth}
        className=" my-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <i className="mr-1 fa-brands fa-google"></i>Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
