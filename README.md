# <ruby>漢<rt>KAN</rt></ruby>nections

Kannection is a webapp that helps the user study [Kanji](https://en.wikipedia.org/wiki/Kanji) by using the structure of the popular New York Times game [Connections](https://www.nytimes.com/games/connections). Unlike Connections, games are not daily, instead, users are able to select a [JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test) level and generate a random board. The site also features an [achievement system](https://en.wikipedia.org/wiki/Achievement_(video_games)) for logged in users.

The game is deployed at https://kannections-game.onrender.com/.

## Getting Started

These are the instructions for running and testing the project locally.

### Prerequisites

This project requires NodeJS and NPM, as well as PostgreSQL.
As of the making of this project, the LTS version of Node.js is 20.

### Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/louisng114/kannections.git
$ cd kannections
```

Then install dependencies for the project root, frontend, and backend:

```sh
$ npm install
$ npm install --prefix frontend
$ npm install --prefix backend
```

Start up the PostgreSQL server and seed the database:

```sh
$ sudo service postgresql start
$ psql
$ \i backend/kannections.sql
```

## Usage

### Serving the app

At the project root:

```sh
$ npm start
```

### Running the tests

```sh
$ npm test
```

## External API

This project is powered by [muzukanji](https://github.com/baqterya/muzukanji).

## Other acknowledgements

This project is built with Vite (React) for the frontend and Express.js for the backend, and deployed using Render.
Sound effects are obtained from freesound.org.
