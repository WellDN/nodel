import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Signup() {
  
  const [signup, setSignup] = useState();
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState({
    inputEmail: ''
  });
  
  const [password, setPassword] = useState({
    firstPassword: '',
    confirmPassword: ''
  })

  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8)


const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
  const { value, name } = event.target;
  setPassword({
    ...password,
    [name]: value
  })
  setEmail({
    ...email
  })
}
useEffect(() => {
  setValidLength(password.firstPassword.length >= requiredLength ? true : false);
  setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
  setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
  setHasNumber(/\d/.test(password.firstPassword));
  setMatch(!!password.firstPassword && password.firstPassword === password.confirmPassword)
  setSpecialChar(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(password.firstPassword));

}, [password, requiredLength]);

  useEffect(() => {
    fetch('http://localhost:8000/signup')
    .then((res) => res.json())
    .then((data) => setSignup(data.signup))
  })

    return(
    <div className="w-full max-w-xs">
    <form
     className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
    <label
     className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputEmail">
      Email
    </label>
    <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="email-adress"
    name="email"
    type="text"
    autoComplete="email"
    placeholder="Email"
    required
    onChange={inputChange}
    />
  </div>
  <div className="mb-4">
    <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="firstPassword">
   Password
    </label>
    <input
    required
    id="password"
    name="password" 
    type="password" 
    placeholder="******************"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    onChange={inputChange}
    />
  </div>
  <div className="mb-6">
    <label 
    className="block text-gray-700 text-sm font-bold mb-2" 
    htmlFor="confirmPassword">
      Confirm Password
    </label>
    <input 
    required       
    placeholder="******************"
    id="confirmPassword"
    type="password"
    name="confirmPassword"
    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    />
    <p className="text-red-500 text-xs italic">Please confirm your password.</p>
  </div>
  <div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    id="register"
    name="type"
    value="register"
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
  const [login, setLogin] = useState();
  const [logged, isLogged] = useState(false);  
  return(  
      <>
<div className="w-full max-w-xs">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          autoComplete="email" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          name="loginPassword"
          placeholder="******************"
          autoComplete='current-password'
          required />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" role="alert">
          Login
        </button>
        <a className="pl-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          <Link className=""
            to={"/signup"}
          >
            Don't have an account?
          </Link>
        </a>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          <Link className=""
            to={"/forgot-password"}
          >
            Forgot Password?
          </Link>
        </a>
      </div>
    </form>
    </div>
    </>
    )
  }

export function Logout() {
  
  const [logout, setLogout] = useState<void>();
  
  return(
        <div>
        <button onClick={() => {}}>
            logout
            </button>
            </div>
    )
}
