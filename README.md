# Alps Drive TS

## Installation
*You must install [Node.JS](https://nodejs.org/) & [NPM](https://www.npmjs.com/) to run this project.*
```bash
git clone https://github.com/MalikAza/Alps-Drive-TS.git
cd Alps-Drive-TS/
npm install
```

## Run
*The base drive's path would be the drive folder inside your OS temporary folder.*

*If you want to place the drive's path elsewhere, you can change the const `drivePath` inside the `/utils/confs.js` file.*
```bash
npm run dev
```
Connect to http://localhost:3000.

## Dev
*If you want to make changes, you must compile TypeScript before running.*
```bash
npm run TSBuild
```