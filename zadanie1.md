# chmury_zad1

Rozwiązanie zadania 1 z technologii chmurowych.

Michał Galant

Przed rozpoczęciem działań należy przejść do katalogu server:
`cd server`
Oraz pobrać obrazy potrzebne do budowania:
`docker pull node:14-alpine`
`docker pull nginx:1.21.1-alpine`

<h3>1. Struktura aplikacji</h3>

Plik server/src/App.js

```javascript
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

  // sekcja logów
  const PORT = process.env.PORT || 80;
  const CURRENT_TIME = currentTime;
  console.log(
    `Autor: Michał Galant` +
      `Aplikacja nasłuchuje na porcie ${PORT}` +
      `Start: ${CURRENT_TIME}`
  );

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
```

Struktura folderu
![Struktura folderu](images/struktura.png)

Działanie aplikacji
![Działanie aplikacji](images/app.png)

<h3>2. Dockerfile</h3>

```dockerfile
#
#   Michał Galant
#

# Stage 1 : budowanie
# na bazie obrazu node:14-alpine
FROM node:14-alpine as build

# ustawienie katalogu roboczeno
WORKDIR /server

# przekopiowanie zależności oraz aplikacji do kontenera
COPY package.json ./
COPY src ./src
COPY public ./public

# zainstalowanie zależności
RUN npm install
# zbudowanie aplikacji
RUN npm run build

# Stage 2 : wystawienie
FROM nginx:1.21.1-alpine

# przekopiowanie aplikacji oraz konfiguracji serwera do kontenera
COPY --from=build /server/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# wystawienie usługi na port 80
EXPOSE 80

# sprawdzenie dzialania serwera
HEALTHCHECK --interval=10s --timeout=1s \
 CMD curl -f http://localhost:80/ || exit 1

# wystawienie serwera
CMD ["nginx", "-g", "daemon off;"]
```

<h3>3. Komendy</h3>

`docker build -t zad1:v0.5 .`
![Budowanie obrazu](images/budowanie_obrazu.png)

`docker run -d -p 80:80 --name zad1 zad1:v0.5`
![Włączenie kontenera](images/kontener.png)

`docker logs zad1`
![Logi kontenera](images/logs.png)

`docker history zad1:v0.5`
![Warstwy](images/warstwy.png)
