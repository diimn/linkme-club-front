import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from 'axios'
import App from "../src/App";
import {HOST} from "../src/js/consts";

const PORT = 3000;
const app = express();
let wrap = fn => (...args) => fn(...args).catch(args[2])

app.use("^/$", getWrapSubdomain());
app.use("/adminPage", getWrapService())
app.use("/vkredirect", getWrapService())
app.use("/fbredirect", getWrapService())
app.use("/privacy", getWrapService())
app.use("/:data", getWrapData())
app.use(defaultWay())

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
});

function defaultWay() {
    console.log(`Default way`)
    return express.static(path.resolve(__dirname, '..', 'build'))
}

function getWrapService() {
    return wrap(async (req, res, next) => {
        console.log('Request URL2:', req.url);
        let title = "LinkMe Club";
        let image;
        let desc = "Сервис распространения объявлений";
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
                    .replace('__TITLE__', title)
                    .replace('__DESCRIPTION__', desc)
            );
        });
    });
}

function getWrapData() {
    return wrap(async (req, res, next) => {
        console.log('Request URL1:', req.url);
        var data = req.params.data;
        if (!data.includes('static') && !data.includes('.')) {
            console.log('Request URL1_1:', data);
            let result;
            try {
                result = await axios.get(HOST + '/ogc/getByUniqUrl/' + data)
                console.log("Res title: " + result.data.title)
                console.log("Res urlLink: " + result.data.urlLink)
                processMetaTags(res, result);
            } catch (e) {
                console.log("Error occurred while getting data", e)
                res.redirect('https://linkme.club');
                next();
            }
        } else {
            // processDefaultMetaTags(res)
            next();
        }
    });
}


function getWrapSubdomain() {
    return wrap(async (req, res, next) => {
        console.log('Request URL:', req.url);
        console.log('Request sub:', req.subdomains);
        if (req.url || req.subdomains) {
            let result;
            //todo уточнить как вытаскивать субдомен
            let subdomain = req.subdomains[0];
            if (subdomain) {
                try {
                    let contentUrl = HOST + '/ogc/getByUrl/' + subdomain
                    console.log('Requesting URL:', contentUrl);
                    result = await axios.get(contentUrl)
                    console.log("Result for subdomain: " + subdomain + "\n" + result)
                    console.log("Res title: " + result.data.title)
                    console.log("Res urlLink: " + result.data.urlLink)
                    processMetaTags(res, result);
                } catch (e) {
                    console.log("Error occurred while getting data", e)
                    res.redirect('linkme.club')
                    next();

                }
            } else {
                processMetaTags(res, result);
            }

        } else {
            next();
            // processDefaultMetaTags(res);
        }
    });
}

function processMetaTags(res, result) {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some error happened");
        }
        let title = "LinkMe Club";
        let image;
        let desc = "Сервис распространения объявлений";
        if (result) {
            title = result.data.title;
            //todo подилить получение картинок с бэка
            // image = 'https://images.netpeak.net/blog/zdes-image.webp';
            image = result.data.imageLink;
            desc = result.data.description;
        }
        return res.send(data
            .replace('__TITLE__', title)
            .replace('__TITLE__', title)
            .replace('__IMAGE__', image)
            .replace('__DESCRIPTION__', desc)
            .replace('<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`)
        );
    });
}

function processDefaultMetaTags(res, result) {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some error happened");
        }
        let title = "LinkMe Club";
        let desc = "Сервис распространения объявлений";

        return res.send(data
                .replace('__TITLE__', title)
                .replace('__DESCRIPTION__', desc)
            // .replace('<div id="root"></div>',
            //     `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`)
        );
    });
}
