// var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./db/connection')
connectDB()

var indexRouter = require('./routes/index');
var tokenRouter = require('./routes/token');
var paiementsRouter = require('./routes/paiements');
var userRouter = require('./routes/user');
var lilibotRouter = require('./routes/lilibot');
const produitRouter = require('./routes/produit')
const panierRouter = require('./routes/panier')
const shopRouter = require('./routes/shop');
const serviceClientRouter = require('./routes/serviceClient')
const cagnotteRouter = require('./routes/cagnotte')
const partenaireRouter = require('./routes/partenaire')
const factureRouter = require('./routes/facture')

const cors = require('cors');
var app = express();
require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/token', tokenRouter);
app.use('/paiements', paiementsRouter);
app.use('/user', userRouter);
app.use('/chatbot', lilibotRouter);
app.use('/produits', produitRouter);
app.use('/paniers', panierRouter);
app.use('/shops', shopRouter);
app.use('/serviceClients', serviceClientRouter);
app.use('/cagnottes', cagnotteRouter);
app.use('/partenaires', partenaireRouter);
app.use('/factures', factureRouter);

app.use(function(req, res, next) { next(createError(404)); });
app.use(function(err, req, res, next) 
{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var port = 4000;
app.listen(port, () => console.log(` listening on port ${port}!`));

module.exports = app;
