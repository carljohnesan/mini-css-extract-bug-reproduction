# Bug Reproduction

This repo is very minimal project that reproduces mini-css-extract-plugin bug, I guess it's a bug, which causes webpack compilation hooks to trigger lot of times, don't know what's happening under the hood, but without mini css extract plugin's loader, bug do not appear.

Run `yarn start` to see the bug. Reproduction lives in `reproduction.js` file.
