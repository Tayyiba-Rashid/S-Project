import React from 'react';

export default function Grid({ filteredData, handleEditEvent }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  p-4">
      {filteredData.map((row, index) => (
        <div
          key={index}
          className="bg-blue border  shadow-md rounded-lg p-6 flex flex-col justify-between hover:bg-opacity- hover:scale-[101%] transform transition-transform duration-300"
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold text-pink  ">
              <span className="font-bold text-2xl">{row.EventName.toUpperCase()}</span>
            </p>
            <p className="text-white font-bold ">
              Location: <span className="font-normal text-gray-500 ">{row.Location}</span>
            </p>
            <p className="text-white font-bold ">
              Address: <span className="font-normal text-gray-500 ">{row.Address}</span>
            </p>
            <p className="text-white font-bold ">
              Organizer: <span className="font-normal text-gray-500 ">{row.OrganizerName}</span>
            </p>
            <p className="text-white font-bold ">
              Date: <span className="font-normal text-gray-500 ">{row.EventDate}</span>
            </p>
            <p className="text-white font-bold ">
              Time: <span className="font-normal text-gray-500 ">{row.EventTime}</span>
            </p>
            <p className="text-white font-bold ">
              Type: <span className="font-normal text-gray-500 ">{row.EventType}</span>
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleEditEvent(index)}
              className="bg-pink hover:bg-[#D40049] hover:scale-110  text-white px-4 py-2 rounded transition duration-200"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
