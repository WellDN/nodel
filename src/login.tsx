import React from "react";
import { Link } from "react-router-dom";


export function Signup() {

    return(
    <div className="w-full max-w-xs">
    <form
     className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
    <label
     className="block text-gray-700 text-sm font-bold mb-2"
     htmlFor="name"
     >
      Username
      <sup className="text-red-200 text-xs -top-0.5 -right-1"
       title="required">*</sup>
    </label>
    <input
    className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
    id="name"
    name="name"
    type="text"
    autoComplete="username"
    placeholder="Username"
    />
  </div>
    <div className="mb-4">
    <label
     className="block text-gray-700 text-sm font-bold mb-2"
     htmlFor="email"
     >
      Email
      <sup className="text-red-200 text-xs -top-0.5 -right-1"
       title="required">*</sup>
    </label>
    <input
    className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
    id="email"
    name="email"
    type="email"
    autoComplete="on"
    placeholder="Email"
    />
  </div>
  <div className="mb-4">
    <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="password"
    >
   Password
   <sup className="text-red-200 text-xs -top-0.5 -right-1"
    title="required">*</sup>
    </label>
    <input
    id="password"
    name="password"
    type="password" 
    placeholder="******************"
    />
  </div>
  <div className="mb-6">
    <label
    className="block text-gray-700 text-sm font-bold mb-2" 
    htmlFor="passwordConfirm">
      Confirm Password
    <sup className="text-red-200 text-xs -top-0.5 -right-1"
    title="required">*</sup>
    </label>
    <input
    className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
    placeholder="******************"
    id="passwordConfirm"
    type="password"
    name="passwordConfirm"
    />
  </div>
  <div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    >
      Sign Up
    </button>
  </div>
  <div className="flex items-center justify-between">
  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
  <Link
  className=""
    to="/login"
  >
    Already have an account?
  </Link>
  </a>
 </div>
</form>
</div>
    )
}

export function Login() {


  return(
<div className="w-full max-w-xs">
    <form
      method="post"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
        className="block text-gray-700 text-sm font-bold mb-2" 
        htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          autoComplete="on"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-6">
        <label
        className="block text-gray-700 text-sm font-bold mb-2" 
        htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="******************"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
          Login
        </button>
        <a className="pl-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          <Link className=""
            to={"/signup"}
          >
            Don't have an account?
          </Link>
        </a>
      </div>
    </form>
    </div>
    )
  }


  export function Logout() {
  
  return(
        <div>
        <button onClick={() => {}}>
            logout
            </button>
            </div>
    )
}
