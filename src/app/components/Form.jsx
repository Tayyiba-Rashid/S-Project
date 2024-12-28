import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  EventName: Yup.string().required("Event Name is required"),
  Location: Yup.string().required("Location is required"),
  Address: Yup.string().required("Address is required"),
  OrganizerName: Yup.string().required("Organizer Name is required"),
  EventDate: Yup.date().required("Event Date is required"),
  EventTime: Yup.string().required("Event Time is required"),
  EventType: Yup.string().required("Event Type is required"),
});

function Form({
  newEvent,
  handleInputChange,
  editMode,
  handleAddEvent,
  resetForm,
  handleSaveEdit,
}) {
  // Use Formik for handling form state and validation
  const formik = useFormik({
    initialValues: newEvent,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editMode) {
        handleSaveEdit();
      } else {
        handleAddEvent();
      }
    },
  });

  return (
    <div className="popup fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="popup-content bg-white p-6 rounded-lg lg:max-w-2xl  w-full space-y-6">
        <h3 className="text-2xl font-semibold text-center">{editMode ? "Edit Event" : "Add Event"}</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name:
              <input
                type="text"
                name="EventName"
                value={formik.values.EventName}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {formik.touched.EventName && formik.errors.EventName && (
                <div className="text-red-500 text-sm">{formik.errors.EventName}</div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location:
              <input
                type="text"
                name="Location"
                value={formik.values.Location}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {formik.touched.Location && formik.errors.Location && (
                <div className="text-red-500 text-sm">{formik.errors.Location}</div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address:
              <input
                type="text"
                name="Address"
                value={formik.values.Address}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {formik.touched.Address && formik.errors.Address && (
                <div className="text-red-500 text-sm">{formik.errors.Address}</div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Name:
              <input
                type="text"
                name="OrganizerName"
                value={formik.values.OrganizerName}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {formik.touched.OrganizerName && formik.errors.OrganizerName && (
                <div className="text-red-500 text-sm">{formik.errors.OrganizerName}</div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Date:
              <input
                type="date"
                name="EventDate"
                value={formik.values.EventDate}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {formik.touched.EventDate && formik.errors.EventDate && (
                <div className="text-red-500 text-sm">{formik.errors.EventDate}</div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Time:
              <input
                type="time"
                name="EventTime"
                value={formik.values.EventTime}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {formik.touched.EventTime && formik.errors.EventTime && (
                <div className="text-red-500 text-sm">{formik.errors.EventTime}</div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Type:
              <select
                name="EventType"
                value={formik.values.EventType}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Meetup">Meetup</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.EventType && formik.errors.EventType && (
                <div className="text-red-500 text-sm">{formik.errors.EventType}</div>
              )}
            </label>
          </div>

          <div className="flex flex-row-reverse justify-between gap-4">
            <button
              type="submit"
              className="bg-pink hover:bg-[#D40049] hover:sca0  0 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition duration-300"
            >
              {editMode ? "Save Changes" : "Add Event"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
