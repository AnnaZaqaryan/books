const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

//enable CORS for request verbs
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


let books = [
    {
        id: "1",
        title: "In Search of Lost Time",
        author: "Marcel Proust",
        price: 20
    },
    {
        id: "2",
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        price: 22
    },
    {
        id: "3",
        title: "The Great Gatsby ",
        author: "F. Scott Fitzgerald",
        price: 23
    },
    {
        id: "4",
        title: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        price: 222
    }

]


//Handle GET method for listing all users
app.get('/books', function (req, res) {
    res.json(books);
})

//Handle GET method to get only one record
app.get('/books/:id', function (req, res) {

    const bookById = books.filter(e => e.id == req.params.id)[0];

    res.json(bookById);

})

//Handle POST method
app.post('/books', function (req, res) {

    let newBook = req.body;
    newBook.id = Math.random().toString(36).substring(7);
    console.log(newBook)
    books.push(newBook);
    res.json(newBook)
});

//Handle DELETE method
app.delete('/books/:id', function (req, res) {

    books = books.filter(e => e.id != req.params.id);

    res.json(books);

});

//Handle GET method
app.put('/books/:id', function (req, res) {


    books = books.filter(e => e.id != req.params.id);
    books.push(req.body)

    res.json(books);

});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})  