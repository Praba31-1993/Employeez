"use client"
import React, { useState } from "react";

function About() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = "https://demo2.marvelemployez.com/HRSolutions/getPayrollSchedule";
    try {
      const response = await fetch(url);
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Data received:", json);
      setData(json);
      setError(null); // Reset error if successful
    } catch (err) {
      console.error("Error:", err);
      // setError("An error occurred while fetching data.");
    }
  };

  return (
    <div>
      <div onClick={getData} className="cursor-pointer text-blue-500">
        Click Me
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h3>Payroll Schedule Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default About;
