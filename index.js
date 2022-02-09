const natural = require("natural");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

const classifier = new natural.BayesClassifier();

classifier.addDocument("hello", "greeting");
classifier.addDocument("greeting", "greeting");
classifier.addDocument("hey there!", "greeting");
classifier.addDocument("hello bot", "greeting");

classifier.addDocument("i would like to order a pizza", "order");
classifier.addDocument("pizzas please", "order");
classifier.addDocument("cancel my pizza", "cancel");
classifier.addDocument("ordered by mistake", "cancel");
classifier.addDocument("insufficient funds", "cancel");
classifier.addDocument("this is delicious", "eating");
classifier.addDocument("amazing pizza", "eating");
classifier.addDocument("cheesy", "eating");
classifier.train();

router.get("/messages", (req, res) => {
    const userMessage = req.body.text;
    const intent = classifier.classify(userMessage);
    if (intent === "greeting") {
        res.send("Hello User! Good to have you hear");
    }
    else if (intent === "order") {
        res.send("Your order is processing, please allow around 30 minutes");
    } else if (intent === "cancel") {
        res.send("Sorry! Your order was cancelled due to a technical issue");
    } else if (intent === "eating") {
        res.send("Enjoy your pizza! Hope you order more");
    } else {
        res.send("Error!");
    }
});

app.use("/api", router)
app.listen(port);
console.log(`Magic happens on PORT: ${port}`);