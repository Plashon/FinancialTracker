import React, { useState ,useEffect} from "react";

function Login  (){


  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md mb-5">
      <div className="font-bold text-3xl text-center mt-5">
        <span className="text-cyan-400 ">Login</span>
      </div>
      <label className="input input-bordered flex items-center gap-2 my-5">
        User Name
        <input
          type="text"
          className="grow"
          placeholder="ชื่อผู้ใช้"
          name="userName"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 my-5">
        Password
        <input
          type="password"
          className="grow"
          placeholder="********"
          name="password"
        />
      </label>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button className="btn btn-primary" >
          Login
        </button>
        <button className="btn btn-error" >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Login;
