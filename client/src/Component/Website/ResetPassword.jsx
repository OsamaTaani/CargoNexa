import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
   

    const [user_email, setEmail] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [code, setCode] = useState('');
    const [user_password, setNewPassword] = useState('');
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    const sendEmail = async (e) => {
        e.preventDefault()
      try {

        const response = await axios.post('http://localhost:3001/reset-password', { user_email });
    
        console.log('Email sent successfully:', response.data);
  
        // Show the update password modal
        setShowUpdateModal(true);

      } catch (error) {
        console.error('Email sending failed:', error.message);
      }

    };
  
    const updatePassword = async () => {
      try {
        // Replace 'YOUR_UPDATE_PASSWORD_ENDPOINT' with your actual API endpoint
        const response = await axios.post('http://localhost:3001/change-password', {
          code,
          user_password,
        });
  
        console.log('Password updated successfully:', response.data);
  
        // Hide the update password modal
        setShowUpdateModal(false);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Password update failed:', error.message);
      }
    };
  

  return (
    <>
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Reset password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>
      <form  
           onSubmit={sendEmail}
           className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              id="user_email"
              name="user_email"
              type="email"
              value={user_email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
              required
            />
          </label>
          <button className="w-full py-3 font-medium text-white bg-my-green hover:bg-teal-500 rounded-lg  hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            <span>Reset password</span>
          </button>
          <p className="text-center">
            Not registered yet?{" "}
            <Link to={'/registration'}
              className="text-my-green font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>

    {showUpdateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-xl shadow shadow-slate-300">
                        <h1 className="text-2xl font-medium">Update Password</h1>
                        <form onSubmit={updatePassword} className="my-4">
                            <label htmlFor="code">
                                <p className="font-medium text-slate-700 pb-2">Verification Code</p>
                                <input
                                    id="code"
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Enter verification code"
                                    required
                                />
                            </label>
                            <label htmlFor="newPassword">
                                <p className="font-medium text-slate-700 pb-2">New Password</p>
                                <input
                                    id="user_password"
                                    name="user_password"
                                    type="password"
                                    value={user_password}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Enter new password"
                                    required 
                                />
                            </label>
                            <button type="submit" className="w-full py-3 my-5 font-medium text-white bg-my-green hover:bg-teal-500 rounded-lg  hover:shadow inline-flex space-x-2 items-center justify-center">
                                <span>Update Password</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
  </>
  
  )
}

export default ResetPassword