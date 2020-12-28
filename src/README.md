# NOTE:

Instead of `./src` folder, this project uses `./esm` folder. Develop in `./esm` folder. Include `./esm` folder in development or production. It's not optimized, but the files are all small. In the future, this project may be refactored to use `./src` folder for development, then compile to `./esm` for production. That will be backwards-compatible.

Build process takes `./esm` folde (instead of `./src`) and converts it to `./cjs` (instead of to `./dist`).
