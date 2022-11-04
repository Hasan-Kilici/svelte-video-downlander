const fork = require("child_process").fork;
const { createServer } = require("http");
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const app = express();
const server = createServer(app);
const mode = process.env.mode || "prod";

const cors = require('cors');
const ytdl = require('ytdl-core');

if (mode === "dev") {
	const { WebSocketServer } = require("ws");
	const builder = fork("./build.js");

	const wss = new WebSocketServer({ server });
	const clients = [];

	wss.on("connection", (sock) => clients.push(sock))

	builder.on("message", () => {
	  for (let i = 0; i < clients.length; i++)
			clients[i].send("change");
	});
}
else {
	fork("./build.js");
}

const page = path.join(__dirname, mode === 'dev' ? "dist/dev.html" : "dist/prod.html");
const dist = path.join(__dirname, "dist/");
const public = path.join(__dirname, "public");

app.use("/app_static", express.static(dist));
app.use("/static", express.static(public));

app.get("/", (req, res) => {
	res.sendFile(page);
});

app.get('/downloadmp4', async (req, res, next) => {
	try {
		let url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'video';

		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(url, {
			format: 'mp4',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});

server.listen(3000, () => {
	console.log("Listening on :3000")
});
