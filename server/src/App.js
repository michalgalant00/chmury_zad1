import "./App.css";

import React, { useEffect, useState } from "react";

console.log("test komunikat prosze dzialaj");

function App() {
  const [clientIP, setClientIp] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => {
        setClientIp(data.ip);
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      })
      .catch((error) => {
        console.error("Błąd pobierania adresu IP klienta", error);
      });
  }, []);

  useEffect(() => {
    if (timezone) {
      const intervalId = setInterval(() => {
        setCurrentTime(
          new Date().toLocaleTimeString("pl-PL", {
            timeZone: timezone,
          })
        );
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timezone]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Adres IP: {clientIP}</p>
        Strefa czasowa: {timezone}
        <h1>{currentTime}</h1>
      </header>
    </div>
  );
}

export default App;
