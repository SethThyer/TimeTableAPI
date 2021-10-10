require('dotenv').config();
const express = require('express');
const app = express();
const Classes = require('./models/day'); 
const mongoose = require('mongoose');

const uri = process.env.URI || "mongodb://localhost:27017/test";
const port = process.env.PORT || 3000;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.log("failed to connect");
  }
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("ONLINE", uri, port);
});

app.use(express.json());

app.get('/find/:weekIndex/:dayIndex', async(req, res) => {   
  const day = req.params.dayIndex.toString()

  let doc = await (await Classes.findOne(
  {
    "weekNum": req.params.weekIndex,
    "day": day
  }
  ));

  if(doc == null) doc = 'No Matching Document Found';

  res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // Stop site from blocking. relates to CORS
  res.send(doc);
});

app.get('/count', async(req, res) => {
  let docCount = await (await Classes.collection.countDocuments());
  res.send(docCount + " docs");
});

app.post('/', async(req, res) => {
  await Classes.create(req.body);
  res.send(Classes.collection.countDocuments());
});

app.delete('/', async(req, res) => {
  await Classes.deleteOne(req.body);
  res.send(Classes.collection.countDocuments());
});

app.put('/:weekIndex/:dayIndex', async(req, res) => {
  const day = req.params.dayIndex.toString();

  let doc = await (await Classes.findOne(
  {
    "weekNum": req.params.weekIndex,
    "day": day
  }
  ));
  if(doc == null) return res.send('No Matching Document Found');
  
  await Classes.updateOne(
    {
      "weekNum": req.params.weekIndex,
      "day": day
    },
    req.body
  );
  const updatedDoc = await (await Classes.collection.findOne(req.body)).toString();
  res.send(updatedDoc);
  console.log(updatedDoc);
});


app.listen(port);
