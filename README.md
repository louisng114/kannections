# <ruby>漢<rt>KAN</rt></ruby>nections

Kannection is a webapp that helps the user study [Kanji](https://en.wikipedia.org/wiki/Kanji) by using the structure of the popular New York Times game [Connections](https://www.nytimes.com/games/connections). Unlike Connections, games are not daily, instead, users are able to select a [JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test) level and generate a random board. The site also features an [achievement system](https://en.wikipedia.org/wiki/Achievement_(video_games)) for logged in users.

## Getting Started

These are the instructions for running and testing the project locally.

### Prerequisites

This project requires NodeJS and NPM.
As of the making of this project, the LTS version of Node.js is 20.

### Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/louisng114/kannections.git
$ cd kannections
```

Then install dependencies

```sh
$ npm install
```

## Usage

### Serving the app

```sh
$ npm start
```

### Running the tests

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

## External API

This project is powered by [muzukanji](https://github.com/baqterya/muzukanji).
