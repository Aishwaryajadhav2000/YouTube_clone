import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Loginhook from './Loginhook';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../services/Apicall';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';



export default function Register() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [errrorMessage , setErrormessage] = useState();


  const handleNext = (e) => {
    e.preventDefault();
    setStep(2)
  }

  const handleBasicInfo = (e) => {
    e.preventDefault();
    setStep(3)
  }

  const handeRegister = async (e) => {
    e.preventDefault();
    console.log("registration")
    try {
      const Registerresponse = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        })
      })

      console.log("registerresponse", Registerresponse)

      const responseData = await Registerresponse.json(); // parse the JSON

      if (Registerresponse.status === 200 || Registerresponse.status === 201) {
        alert(responseData.message || "Registration successful!");
        navigate("/login");
      } else if (Registerresponse.status === 400) {
        // alert(responseData.message);
         setErrormessage(responseData.message)
      } else {
        setErrormessage("Registration failed. Please try again.");
      }

      // result.then((data) => {
      //   console.log("New registration", data);
      //   alert("registration successfully");
      //   setFirstname("")
      //   setLastname("");
      //   setEmail("");
      //   setPassword("");
      //   navigate("/login")
      // })

    } catch (err) {
      alert(`Error : ${err.message}`)
    }

  }


  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <section className="block sm:flex bg-white rounded-2xl shadow-md sm:max-w-6xl h-96">
        <article className='w-1/2 m-5'>
          {
            step === 1 && (
              <div className='m-4'>
                <FcGoogle className="text-2xl" size={50} />
                <p className='text-4xl mt-3 font-semibold'>Create a Google Account</p>
                <h2 className='mt-4'>
                  Enter Your Name
                </h2>
              </div>
            )
          }

          {
            step === 2 && (
              <div className='m-4'>
                <FcGoogle className="text-2xl" size={50} />
                <p className='text-4xl mt-3 font-semibold'>Basic Information</p>
                <h2 className='mt-4'>
                  Enter your birthday and gender
                </h2>
              </div>
            )
          }

          {
            step === 3 && (
              <div className='m-4'>
                <FcGoogle className="text-2xl" size={50} />
                <p className='text-4xl mt-3 font-semibold'>Use your existing email</p>
                <h2 className='mt-4'>
                  Enter the email address you want to use for your Google Account
                </h2>
                <h2>Create a password</h2>
              </div>
            )
          }

        </article>




        <article>


          <form onSubmit={step === 1 ? handleNext : step === 2 ? handleBasicInfo : handeRegister}>

            {
              step === 1 && (
                <div className='m-4'>

                  <div className='mt-20'>
                    <input type="text" placeholder='First name ' value={firstname} onChange={(e) => setFirstname(e.target.value)} required
                      className='w-full border border-blue-500 rounded p-2'
                    />

                    <input type="text" placeholder='Last name (optional)' value={lastname} onChange={(e) => setLastname(e.target.value)}
                      className='w-full border border-blue-500 rounded p-2'
                    />
                  </div>



                  <div className='mt-20 flex justify-end '>

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
                  <div className='w-100 flex justify-between'>
                    <input
                      type="text"
                      placeholder="Month"
                      className='w-full border border-blue-500 rounded p-2'
                    />
                    <input
                      type="text"
                      placeholder="Day"
                      className='w-full border border-blue-500 rounded p-2'
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      className='w-full border border-blue-500 rounded p-2'
                    />
                  </div>

                  <div className='w-100 border mt-10 h-14'>
                    <select name="" id="" className='w-full p-3.5'  >
                      <option value="">Select gender</option>
                      <option value="">Female</option>
                      <option value="">Male</option>
                      <option value="">Rather not say</option>
                      <option value="">Custom</option>


                    </select>
                  </div>

                  <div className="mt-26 flex justify-end">
                    <button type='submit' className='bg-blue-600 text-white p-2.5 rounded-l-2xl rounded-r-2xl w-1/6 font-bold'>
                      Next
                    </button>
                  </div>


                </div>
              )
            }

            {
              step === 3 && (
                <div className='mt-20 '>
                  <div className='w-100'>
                    <input
                      type="email"
                      placeholder="Email address"
                      className='w-full border border-blue-500 rounded p-2'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Create Password"
                      className='w-full border border-blue-500 rounded p-2'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                  </div>

                  {
                    errrorMessage && (
                      <p>{errrorMessage}</p>
                    )
                  }

                  <div className="mt-26 flex justify-end">
                    <Link to={'/login'} className='text-blue-500 mr-5 font-bold'>
                      Back to login
                    </Link>
                    <button type='submit' className='bg-blue-600 text-white p-2.5 rounded-l-2xl rounded-r-2xl w-1/6 font-bold'>
                      Register
                    </button>
                  </div>

                  
                </div>
              )
            }


          </form>





        </article>
      </section>
    </div>
  )
}
