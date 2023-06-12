const express = require('express');
const path = require('path');
const PORT = 8080;
const cors = require('cors')
const { pool } = require('./dbConnection');


const app = express();
// parses JSON from incoming request
app.use(express.json());
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

app.get('/styles', function (req,res) {
  res.sendFile(path.join(__dirname, '/client/styles.css'))
});


// Do not edit
const options = {
  lemon:  'yellow',
  lime: 'limegreen',
  tangerine: 'orange',
  grapefruit: 'lightcoral'
};

// #3 helper function 'getColor`
const getColor = (fruit) => {
if (options.color(fruit)){
  return options[fruit]
} else {
  return 'none'
}}


//   try { 
//     const [rows] = pool.query([fruit])
//     return rows 
//   }
//   catch (i) {console.log(i)}
// }


// #1 serve the colors.html page when /colors is visited
// DO NOT USE express.static

app.get('/colors', function (req,res) {
  res.sendFile(path.join(__dirname, '/client/colors.html'))
});

// app.get('/colors', cors(corsOptions), (req, res) => {
//   res.sendFile('./client/colors.html')

    // const indexHTMLPath = path.join(__dirname, './client/colors.html');
    // res.sendFile(indexHTMLPath);

// });

    
// #2 & #4 handle POST requests to /colors
app.post('/colors', (req, res) => {
  const { fruit } = req.body;
  const color = getColor(fruit);
  res.json({ color })
});

app.post('fruits, req,res') => {
  
}

app.post('/colors', cors(corsOptions), async (req, res) => {
  const { color } = req.body;
  ;
  console.log(rows);
  rows ? res.status(200).send({message: 'color selected'}) : res.status(400).send({message: "unable to create new data"});
})


// #6 serve styles.css - DO NOT use express.static()
app.get('/styles.css', () => {

});

// #5 Update functionality to database
app.put('/colors/:id/:fruit', async (req, res) => {
  const { model, make, color, price, carId } = req.body;
  const colorChange = await pool.query('UPDATE car SET model = ?, make = ?, color = ?, price = ? WHERE car_id = ?', [model, make, color, price, carId])
  res.send(colorChange)
});
    


// #7 unknown routes - 404 handler
// research what route to serve this for
app.get('', () => {
  
})

// Global error handling middleware
// You can leave this alone
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
