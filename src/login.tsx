import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useActionData } from '@remix-run/react'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ActionFunction, json } from "@remix-run/node";


const createUserSchema = z
  .object({
      name: z.string().min(1, { message: 'Name is required' }),
      email: z.string().min(1, { message: 'Email is required' }).email(
        'Invalid email'
        ),
        password: z.string().min(1, { message: 'Password is required' })
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
      passwordConfirm: z.string().min(1, { message: 'Please confirm your password' }),
      terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept Terms and Conditions" }),
      }),
    }).refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    })
    
type ICreateUserInput = z.infer<typeof createUserSchema>;


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
      <sup className="text-red-200 text-xs -top-0.5 -right-1"
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
    placeholder="Username"
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
     htmlFor="email"
     >
      Email
      <sup className="text-red-200 text-xs -top-0.5 -right-1"
       title="required">*</sup>
    </label>
    <input
    {...register("email")}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    ${errors.email && "border-red-500"}
    rounded appearance-none focus:outline-none focus:shadow-outline`}
    id="email"
    name="email"
    type="email"
    autoComplete="on"
    placeholder="Email"
    />
    {errors.email && (
      <p className="text-xs italic text-red-500 mt-2">
        {errors.email?.message}
      </p>
    )}
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
    {...register("password")}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    ${errors.password && "border-red-500"}
    rounded appearance-none focus:outline-none focus:shadow-line`}
    id="password"
    name="password"
    type="password" 
    placeholder="******************"
    />
    {errors.password && (
      <p className="text-xs italic text-red-500 mt-2">
        {errors.password?.message}
      </p>
    )}
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
    {...register("passwordConfirm")}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    ${errors.passwordConfirm && "border-red-500"}
    rounded appearance-none focus:outline-none focus:shadow-line`}
    placeholder="******************"
    id="passwordConfirm"
    type="password"
    name="passwordConfirm"
    />
    {errors.passwordConfirm && (
      <p className="text-xs italic text-red-500 mt-2">
        {errors.passwordConfirm?.message}
      </p>
    )}
  </div>
  <div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    >
      Sign Up
    </button>
  </div>
  <div className="mb-4">
        <input type="checkbox" id="terms" {...register("terms")} />
        <label
          htmlFor="terms"
          className={`ml-2 mb-2 text-sm font-bold ${
            errors.terms ? "text-red-500" : "text-gray-700"
          }`}
        >
          Accept Terms & Conditions
        </label>
        {errors.terms && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.terms?.message}
          </p>
        )}
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


type inferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
  formErrors: U[];
  fieldErrors: {
    [P in keyof z.infer<T>]?: U[];
  };
};

const LoginFields = z
.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type LoginFields = z.infer<typeof LoginFields>;
type LoginFieldsErrors = inferSafeParseErrors<typeof LoginFields>;

type ActionData = {
  fields: LoginFields;
  errors?: LoginFieldsErrors;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData.entries()) as LoginFields;
  const result = LoginFields.safeParse(fields);
  if (!result.success) {
    return badRequest({
      fields,
      errors: result.error.flatten(),
    });
  }
  return json({ fields });
};


export function Login() {

  let data = useActionData<ActionData>();

  return(  
      <>
<div className="w-full max-w-xs">
    <Form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          defaultValue={data?.fields.email}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${data?.errors?.fieldErrors.email && 'border-red-500'}`}
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
          defaultValue={data?.fields.password}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${data?.errors?.fieldErrors.password && 'border-red-500'}`}
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
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          <Link className=""
            to={"/forgot-password"}
          >
            Forgot Password?
          </Link>
        </a>
      </div>
    </Form>
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
