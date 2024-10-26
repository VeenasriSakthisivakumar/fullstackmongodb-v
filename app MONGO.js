const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/form.html");
});

app.post("/submit", (req, res) => {
    const { name, email, math, science, english } = req.body;
    const average = (parseInt(math) + parseInt(science) + parseInt(english)) / 3;
    res.redirect(`/result?name=${name}&email=${email}&average=${average}`);
});

app.get("/result", (req, res) => {
    const { name, email, average } = req.query;
    res.send(`
        <h1>Form Submitted Successfully!</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Average Marks:</strong> ${average}</p>
        <a href="/">Go Back to Form</a>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
