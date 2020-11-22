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

app.use("^/$", getWrapSubdomain());
app.use("/adminPage", getWrapService())
app.use("/vkredirect", getWrapService())
app.use("/fbredirect", getWrapService())
app.use("/:data", getWrapData())
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
});

function getWrapData() {
    return wrap(async (req, res, next) => {
        console.log('Request URL1:', req.url);
        var data = req.params.data;
        if (!data.includes('static') && !data.includes('.')) {
            console.log('Request URL1_1:', data);
            const result = await axios.get('http://localhost:5000/api/v1/ogc/getByUniqUrl/' + data)
            console.log("Res: " + result.data.title)
            fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Some error happened");
                }
                return res.send(
                    data
                        .replace(
                            '__TITLE__',
                            result.data.title
                        )
                        .replace(
                            '__IMAGE__',
                            'https://images.netpeak.net/blog/zdes-image.webp'
                        )
                        .replace(
                            '__DESCRIPTION__',
                            result.data.description
                        )
                        .replace(
                            '<div id="root"></div>',
                            `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`
                        )
                );
            });
        } else {
            next();
        }

    });
}

function getWrapService() {
    return wrap(async (req, res, next) => {
        console.log('Request URL2:', req.url);
        fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Some error happened");
            }
            return res.send(
                data
                    .replace(
                        '<div id="root"></div>',
                        `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`
                    )
            );
        });
    });
}

function getWrapSubdomain() {
    return wrap(async (req, res, next) => {
        console.log('Request URL:', req.url);
        console.log('Request sub:', req.subdomains);
        //todo уточнить как вытаскивать субдомен
        let url = req.subdomains
        console.log('Request URL1_1:', data);
        const result = await axios.get('http://localhost:5000/api/v1/ogc/getByUrl/' + url)

        fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Some error happened");
            }
            return res.send(
                data
                    .replace(
                        '__TITLE__',
                        result.data.title
                    )
                    .replace(
                        '__IMAGE__',
                        'https://images.netpeak.net/blog/zdes-image.webp'
                    )
                    .replace(
                        '__DESCRIPTION__',
                        result.data.description
                    )
                    .replace(
                        '<div id="root"></div>',
                        `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`
                    )
            );
        });
    });
}


