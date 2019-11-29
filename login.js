var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');

var app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

/**Typical node server setup */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//For the Json Web Token
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var fs = require('file-system');

var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');
var jwtOptions = {
  /**And here comes the option for the JWT, based on npm doc(Json Web Token Package), there are several options available like algorithm,
   * notbefore and so on */
  //For developing test, set short expire time without specific unit then it  is "sec"
  expiresIn: 600,
  issuer: 'SurveyApp',
  audience: 'http://localhost:3001/',
  algorithm: 'RS256'
};

//Here setting for the express jsonwebtoken middleware
//So to say simply required for express to properly utilize the token for request
//secret must be same that will be sent to client
const jwtMW = exjwt({
  secret: /*'ouluOnKaupunki'*/ publicKEY
});

//Most important part verifying the client password to login
//if validation success, server sends back json res with valid jwt for the user to use it
router.post('/', (req, res) => {
  const { account, password } = req.body;
  var sql = require('./database');
  sql.query(
    'select account.account as account, account.password as password, account.id as owner, user.id as id, user.email as email, user.type as type from account inner join user on account.id=user.accountFK where account = ?',
    [account],
    function(error, results, fields) {
      if (error) {
        res.json({
          status: false,
          message: 'there are some error with query'
        });
      } else {
        if (results.length > 0) {
          /**Here checking the password hashed with bcrpyt */
          bcrypt.compare(password, results[0].password, function(err, ress) {
            if (!ress) {
              res.json({
                status: false,
                message: 'Account and password does not match'
              });
            } else {
              /* Here starts setting json web token with npm package  */
              let token = jwt.sign(
                /**Here is the payload
                 * typically some data required to use in client side
                 * can be used when decoded*/ {
                  account: account,
                  id: results[0].id,
                  email: results[0].email,
                  type: results[0].type,
                  owner: results[0].owner
                },

                /**and here is secret key normally
                 * it would be difficult unrecongized random text or generated like where teacher's reference article
                 *
                 * From my own experience ------!!
                 * !!!!!In the private key begin tag and end tag must included!!!!!!!! */

                /* This was the test text secret key 'ouluOnKaupunki' */

                privateKEY,

                /**Here comes the option for the json web token
                 * i set the expire time, audience, algorithm, issuer
                 * up there*/
                jwtOptions
              );
              res.json({
                status: true,
                message: 'Successfully Login',
                err: null,
                /**return the generated token */
                token
              });
            }
          });
        } else {
          res.json({
            status: false,
            message: 'Account does not exits'
          });
        }
      }
    }
  );
});


/**From here, testing scripts for own study,
 * which is not used at all for this survey app project
 */
app.get('/exjwt', jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log('Web Token Checked.');
  res.json({
    auth: true
  });
  res.send('You are authenticated'); //Sending some response when authenticated
});

app.post('/jwt', (req, res) => {
  var legit = jwt.verify(req.body.token, publicKEY, jwtOptions);
  res.json({
    info: JSON.stringify(legit)
  });
  JSON.stringify(res);
});

//jwt Until here

module.exports = router;
