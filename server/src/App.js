import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  // utworzenie niezbednych stalych, dla adresu,strefy czasowej,bieżącej godziny
  const [clientIP, setClientIp] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    // pobranie z API adresu IP oraz strefy czasowej klienta
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => {
        setClientIp(data.ip);
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      })
      // w przypadku błędu zwróć błąd
      .catch((error) => {
        console.error("Błąd pobierania adresu IP klienta", error);
      });
  }, []);

  // z kaźdą zmianą stanu strefy aktualizuj godzinę
  useEffect(() => {
    if (timezone) {
      const intervalId = setInterval(() => {
        // pobranie bieżącej godziny
        setCurrentTime(
          new Date().toLocaleTimeString("pl-PL", {
            timeZone: timezone,
          })
        );
      }, 1000); // aktualizuj co 1s
      return () => clearInterval(intervalId);
    }
  }, [timezone]);

  // wyświetlenie wyników
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
