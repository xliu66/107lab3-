var express = require("express");
var app = express(); // create an app
var itemList = []; // store items on this array

/*********************************************
 * Configuration
 **********************************************/

// enable CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parse to read info in request
var bparser = require("body-parser");
app.use(bparser.json());

// to server static files ( css, js, img, pdfs )
app.use(express.static(__dirname + '/public'))

// to serve HTML
var ejs = require('ejs');
app.set('views',__dirname + '/public'); // where are the HTML files?
app.engine('html',ejs.renderFile);
app.set('view engine',ejs);  


 /*********************************************
 * Web server endpoints
 **********************************************/


app.get('/',(req,res) => { 
    res.render('catalog.html');
});

app.get('/contact',(req,res) => {
    res.send("This will be the contact page, people working over here!!!");
});

app.get('/aboutme',(req,res) => {
    res.render('about.html');
});

app.get('/exc/:message',(req,res) => {
    console.log("Message from client: ", req.params.message);
    
    var msj = req.params.message;
    var vowels = '';
    var allVowels = ['a','e','i','o','u'];
    
    

    // 1 travel the msj string and print on the console each letter
    for (var i=0;i<msj.length;i++){
        var letter = msj[i];
        console.log(letter);
    // 2 check if each letter is a vowel
        if (allVowels.indexOf(letter.toLowerCase()) != -1){
            //  if it is, add the vowel to vowels string

            // 3 return each vowel ONLY ONCE
            // hello -> eo
            // this is a test => iae

            // DECIDE
                /* if (vowels.indexOf(letter.toLowerCase())= -1) {
                    vowels += letter;
                } */
                
                var vow = letter;
                if (!vowels.includes(vow)){
                    vowels += vow;
                }
        }

    };



    res.status(202);
    res.send(vowels);
});


//HOMEWORK

app.get('/forexample',(req,res) => {
    res.send("<h1 style='color:blue;'> Here will be examples. <h1>");
});
app.get('/about',(req,res) => {
    res.send("<h1 style='color:blue;'> About what... <h1>");
});

/*********************************************
 * API END POINTS
 **********************************************/
app.post('/api/items',(req,res)=>{
    console.log("clients wants to store items");

    var item = req.body;
    item.id = itemList.length + 1; // create a consecutive id
    itemList.push(item);

    res.status(201); // 201=> created
    res.json(item); // return the item as json
});

app.get('/api/items',(req,res)=>{
    res.json(itemList);
});


/*********************************************
 * START Server
 **********************************************/


app.listen(8080,function(){
    console.log("Server running at http://localhost:8080");
    console.log("Press Ctrl+C to kill it");
});