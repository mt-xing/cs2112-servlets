const express = require("express");
const app = express();
const url = require('url');

const port = 8081;

let message = "You'll never figure out how to change me";

app.get("/", function(request, response) {
    response.send("Hello World");
});

app.get("/message", (req, res) => {
	res.send(message);
});

app.get("/json", (req, res) => {
	res.type("application/json");
	const msg = {
		message: "I am a JSON!",
		param: 42
	};
	res.send(JSON.stringify(msg));
});

app.get("/params", (req, res) => {
	
	const queryInfo = {
		query: req.url.split("?")[1],
		paramNames: Object.keys(req.query),
		fooParam: req.query.foo
	};
	
	res.type("application/json");
	res.send(JSON.stringify(queryInfo));
});

const setGood = JSON.stringify({status: true});
const setBad = JSON.stringify({status: false});


app.use(express.json());
app.post("/message", async (req, res) => {
	const msgBundle = req.body;
	res.type("application/json");
	if(msgBundle.message && msgBundle.param === 2112) {
		message = msgBundle.message;
		res.send(setGood);
	} else {
		res.send(setBad);
	}
});



const bodyParser = require('body-parser');
app.use(bodyParser.text());

app.post("/post", async (req, res) => {
	const t = await req.body.toString();
	res.send(t);
});



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});