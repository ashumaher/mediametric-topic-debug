var MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    app = express();

const DB_CONNECTION_STRING = 'mongodb://10.1.1.55:27021/live-articles';

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.status(200).render('index.jade');
});

app.get('/topic/:id', function (req, res) {
    res.status(200).render('topic.jade');
});

app.get('/*', function (req, res) {
    res.status(200).render('404.jade');
});

//MongoClient.connect(DB_CONNECTION_STRING, function(err, db) {
//    var collection = db.collection('CompositeArticle_Agg');
//
//    collection.findOne({
//        _id: 151264
//    }, function (err, item) {
//        console.log(item);
//        db.close();
//    });
//});

app.listen(3000);