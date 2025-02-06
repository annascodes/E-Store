import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'


const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const handleForm=(e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
  }
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(formData)
    try {
        dispatch(signInStart())
        const res= await fetch(`/api/auth/signin`,
        {
          method:'post',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(formData)
        })
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
          dispatch(signInFailure(data.message))
        }else{
          console.log(data)
          dispatch(signInSuccess(data))
          navigate('/')

        }
    } catch (error) {
      console.log(error.message)
      dispatch(signInFailure(error.message))
    }
    
  }
  return (
    <div className="">
      <form className="relative mt-20   max-w-md mx-auto p-5">
        <h1 className=" absolute top-10 -left-48 text-green-500  text-5xl font-extrabold tracking-tighter -rotate-45  opacity-50  ">
          Family Member!
        </h1>
        <h1 className=" absolute top-10 -left-44 text-black-500  text-5xl font-extrabold tracking-tighter -rotate-45  opacity-50  ">
          Family Member!
        </h1>
        <h1 className=" absolute top-10 -left-40 text-red-500  text-5xl font-extrabold tracking-tighter -rotate-45     ">
          Family Member!
        </h1>
        <h1 className=" text-green-500  text-center font-extrabold text-3xl my-5 tracking-tighter ">
          Sign In
        </h1>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={handleForm}
            type="text"
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={handleForm}
            type="password"
            name="password"
            id="pass"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="pass"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <OAuth/>
      </form>
    </div>
  );
}

export default SignIn
