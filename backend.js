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

app.post('/topic/:id', function (req, res) {
    MongoClient.connect(DB_CONNECTION_STRING, function(err, db) {
        var collection;

        if (err) {
            res.json({
                error: err.message
            });
        } else {
            collection = db.collection('CompositeArticle_Agg');

            collection.findOne({
                _id: +req.params.id
            }, function (err, doc) {
                if (err) {
                    res.json({
                        error: err.message
                    });
                } else if (doc) {
                    res.json({
                        doc: doc
                    })
                } else {
                    res.json({
                        error: 'Nothing found'
                    });
                }

                db.close();
            });
        }
    });
});


app.listen(3000);