import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Signup() {
  
  const [signup, setSignup] = useState();

  const [email, setEmail] = useState({
    email: ''
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
  const [ispecialChar, isetSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8)


const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
  const { value, name } = event.target;
  setPassword({
    ...password,
    [name]: value
  })

  setEmail({
    ...email,
    [name]: value
  })
}
useEffect(() => {
  setValidLength(password.firstPassword.length >= requiredLength ? true : false);
  setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
  setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
  setHasNumber(/\d/.test(password.firstPassword));
  setMatch(!!password.firstPassword && password.firstPassword === password.confirmPassword)
  setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword));
  isetSpecialChar(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.email))
}, [password, requiredLength, email]);

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
     className="block text-gray-700 text-sm font-bold mb-2"
     htmlFor="inputEmail"
     >
      Email
      <sup className="text-red-300 text-xs -top-0.5 -right-2"
       title="required">*</sup>
    </label>
    <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="inputEmail"
    name="email"
    type="text"
    autoComplete="on"
    placeholder="Email"
    required
    onChange={inputChange}
    />
  </div>
  <div className="mb-4">
    <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="firstPassword"
    >
   Password
   <sup className="text-red-300 text-xs -top-0.5 -right-2"
    title="required">*</sup>
    </label>
    <input
    required
    id="confirmPassword"
    name="firstPassword"
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
    <sup className="text-red-300 text-xs -top-0.5 -right-2"
    title="required">*</sup>
    </label>
    <input
    onChange={inputChange}
    required       
    placeholder="******************"
    id="confirmPassword"
    type="password"
    name="confirmPassword"
    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    />
    <p className="text-gray-500 text-xs italic">Please confirm your password.</p>
    <ul>
            <li>
              Valid Length: {validLength ? <span>True</span> : <span>False</span>}
            </li>
            <li>
              Has a Number: {hasNumber ? <span>True</span> : <span>False</span>}
            </li>
            <li>
              UpperCase: {upperCase ? <span>True</span> : <span>False</span>}
            </li>
            <li>
              LowerCase: {lowerCase ? <span>True</span> : <span>False</span>}
            </li>
            <li>Match: {match ? <span>True</span> : <span>False</span>}</li>
            <li>
              Special Character: {specialChar ? <span>True</span> : <span>False</span>}
            </li>
            <li>
              Special Email Character: {ispecialChar ? <span>True</span> : <span>False</span>}
            </li>
          </ul>
  </div>
  <div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    id="signup"
    name="type"
    value="signup"
    disabled={ !email || !password || !match ? true : false }
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
        <label
        className="block text-gray-700 text-sm font-bold mb-2" 
        htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          autoComplete="on" />
      </div>
      <div className="mb-6">
        <label 
        className="block text-gray-700 text-sm font-bold mb-2" 
        htmlFor="password"
        >
          Password
        </label>
        <input className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          name="loginPassword"
          placeholder="******************"
          required />
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
