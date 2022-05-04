import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <div className=" w-50 mx-auto">
      <div className="d-flex align-items-center">
        <div
          style={{ height: "1px" }}
          className="opacity-50 bg-secondary w-50"
        ></div>
        <p className="mx-2 mt-2">or</p>
        <div
          style={{ height: "1px" }}
          className="opacity-50 bg-secondary w-50"
        ></div>
      </div>

      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-outline-info mt-1 w-100 rounded-pill"
      >
        <img
          style={{ height: "30px" }}
          src="https://i.ibb.co/rmRz9g1/1.png"
          className="mx-2 rounded-circle"
          alt=""
        />
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
};

export default SocialLogin;
