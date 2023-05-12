# chmury_zad1

Rozwiązanie zadania 1 z technologii chmurowych.

Michał Galant

przed przystapieniem do prac trzeba wejsc do katalogu server
`cd server`

<h3>1. Struktura aplikacji</h3>

[Upload server/src/App.js]

![Struktura folderu](images/struktura.jpg)

![Działanie aplikacji](images/app.jpg)

<h3>2. Dockerfile</h3>

[Upload server/dockerfile]

<h3>3. Komendy</h3>

`docker build -t zad1:v0.5 .`
![Budowanie obrazu](images/budowanie_obrazu.jpg)

`docker run -d -p 80:80 --name zad1 zad1:v0.5`
![Włączenie kontenera](images/kontener.jpg)

`docker logs zad1`
![Logi kontenera](images/logs.jpg)

`docker history zad1:v0.5`
![Warstwy](images/warstwy.jpg)
