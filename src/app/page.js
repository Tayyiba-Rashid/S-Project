"use client";
import { useState, useEffect } from "react";
import { parseCSV } from "@/app/utils/utils"; // Ensure parseCSV is defined
import Form from "./components/Form";
import Grid from "./components/Grid";

const Event = {
  EventName: "",
  Location: "",
  Address: "",
  OrganizerName: "",
  EventDate: "",
  EventTime: "",
  EventType: "Conference",
};

function App() {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState(Event);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await parseCSV();
        setData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    setData((prev) => [...prev, newEvent]);
    resetForm();
  };

  const handleEditEvent = (index) => {
    const eventToEdit = data[index];
    setNewEvent(eventToEdit);
    setCurrentEditIndex(index);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleSaveEdit = () => {
    const updatedData = [...data];
    updatedData[currentEditIndex] = newEvent;
    setData(updatedData);
    resetForm();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const filteredData = data.filter((row) => {
    const matchesSearch = row.EventName.toLowerCase().includes(
      search.toLowerCase()
    );
    const matchesCity =
      !selectedCity ||
      row.Location.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const resetForm = () => {
    setShowPopup(false);
    setNewEvent(Event);
    setEditMode(false);
    setCurrentEditIndex(null);
  };

  return (
    <div className="App min-h-dvh max-h-h-full ">
      <div className="w-full flex justify-center items-center text-blue font-bold py-4 sm:py-6 md:pt-6 text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        TECH
        <span className="pl-2 md:pl-4 text-pink text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          EVENTS
        </span>
      </div>

      {/* SEARCH */}
      <div className="search-filter px-4 pb-4  rounded-lg flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search by event name"
          value={search}
          onChange={handleSearchChange}
          className="w-full sm:w-60 p-2 md:p-3 border text-[14px] md:text-[16px] xl:border-2 rounded-full border-blue placeholder:text-gray-500 text-gray-500 placeholder:bg-transparent focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent bg-transparent"
        />

        {/* CITY DROPDOWN FILTER */}
        <select
          onChange={handleCityChange}
          value={selectedCity}
          className="w-full sm:w-60 p-2 md:p-3 border text-[14px] md:text-[16px] xl:border-2 rounded-full border-blue placeholder:text-gray-500 text-gray-500 placeholder:bg-transparent focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent bg-transparent"
        >
          <option
            className="text-black bg-transparent dark:bg-blue dark:text-white text-[14px] md:text-[16px]"
            value=""
          >
            Filter by city
          </option>
          {Array.from(new Set(data.map((row) => row.Location))).map((city) => (
            <option
              className="text-black bg-transparent dark:bg-blue dark:text-white text-[14px] md:text-[16px]"
              key={city}
              value={city}
            >
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* ADD EVENT BUTTON */}
      <div className="w-full h-full flex items-center justify-end">
        <button
          className="bg-pink hover:bg-[#D40049] text-[14px] md:text-[16px] text-white p-2 md:px-4 md:py-4 rounded-lg mx-4 "
          onClick={() => setShowPopup(true)}
        >
          Add Event
        </button>
      </div>
      {/* GRID */}
      {filteredData.length ? (
        <Grid filteredData={filteredData} handleEditEvent={handleEditEvent} />
      ) : (
        <div className="w-full flex items-center justify-center bg-gray-100">
          <p className=" text-pink">
            NO DATA <span className="text-blue">FOUND!</span>
          </p>
        </div>
      )}

      {/* FORM */}
      {showPopup && (
        <Form
          newEvent={newEvent}
          handleInputChange={handleInputChange}
          editMode={editMode}
          handleAddEvent={handleAddEvent}
          resetForm={resetForm}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
