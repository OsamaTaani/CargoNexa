import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const ChangePasswordForUser = () => {

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [validationErrors, setValidationErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const validatePassword = () => {
    const { newPassword, confirmPassword } = passwordData;
    let errors = {
      newPassword: '',
      confirmPassword: '',
    };

    // Validate newPassword
    if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long.';
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one special character.';
    } else if (!/\d/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one number.';
    }

    // Validate confirmPassword
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword()) {
      try {
        const response =  axios.put(
          `http://localhost:3001/user-profile/1`,
          {
            user_password: passwordData.newPassword,
            // Include any other fields you need to update
          }
        );

        console.log('Password updated successfully:', response.data);
        // Implement any additional logic after successful password update

        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        
      } catch (error) {
        console.error('Error updating password:', error);
        // Implement error handling
      }
    } else {
      console.log('Password validation failed. Please correct the errors.');
    }
  };
  return (
    <div><>
    {/* component */}
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" >
        <div className="flex items-center space-x-2 mb-6">
         
          <h1 className="text-xl font-semibold">Change Password</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Update password for enhanced account security.
        </p>
        <form id="changePasswordForm" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Current Password *
            </label>
            <input
              type="password"
              id="currentPassword"
              className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
              required=""
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              New Password *
            </label>
            <input
              type="password"
              id="newPassword"
              className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
              required=""
              onChange={handleInputChange}
            />
             {validationErrors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.newPassword}</p>
          )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Confirm New Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
              required=""
              onChange={handleInputChange}
            />
         {validationErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
          )}
          </div>
         
          <div className="flex justify-between">
            <Link to={'/userProfile'}>
            <button
              type="button"
              onclick="discardChanges()"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Discard
            </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-my-green rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:border-blue-300"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  </div>
  )
}

export default ChangePasswordForUser