import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserForm = ({ userId, onClose, onUpdate }) => {
  const [editedUser, setEditedUserData] = useState(
    onUpdate || {
      user_username: "",
      user_email: "",
      user_phone_number: "",
      user_image: null,
    }
  );
  const [image,setImage] = useState(null);

  console.log("onUpdate", onUpdate);
  console.log("editedUser", editedUser);
useEffect(() => {
  // Fetch user data by ID and set it to the state
  const fetchUserDataById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user-profile/${userId}`);
      setEditedUserData({
        user_username: response.data.user_username,
        user_email: response.data.user_email,
        user_phone_number: response.data.user_phone_number,
        user_image: response.data.user_image,
      });
      console.log("data", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserDataById();
}, [userId]);

  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUser,
      [e.target.name]: e.target.value || '',
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedUserData((prevData) => ({ ...prevData, image: file }));
    setImage(file)
  };
  const form = new FormData();
  form.append("user_username",editedUser.user_username);
  form.append("user_email",editedUser.user_email);
  form.append("user_phone_number",editedUser.user_phone_number);
  form.append("image", image);
  console.log(form);
  const handleUpdateUser = async () => {
    try {
     
      // Send edited user data to the server
      await axios.put(`http://localhost:3001/update-user-profile`, form,
      {
        headers:{
          "Content-Type": "multipart/form-data",
        }
      });
      // Trigger a refresh or update action in the parent component
      onClose(); // Close the edit form modal
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    // Your edit form JSX here, using editedUserData and handleInputChange
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
        <div className="bg-white w-96 p-6 rounded-lg z-10">
          <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser(editedUser);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Name
              </label>
              <input
                type="text"
                name="user_username"
                value={editedUser.user_username}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Email
              </label>
              <input
                type="text"
                name="user_email"
                value={editedUser.user_email}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                user_phone_number
              </label>
              <input
                type="text"
                name="user_phone_number"
                value={editedUser.user_phone_number}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">User Password</label>
                <input
                  type="text"
                  name="user_password"
                  value={editedUser.user_password}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div> */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Image
              </label>
              <input
                type="file"
                name="user_image"
                // value={editedUser.user_image}
                onChange={handleImageChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-my-green text-white py-2 px-4 rounded-full hover:bg-teal-400 focus:outline-none focus:shadow-outline-blue"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;


//shahed + bayan

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EditUserForm = ({ userId, onClose, onUpdate }) => {
//   const [editedUser, setEditedUserData] = useState({
//     user_username: "",
//     user_email: "",
//     user_phone_number: "",
//     user_image: "",
//   });
//   const [ image, setImage ] = useState("");

//   useEffect(() => {
//     // Fetch user data by ID and set it to the state
//     const fetchUserDataById = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/user-profile`);
//         setEditedUserData(response.data);
//         console.log("data", response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserDataById();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     setEditedUserData({
//       ...editedUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = () => {
//     const fileInput = document.getElementById("profileImageInput");
//     const file = fileInput.files[0];
//     setEditedUserData((prevData) => ({ ...prevData, user_image: file }));
//     // form.append("image", file);
//     setImage(fiel)
    
//   };
//   const form = new FormData();
//   form.append("user_username", editedUser.user_username);
//   form.append("user_email", editedUser.user_email);
//   if (editedUser.user_phone_number !== null) {
//     form.append("user_phone_number", editedUser.user_phone_number);
//   }
//   if (image !== null) {
//     form.append("image", image);
//   }

//   console.log(form);
//   const handleUpdateUser = async () => {
//     try {
//       // Send edited user data to the server
//       await axios.put(`http://localhost:3001/update-user-profile`, form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       // Trigger a refresh or update action in the parent component
//       onClose(); // Close the edit form modal
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   return (
//     // Your edit form JSX here, using editedUserData and handleInputChange
//     <div>
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
//         <div className="bg-white w-96 p-6 rounded-lg z-10">
//           <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleUpdateUser(editedUser);
//             }}
//           >
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 User Name
//               </label>
//               <input
//                 type="text"
//                 name="user_username"
//                 value={editedUser.user_username}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 User Email
//               </label>
//               <input
//                 type="text"
//                 name="user_email"
//                 value={editedUser.user_email}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 user_phone_number
//               </label>
//               <input
//                 type="text"
//                 name="user_phone_number"
//                 value={editedUser.user_phone_number}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             {/* <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">User Password</label>
//                 <input
//                   type="text"
//                   name="user_password"
//                   value={editedUser.user_password}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div> */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 User Image
//               </label>
//               <input
//                 type="file"
//                 id="profileImageInput"
//                 name="user_image"
//                 accept="image/*"
//                 // value={editedUser.user_image}
//                 onChange={handleImageChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-my-green text-white py-2 px-4 rounded-full hover:bg-teal-400 focus:outline-none focus:shadow-outline-blue"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserForm;

// malath 

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EditUserForm = ({ userId, onClose, onUpdate }) => {
//   const [editedUser, setEditedUserData] = useState(
//     onUpdate || {
//       user_username: "",
//       user_email: "",
//       user_phone_number: "",
//       user_image: null,
//     }
//   );
//   const {image,setImage} = useState(null);

//   console.log("onUpdate", onUpdate);
//   console.log("editedUser", editedUser);
//   useEffect(() => {
//     // Fetch user data by ID and set it to the state
//     const fetchUserDataById = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/user-profile`);
//         setEditedUserData(response.data);
//         console.log("data", response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserDataById();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     setEditedUserData({
//       ...editedUser,
//       [e.target.name]: e.target.value || '',
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setEditedUserData((prevData) => ({ ...prevData, image: file }));
//   };
//   const form = new FormData();
//   form.append("username",editedUser.user_username);
//   form.append("email",editedUser.user_email);
//   form.append("phoneNumber",editedUser.user_phone_number);
//   form.append("image", image);
//   console.log(form);
//   const handleUpdateUser = async () => {
//     try {
     
//       // Send edited user data to the server
//       await axios.put(`http://localhost:3001/update-user-profile`, form,
//       {
//         headers:{
//           "Content-Type": "multipart/form-data",
//         }
//       });
//       // Trigger a refresh or update action in the parent component
//       onClose(); // Close the edit form modal
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   return (
//     // Your edit form JSX here, using editedUserData and handleInputChange
//     <div>
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
//         <div className="bg-white w-96 p-6 rounded-lg z-10">
//           <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleUpdateUser(editedUser);
//             }}
//           >
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 User Name
//               </label>
//               <input
//                 type="text"
//                 name="user_username"
//                 value={editedUser.user_username}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 User Email
//               </label>
//               <input
//                 type="text"
//                 name="user_email"
//                 value={editedUser.user_email}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 user_phone_number
//               </label>
//               <input
//                 type="text"
//                 name="user_phone_number"
//                 value={editedUser.user_phone_number}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             {/* <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">User Password</label>
//                 <input
//                   type="text"
//                   name="user_password"
//                   value={editedUser.user_password}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div> */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 User Image
//               </label>
//               <input
//                 type="file"
//                 name="user_image"
//                 value={editedUser.user_image}
//                 onChange={handleImageChange}
//                 className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-my-green text-white py-2 px-4 rounded-full hover:bg-teal-400 focus:outline-none focus:shadow-outline-blue"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserForm;
