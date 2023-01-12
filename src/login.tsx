import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, z } from "zod";

  const createUserSchema = object({
    
      name: string({ required_error: 'Name is required' }),
      email: string({ required_error: 'Email is required' }).email(
        'Invalid email'
        ),
        password: string({ required_error: 'Password is required' })
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
      passwordConfirm: string({ required_error: 'Please confirm your password' }),
    }).refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    })
    
    
  const loginUserSchema = object({
      
      email: string({ required_error: 'Email is required' }).email(
        'Invalid email or password'
        ),
      password: string({ required_error: 'Password is required' }).min(
        8,
        'Invalid email or password'
      ),
    })
    
    type ICreateUserInput = z.infer<typeof createUserSchema>;
    type ILoginUserInput = z.infer<typeof loginUserSchema>;

    
  export function Signup() {
  
  const [signup, setSignup] = useState(false);

useEffect(() => {
  fetch('http://localhost:8000/signup')
  .then((res) => res.json())
  .then((data) => setSignup(data.signup))
})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<ICreateUserInput> = (data) => console.log(data);

    return(
    <div className="w-full max-w-xs">
    <form
    onSubmit={handleSubmit(onSubmit)}
     className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
    <label
     className="block text-gray-700 text-sm font-bold mb-2"
     htmlFor="name"
     >
      Username
      <sup className="text-red-300 text-xs -top-0.5 -right-2"
       title="required">*</sup>
    </label>
    <input
    {...register("name")}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    ${errors.name && "border-red-500"}
    rounded appearance-none focus:outline-none focus:shadow-outline`}
    id="name"
    name="name"
    type="text"
    autoComplete="username"
    placeholder="name"
    required
    />
    {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.name?.message}
            </p>
          )}
  </div>
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
    {...register("email")}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="inputEmail"
    name="email"
    type="text"
    autoComplete="on"
    placeholder="Email"
    required
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
    required       
    placeholder="******************"
    id="confirmPassword"
    type="password"
    name="confirmPassword"
    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    />
    <p className="text-gray-500 text-xs italic">Please confirm your password.</p>
  </div>
  <div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    id="signup"
    name="type"
    value="signup"
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
