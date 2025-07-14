import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Loginhook from './Loginhook';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../services/Apicall';
import { useNavigate } from "react-router-dom";


export default function Login() {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errrorMessage, setErrormessage] = useState();
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2)

  }
  const handeLogin = async (e) => {

    e.preventDefault();
    console.log("login")
    try {
      const loginresponse = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      console.log("loginresponse", loginresponse)

      const responseData = await loginresponse.json(); // parse the JSON

      if (loginresponse.status === 200 || loginresponse.status === 201) {

        alert(responseData.message || "login successful!");
        localStorage.setItem("token", responseData.accessToken)
        localStorage.setItem("user", JSON.stringify(responseData.user))
        navigate("/");
        window.location.reload();
      } else if (loginresponse.status === 400) {
        alert(responseData.message , "Please try again");
        setStep(1)
        setErrormessage(responseData.message)
      } else {
        setErrormessage("login failed. Please try again.");
      }

    } catch (err) {
      alert(`Error : ${err.message}`)
    }


  }

  const resetPass = (e) => {
    e.preventDefault();

  }


  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <section className="block sm:flex bg-white rounded-2xl shadow-md sm:max-w-6xl h-96">
        <article className='w-1/2 m-5'>
          {
            step === 1 && (
              <div className='m-4'>
                <FcGoogle className="text-2xl" size={50} />
                <p className='text-4xl mt-3 font-semibold'>Sign in</p>
                <h2 className='mt-4'>
                  with your Google Account to continue to <span className='text-red-600'>YouTube Clone</span> . This account will be available to other Google apps in the browser.
                </h2>
              </div>
            )
          }

          {
            step === 2 && (
              <div className='m-4'>
                <FcGoogle className="text-2xl m-2" size={50} />
                <h1 className='text-4xl font-semibold m-2'>Welcome</h1>
                <h2 className='mt-3.5 border rounded-2xl inline-block p-2'>{email}</h2>
                <h2 className='mt-4'>
                  with your Google Account to continue to <span className='text-red-600'>YouTube Clone</span> . This account will be available to other Google apps in the browser.
                </h2>
              </div>
            )
          }

        </article>




        <article>


          <form onSubmit={step === 1 ? handleNext : handeLogin}>

            {
              step === 1 && (
                <div className='m-4'>

                  <div className='mt-20'>
                    <input type="text" placeholder='Enter Your Email ' value={email} onChange={(e) => {setEmail(e.target.value) ,setErrormessage("")}} required
                      className='w-full border border-blue-500 rounded p-2'
                    />
                    <p className='text-red-700'>{errrorMessage}</p>

                    <h4 className='text-blue-700 mt-2 font-semibold'>Forget email?</h4>

                  </div>

                  <div className='mt-6 text-sm'>
                    <p>Not your computer? Use Guest mode to sign in privately.
                      <a href="https://support.google.com/chrome/answer/6130773?hl=en" target='blank' className='text-blue-500 font-semibold'>Learn more about using Guest mode</a></p>
                  </div>

                  <div className='mt-20 flex justify-end '>
                    <Link to={"/register"} className='text-blue-500 mr-5 font-bold'>
                      Create account
                    </Link>
                    <button type='submit' className='bg-blue-600 text-white p-2.5 rounded-l-2xl rounded-r-2xl w-1/6 font-bold'>
                      Next
                    </button>
                  </div>
                </div>

              )
            }

            {
              step === 2 && (
                <div className='mt-20 '>
                  <div className='w-100'>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className='w-full border border-blue-500 rounded p-2'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>




                  <div className="mt-26 flex justify-end">
                    {/* <button type="button" className="text-blue-600" onClick={() => setStep(1)}>Back</button> */}
                    <Link to={'/register'} className='text-blue-500 mr-5 font-bold'>
                      Create account
                    </Link>
                    <button type='submit' className='bg-blue-600 text-white p-2.5 rounded-l-2xl rounded-r-2xl w-1/6 font-bold'>
                      Next
                    </button>                  </div>

                </div>
              )
            }






          </form>





        </article>
      </section>
    </div>
  )
}
