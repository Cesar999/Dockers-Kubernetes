import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

//npm install @types/node

//const url_mongo = "mongodb://database"; //Docker Compose
const url_mongo = "mongodb://localhost"; //Localhost

const connectWithRetry = function() {
    return mongoose.connect(url_mongo+'/docker-db-ex2', { useNewUrlParser: true },
    function(err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
    });
  };
  
  connectWithRetry();

  const Schema = mongoose.Schema;
  const pokSchema = new Schema({
    name: {type: String},
    type: {type: String},
    level: {type: Number}
});

interface Pok {
    name: string;
    type: string;
    level: number;
}

const Pok = mongoose.model('Pok', pokSchema, 'Pok');

//-------------------------------------

const app = express();
const port = 3001;
app.use(bodyParser.json());

const server = app.listen(port, () => {
    console.log(`Notification Service port 3001`);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.post('/get-pok', function(req, res) {
    Pok.findOne({...req.body})
    .then((u:Pok) => {
        res.send(u);
    })
    .catch((e) => {
     });
});

app.post('/save-pok', function(req, res) {
    const pok1 = new Pok({...req.body});

    Pok.findOne({name: pok1.name})
    .then((u) => {
        if(u){
            return Promise.resolve(null);
        } else{
            return pok1.save();
        }   
    })
    .then((flag) => {
        if(flag){
            res.send({msg: 'Saved'});
        } else {
            res.send({msg: 'Repeated'});
        }
    })
    .catch((e) => {
    });
});
