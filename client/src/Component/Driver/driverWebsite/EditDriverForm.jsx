




import React from 'react';

const EditDriverForm = ({ driverInfo, onClose, onSubmit }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const updatedDriverInfo = {
              driver_username: e.target.driver_username.value,
              driver_email: e.target.driver_email.value,
              driver_license: e.target.driver_license.value,
              truck_size: e.target.truck_size.value,
              plate_number: e.target.plate_number.value,
              production_year: e.target.production_year.value,
              truck_type: e.target.truck_type.value,
              driver_password: e.target.driver_password.value,
              // ... (other fields)
            };
            onSubmit(updatedDriverInfo);
          }}
        >
          <label className="block mb-4">
            Driver Username:
            <input
              type="text"
              name="driver_username"
              defaultValue={driverInfo.driver_username}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Driver Email:
            <input
              type="text"
              name="driver_email"
              defaultValue={driverInfo.driver_email}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Driver License:
            <input
              type="text"
              name="driver_license"
              defaultValue={driverInfo.driver_license}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Truck Size:
            <input
              type="text"
              name="truck_size"
              defaultValue={driverInfo.truck_size}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Plate Number:
            <input
              type="text"
              name="plate_number"
              defaultValue={driverInfo.plate_number}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Production Year:
            <input
              type="text"
              name="production_year"
              defaultValue={driverInfo.production_year}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Truck Type:
            <input
              type="text"
              name="truck_type"
              defaultValue={driverInfo.truck_type}
              className="border p-2"
            />
          </label>

          <label className="block mb-4">
            Driver Password:
            <input
              type="text"
              name="driver_password"
              defaultValue={driverInfo.driver_password}
              className="border p-2"
            />
          </label>

          <button type="submit" className="bg-my-green text-white p-2 rounded">
            Update 
          </button>
          <button onClick={onClose} className="mt-2 text-gray-500">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDriverForm;

