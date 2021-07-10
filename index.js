require('dotenv').config();
const express = require('express');
const app = express();
const Classes = require('./models/day'); 

const mongoose = require('mongoose');
//const uri = "mongodb+srv://Seth:BlackFriday2015@cluster0.cttel.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/test";
console.log(process.env.URI)
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("ONLINE");
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

  if(doc == null) doc = null;

  res.send(doc);
});

app.get('/count', async(req, res) => {
  const docCount = await (await Classes.collection.countDocuments());
  res.send(docCount);
});

app.post('/', async(req, res) => {
  if (Classes.find(req.body))
  await Classes.create(req.body);
  res.send(Classes.collection.countDocuments());
});

app.delete('/', async(req, res) => {
  await Classes.deleteOne(req.body);
  res.send(Classes.collection.countDocuments());
});

app.put('/', async(req, res) => {
  await Classes.findOneAndUpdate(/*Filter ,Updated values*/);
  const updatedDoc = await (await Classes.collection.findOne(req.body)).toString();
  res.send(updatedDoc);
  console.log(updatedDoc);
});


app.listen(3000);