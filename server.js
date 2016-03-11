var   express = require('express')
	, app = express()
	, bodyParser = require('body-parser')
	, cors = require('cors')
	, port = 9001;
	
var mongojs = require('mongojs');

var db = mongojs('ecommerce', ['products']);

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(__dirname + '/public'));

app.post('/api/products', function(req, res){
    db.products.save(req.body, function(error, response){
        if(error) {
            return res.status(500).json(error);
        } else {
            return res.json(response);
        }
    });
});

app.get('/api/products', function(req, res){
    var query = req.query;
    db.products.find(query, function(err, response){
        if(err) {
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/products/:id', function(req, res){
    var idObj = {
        _id: req.params.id
    };
    db.products.findOne(idObj, function(err, response){
        if(err) {
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
});

app.put('/api/products/:id', function(req, res){
    if(!req.params.id){
        return res.status(400).send('id query needed');
    }
    var query = {
        _id: mongo.ObjectId(req.params.id)
    };
    db.products.update(query, req.body, function(error, response){
        if(error) {
            return res.status(500).json(error);
        } else {
            return res.json(response);
        }
    });
});

app.delete('/api/products/:id', function(req, res){
    if(!req.params.id){
        return res.status(400).send('id query needed');
    }
    var query = {
        _id: mongo.ObjectId(req.params.id)
    };
    db.products.remove(query, function(error, response){
        if(error) {
            return res.status(500).json(error);
        } else {
            return res.json(response);
        }
    });
});

db.on('connect', function() {
	console.log('database connected');
});



app.listen(port, function() {
	console.log('Listening on ' + port);
});