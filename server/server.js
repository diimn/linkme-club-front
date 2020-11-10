import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import axios from 'axios'

import App from "../src/App";

const PORT = 3000;

const app = express();

let wrap = fn => (...args) => fn(...args).catch(args[2])
app.use("^/$", wrap(async (req, res, next) => {
    console.log('Request URL:', req.url);
    console.log('Request sub:', req.subdomains);

    console.log('Request originalUrl:', req.originalUrl);
    // let result
    // axios.get('https://google.com')
    //     .then(value => result = value)
    //     .catch(err => result = err);
    const result = await axios.get('http://ya.ru/')

    console.log("Res: " + result.data)
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some error happened");
        }
        return res.send(
            data.replace(
                '__TITLE__',
                'TEST_VALUE'
            )
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`
                )
        );
    });
}));

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
});