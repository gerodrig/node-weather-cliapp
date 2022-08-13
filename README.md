# How to configure Typescript in NodeJS

1. Create our project folder.
2. Create our package.json with ```yarn init -y```.
3. Create our tsconfig.json file ```tsc --init```.
4. (Optional) Create a dist/build file for the outpufile and a src file for our code.
5. Set output and root Directories in tsconfig.json file.
6. Set module resolution to node in tsconfig.json file.
7. Install typescript,ts-node packages and types
8. Define the scripts in your package.json file.
```
 "scripts": {
    "start": "node ./build/index.js",
    "build": "tsc -p .",
    "dev": "nodemon ./src/index.ts"
  },
```

# Node Weather CLI APP

To build this app run the followin:
 1. ```yarn``` to install node modules.
 2. ```yarn run build && node build/index.js``` to run the application.