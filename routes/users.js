var express = require('express');
var router = express.Router();

const CLIENT_ID = '446524906437-lhb7qotm0adcd8j891vm50ol8t1p0u5h.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'covidtracerapplication@gmail.com',
        pass: 'thefellas1!'
    }
});



router.post('/login', function(req, res, next) {
  var typeLogin=req.body.type;
    var user=0;
    var venMan=0;
    var HO=0;
    if(typeLogin=="venuemanager")
      {
        venMan=1;
      }
      else if(typeLogin=="healthofficial")
      {
        HO=1;
      }
  if( 'user' in req.body && 'pass' in req.body) {
  req.pool.getConnection(function(err,connection)
  {
      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var email=req.body.user;
      var pass=req.body.pass;
      var isHOorVenman=0;

      var query=`SELECT userID, given_name,isVenueManager,isHealthOfficial  FROM users WHERE email= ? AND  password=SHA2(?,256) AND isUser=?;`;
      if(typeLogin=="venuemanager")
      {
        isHOorVenman=1;
        query=`SELECT userID, given_name,isVenueManager,isHealthOfficial FROM users WHERE email= ? AND  password=SHA2(?,256) AND isVenueManager=?`;
      }
      else if(typeLogin=="healthofficial")
      {
        isHOorVenman=1;
        query=`SELECT userID, given_name,isVenueManager,isHealthOfficial FROM users WHERE email= ? AND  password=SHA2(?,256) AND isHealthOfficial=?`;

      }


      connection.query(query,[email,pass,isHOorVenman],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
            // res.send(req.session.user);
            if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }
            req.session.user = rows;
            res.json(rows);


              });
          });
        }

        else if( 'token' in req.body ) {

        async function verify() {
          const ticket = await client.verifyIdToken({
              idToken: req.body.token,
              audience: CLIENT_ID,
          });
          const payload = ticket.getPayload();
          req.pool.getConnection( function(err,connection) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                var query = `SELECT userID, given_name,isVenueManager,isHealthOfficial
                                FROM users WHERE email = ? AND isUser=?;`;
                connection.query(query,[payload['email'],user,venMan,HO], function(err, rows, fields) {
                  connection.release(); // release connection
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                  }
                  if(rows.length > 0){
                      req.session.user = rows;
                      res.json(rows);

                  } else {

                      res.sendStatus(401);
                  }
                });
            });
        }
        verify().catch(function(){res.sendStatus(401);});

    } else {
        res.sendStatus(400);
    }

});

router.post('/logout', function(req, res, next) {

    delete req.session.user;
    res.sendStatus(200);

});

router.post('/signup', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var first_name=req.body.first_name;
      var last_name=req.body.last_name;
      var dob=req.body.dob;
      var phone_num=req.body.phone_num;
      var email=req.body.email;
      var streetnum=req.body.streetnum;
      var streetname=req.body.streetname;
      var suburb=req.body.suburb;
      var postcode=req.body.postcode;
      var state=req.body.state;
      var password=req.body.password;
      var venman=req.body.venMan;
      var HO=0;
      var emailnoti=req.body.emailNoti;
      // if(venman==1)
      // {
      //   checkVen=1;
      // }

      var query=`INSERT INTO users
                 (given_name,surname,street_number,street_name,surburb,state,postcode,
                 contact_number,date_of_birth,email,password,isVenueManager,isHealthOfficial,isUser,emailNotification)
                 VALUES (?,?,?,?,?,?,?,?,?,?,SHA2(?,256),?,?,0,?);`;

      connection.query(query,[first_name,last_name,streetnum,streetname,suburb,state,postcode,phone_num,dob,email,password,venman,HO,emailnoti],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
            res.end();

      });


  });


  });
router.post('/signupAdmin', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var first_name=req.body.first_name;
      var last_name=req.body.last_name;
      var dob=req.body.dob;
      var phone_num=req.body.phone_num;
      var email=req.body.email;
      var streetnum=req.body.streetnum;
      var streetname=req.body.streetname;
      var suburb=req.body.suburb;
      var postcode=req.body.postcode;
      var state=req.body.state;
      var password=req.body.password;
      var HO=1;
      var venman=0;
      // if(venman==1)
      // {
      //   checkVen=1;
      // }

      var query=`INSERT INTO users
                 (given_name,surname,street_number,street_name,surburb,state,postcode,
                 contact_number,date_of_birth,email,password,isVenueManager,isHealthOfficial,isUser)
                 VALUES (?,?,?,?,?,?,?,?,?,?,SHA2(?,256),?,?,0);`;

      connection.query(query,[first_name,last_name,streetnum,streetname,suburb,state,postcode,phone_num,dob,email,password,venman,HO],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }

            res.end();

      });


  });


  });


router.use(function(req, res, next) {
    if('user' in req.session){
        next();
    } else {
        res.sendStatus(401);
    }
});

router.post('/checkuser', function(req, res, next) {
  res.send('respond with a resource');
});


//sends all checkins for a user in descending order from most recent checkin
router.get('/displayAllCheckins', function(req,res,next){
    req.pool.getConnection(function (err, connection)
    {
        var userIDObject = req.session.user;
        var userID = userIDObject[0].userID;

         let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?)`;

        connection.query(query, [userID], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
    });
});


router.get('/checkInsUser', function(req, res, next)
{
    var vnameBool = true;
    var streetNumberBool = true;
    var streetNameBool = true;
    var suburbBool = true;
    var postcodeBool = true;
    var stateBool = true;
    var checkinDateBool = true;
    var startTimeBool = true;
    var endTimeBool = true;

    var userObject = req.session.user;
    console.log(userObject);
    var userID = userObject[0].userID;
    console.log(userID);

    if (req.query.vname === undefined){
        vnameBool = false;
    }
    if (req.query.stNum === undefined){
        streetNumberBool = false;
    }
    if (req.query.stName === undefined){
        streetNameBool = false;
    }
    if (req.query.suburb === undefined){
        suburbBool = false;
    }
    if (req.query.postcode === undefined){
        postcodeBool = false;
    }
    if (req.query.state === undefined){
        stateBool = false;
    }
    if (req.query.date === undefined){
        checkinDateBool = false;
    }
    if (req.query.sTime === undefined){
        startTimeBool = false;
    }
    if (req.query.eTime === undefined){
        endTimeBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }


        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 0");

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?)`;

            connection.query(query, [userID], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }


        if (vnameBool === true && streetNumberBool === true && streetNameBool === true && suburbBool === true && postcodeBool === true && stateBool === true && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 1");
            let vname = req.query.vname;
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;
            let suburb = req.query.suburb;
            let postcode = req.query.postcode;
            let state = req.query.state;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime + ":00";
            let endTime = req.query.eTime + ":00";


            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?
                    AND venue.state = ?
                    AND venue.postcode = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[userID, vname, streetNumber, streetName, suburb, state, postcode, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 2");
            let vname = req.query.vname;
            console.log(vname);

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?)`;


            connection.query(query,[userID, vname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 3");
            let vname = req.query.vname;
            let checkinDate = req.query.date;


            let query = `SELECT venue.venue_name, checkins.checkindate
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[userID, vname, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 4");
            let vname = req.query.vname;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";



            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[userID, vname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 5");
            let checkinDate = req.query.date;



            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[userID, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === true && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 6");
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;



            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?)`;


            connection.query(query,[userID, streetNumber, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 7");
            let streetName = req.query.stName;


            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_name = ?)`;


            connection.query(query,[userID, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === true && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 8");
            let streetName = req.query.stName;
            let suburb = req.query.suburb;



            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?)`;


            connection.query(query,[userID, streetName, suburb], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 9");
            let streetName = req.query.stName;
            let postcode = req.query.postcode;


            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_name = ?
                    AND venue.postcode = ?)`;


            connection.query(query,[userID, streetName, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 10");
            let postcode = req.query.postcode;


            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.postcode = ?)`;


            connection.query(query,[userID, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 11");
            let state = req.query.state;


            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.state = ?)`;


            connection.query(query,[userID, state], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 12");
            let state = req.query.state;
            let checkinDate = req.query.date;


            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.state = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[userID, state, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            let postcode = req.query.postcode;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";



            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.postcode = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[userID, vname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }
    });
});

//sends all active hotspots
router.get('/displayAllHotspots', function(req,res,next){
    req.pool.getConnection(function (err, connection)
    {

         let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date
                    FROM hotspots
                    INNER JOIN venue
                    ON hotspots.venueID = venue.venueID`;

        connection.query(query, function (err, rows, fields)
        {
            connection.release();
            if (err)
            {
                res.sendStatus(500);
                return;
            }

            console.log(rows);
            res.json(rows);
            res.end();
        });
    });
});


router.get('/manageHotspots', function(req, res, next)
{
    var vnameBool = true;
    var streetNumberBool = true;
    var streetNameBool = true;
    var suburbBool = true;
    var postcodeBool = true;
    var stateBool = true;
    var startDateBool = true;

    if (req.query.vname === undefined){
        vnameBool = false;
    }
    if (req.query.stNum === undefined){
        streetNumberBool = false;
    }
    if (req.query.stName === undefined){
        streetNameBool = false;
    }
    if (req.query.suburb === undefined){
        suburbBool = false;
    }
    if (req.query.postcode === undefined){
        postcodeBool = false;
    }
    if (req.query.state === undefined){
        stateBool = false;
    }
    if (req.query.date === undefined){
        startDateBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 0");

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date
                    FROM hotspots
                    INNER JOIN venue
                    ON hotspots.venueID = venue.venueID`;


            connection.query(query, function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }


        if (vnameBool === true && streetNumberBool === true && streetNameBool === true && suburbBool === true && postcodeBool === true && stateBool === true && startDateBool === true)
        {
            console.log("scenario 1");
            vname = req.query.vname;
            streetNumber = req.query.stNum;
            streetName = req.query.stName;
            suburb = req.query.suburb;
            postcode = req.query.postcode;
            state = req.query.state;
            startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.venue_name = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?
                    AND venue.state = ?
                    AND venue.postcode = ?
                    AND hotspots.start_date = ?)`;


            connection.query(query,[vname, streetNumber, streetName, suburb, state, postcode, startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 2");
            let vname = req.query.vname;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.venue_name = ?)`;


            connection.query(query,[vname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === true)
        {
            console.log("scenario 3");
            let vname = req.query.vname;
            let startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.venue_name = ?
                    AND hotspots.start_date = ?)`;


            connection.query(query,[vname, startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === true)
        {
            console.log("scenario 4");
            let startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (hotspots.start_date = ?)`;


            connection.query(query,[startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === true && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 6");
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_number = ?
                    AND venue.street_name = ?)`;


            connection.query(query,[streetNumber, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 7");
            let streetName = req.query.stName;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_name = ?)`;


            connection.query(query,[streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === true && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 8");
            let streetName = req.query.stName;
            let suburb = req.query.suburb;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_name = ?
                    AND venue.suburb = ?)`;


            connection.query(query,[streetName, suburb], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === true && stateBool === false && startDateBool === false)
        {
            console.log("scenario 9");
            let streetName = req.query.stName;
            let postcode = req.query.postcode;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_name = ?
                    AND venue.postcode = ?)`;

            connection.query(query,[streetName, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && startDateBool === false)
        {
            console.log("scenario 10");
            let postcode = req.query.postcode;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.postcode = ?)`;


            connection.query(query,[postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && startDateBool === false)
        {
            console.log("scenario 11");
            let state = req.query.state;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.state = ?)`;


            connection.query(query,[state], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && startDateBool === true)
        {
            console.log("scenario 12");
            let state = req.query.state;
            let startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.phone_number, hotspots.start_date, hotspots.start_time
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.state = ?
                    AND hotspots.start_date = ?)`;


            connection.query(query,[state, startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }
    });
});


router.get('/getVenueID', function(req,res,next){

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }

        let object = req.session.user;
        let venueManagerID = object[0].userID;

        let query = `SELECT venueID FROM venue WHERE (venue_manager = ?)`

        connection.query(query,[venueManagerID], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
    });
});


router.get('/showVenueID', function(req,res,next){
   req.pool.getConnection(function (err, connection)
    {
        var sessionObject = req.session.user;
        var userID = sessionObject[0].userID;

        var query = `SELECT venueID FROM venue WHERE (venue_manager = ?)`;
        connection.query(query, [userID], function (err, rows, fields)
        {
            connection.release();
            if (err){
                res.sendStatus(500);
                return;
            }

            res.json(rows);
            res.end();
        });
    });
});


router.get('/checkinsVenue', function(req, res, next)
{
    var firstNameBool = true;
    var surnameBool = true;
    var checkinDateBool = true;
    var startTimeBool = true;
    var endTimeBool = true;

    if (req.query.fname === undefined){
        firstNameBool = false;
    }
    if (req.query.sname === undefined){
        surnameBool = false;
    }
    if (req.query.date === undefined){
        checkinDateBool = false;
    }
    if (req.query.sTime === undefined){
        startTimeBool = false;
    }
    if (req.query.eTime === undefined){
        endTimeBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }

        if (req.query.venueID == null){
            res.sendStatus(500);
            return
        }


        if (firstNameBool === true && surnameBool === true && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 1");
            let venueID = req.query.venueID;
            let firstName = req.query.fname;
            let surname = req.query.sname;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime + ":00";
            let endTime = req.query.eTime + ":00";

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                        FROM users
                        INNER JOIN checkins
                        ON users.userID = checkins.userID
                        INNER JOIN venue
                        ON checkins.venueID = venue.venueID
                    WHERE (venue.venueID = ?
                    AND users.given_name = ?
                    AND users.surname = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[venueID, firstName, surname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === true && surnameBool === true && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 2");
            let venueID = req.query.venueID;
            let firstName = req.query.fname;
            let surname = req.query.sname;
            let checkinDate = req.query.date;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                        FROM users
                        INNER JOIN checkins
                        ON users.userID = checkins.userID
                        INNER JOIN venue
                        ON checkins.venueID = venue.venueID
                        WHERE (venue.venueID = ?
                        AND users.given_name = ?
                        AND users.surname = ?
                        AND checkins.checkindate = ?)`;


            connection.query(query,[venueID, firstName, surname, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === true && surnameBool === true && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 3");
            let venueID = req.query.venueID;
            let firstName = req.query.fname;
            let surname = req.query.sname;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                        FROM users
                        INNER JOIN checkins
                        ON users.userID = checkins.userID
                        INNER JOIN venue
                        ON checkins.venueID = venue.venueID
                        WHERE (venue.venueID = ?
                        AND users.given_name = ?
                        AND users.surname = ?)`;


            connection.query(query,[venueID, firstName, surname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 4");
            let venueID = req.query.venueID;
            let checkinDate = req.query.date;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                        FROM users
                        INNER JOIN checkins
                        ON users.userID = checkins.userID
                        INNER JOIN venue
                        ON checkins.venueID = venue.venueID
                        WHERE (venue.venueID = ?
                        AND checkins.checkindate = ?)`;


            connection.query(query,[venueID, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

    });
});


//checkins - admin

router.get('/checkinsAdmin', function(req, res, next)
{
    var firstNameBool = true;
    var surnameBool = true;

    var vnameBool = true;
    var streetNumberBool = true;
    var streetNameBool = true;
    var suburbBool = true;
    var postcodeBool = true;
    var stateBool = true;

    var checkinDateBool = true;
    var startTimeBool = true;
    var endTimeBool = true;

    if (req.query.fname === undefined){
        firstNameBool = false;
    }
    if (req.query.sname === undefined){
        surnameBool = false;
    }
    if (req.query.vname === undefined){
        vnameBool = false;
    }
    if (req.query.stNum === undefined){
        streetNumberBool = false;
    }
    if (req.query.stName === undefined){
        streetNameBool = false;
    }
    if (req.query.suburb === undefined){
        suburbBool = false;
    }
    if (req.query.postcode === undefined){
        postcodeBool = false;
    }
    if (req.query.state === undefined){
        stateBool = false;
    }
    if (req.query.date === undefined){
        checkinDateBool = false;
    }
    if (req.query.sTime === undefined){
        startTimeBool = false;
    }
    if (req.query.eTime === undefined){
        endTimeBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            console.log(err);
            res.sendStatus(500);
            return;
        }


        if (firstNameBool === true && surnameBool === true && vnameBool === true && streetNumberBool === true && streetNameBool === true && suburbBool === true && postcodeBool === true && stateBool === true && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 1");
            let firstName = req.query.fname;
            let surname = req.query.sname;
            let venueName = req.query.vname;
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;
            let suburb = req.query.suburb;
            let postcode = req.query.postcode;
            let state = req.query.state;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime + ":00";
            let endTime = req.query.eTime + ":00";

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.given_name = ?
                    AND users.surname = ?
                    AND venue.venue_name = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?
                    AND venue.state = ?
                    AND venue.postcode = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[firstName, surname, streetNumber, streetName, suburb, postcode, state, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === true && surnameBool === true && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 2");
            let firstName = req.query.fname;
            let surname = req.query.sname;
            let checkinDate = req.query.date;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.given_name = ?
                    AND users.surname = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[firstName, surname, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === true && surnameBool === true && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 3");
            let firstName = req.query.fname;
            console.log(firstName);
            let surname = req.query.sname;
            console.log(surname);


            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.given_name = ?
                    AND users.surname = ?)`;


            connection.query(query,[firstName, surname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 4");
            let checkinDate = req.query.date;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (checkins.checkindate = ?)`;


            connection.query(query,[checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 2");
            let vname = req.query.vname;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.venue_name = ?)`;


            connection.query(query,[vname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 3");
            let vname = req.query.vname;
            let checkinDate = req.query.date;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.venue_name = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[vname, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 4");
            let vname = req.query.vname;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.venue_name = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[vname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === true && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 6");
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.street_number = ?
                    AND venue.street_name = ?)`;

            connection.query(query,[streetNumber, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 7");
            let streetName = req.query.stName;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.street_name = ?)`;


            connection.query(query,[streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === true && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 8");
            let streetName = req.query.stName;
            let suburb = req.query.suburb;

            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.street_name = ?
                    AND venue.suburb = ?)`;


            connection.query(query,[streetName, suburb], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 9");
            let streetName = req.query.stName;
            let postcode = req.query.postcode;


            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.street_name = ?
                    AND venue.postcode = ?)`;


            connection.query(query,[streetName, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 10");
            let postcode = req.query.postcode;


            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.postcode = ?)`;


            connection.query(query,[postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 11");
            let state = req.query.state;


            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.state = ?)`;


            connection.query(query,[state], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 12");
            let state = req.query.state;
            let checkinDate = req.query.date;


            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.state = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[state, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            let postcode = req.query.postcode;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";



            let query = `SELECT users.userID, users.contact_number, venue.venueID, venue.phone_number, checkins.checkindate, checkins.checkintime, users.given_name, users.surname, checkins.checkindate, checkins.checkintime, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.suburb, venue.state, venue.postcode
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.postcode = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[postcode, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

    });
});



router.post('/addVenue', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var user=req.session.user;
      var userID=user[0].userID;


      var query=`INSERT INTO venue (venue_manager)
                VALUES (?);`;

      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }


            res.end();



      });



  });

  });

  router.post('/updateVenue', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var venueName1=req.body.venueName;
      var vcontactNum=req.body.contactNum;
      var vcapacity=req.body.capacity;
      var streetNum=req.body.streetnum;
      var streetName=req.body.streetname;
      var vsuburb=req.body.suburb;
      var vpostcode=req.body.postcode;
      var vstate=req.body.state;

      var user=req.session.user;
      var userID=user[0].userID;

      var query=`UPDATE venue
                SET venue_name = ?, capacity= ?, street_number=? , street_name=? , suburb=? , state=? , postcode=?, phone_number=?
                WHERE venue_manager=?;`;
      connection.query(query,[venueName1,vcapacity,streetNum,streetName,vsuburb,vstate,vpostcode,vcontactNum,userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }

            res.sendStatus(200);

      });


  });


  });

  router.post('/updateUser', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var firstName=req.body.givenName;
      var surname=req.body.surname;
      var dob=req.body.dob;
      var contactNo=req.body.contactNo;
      var email=req.body.email;
      var streetnum=req.body.streetnum;
      var streetname=req.body.streetname;
      var suburb=req.body.suburb;
      var postcode=req.body.postcode;
      var state=req.body.state;
      var emailNotification=req.body.emailNoti;

      var user=req.session.user;
      var userID=user[0].userID;

      var query=`UPDATE users
                SET given_name = ?, surname= ?, street_number=? , street_name=? , surburb=? , state=? , postcode=?, contact_number=?,
                date_of_birth=?, email=?,emailNotification=?
                WHERE userID=?;`;
      connection.query(query,[firstName,surname,streetnum,streetname,suburb,state,postcode,contactNo,dob,email,emailNotification,userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }

            res.end();

      });


  });


  });


  router.post('/createhotspot', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var venueID=req.body.venueid;
      var startDate=req.body.startDate;
      var startTime=req.body.startTime;

      var user=req.session.user;
      if(user[0].isHealthOfficial==1){
        var userID=user[0].userID;
      }

      var query=`INSERT INTO hotspots (venueID,hoID,start_date,start_time)
                  VALUES (?,?,?,?);`;
      connection.query(query,[venueID,userID,startDate,startTime],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }

            res.end();

      });
  });
  });

  router.post('/hotspots', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }



      var query=`SELECT venue.venueID,street_number,street_name,suburb,state,postcode
                  FROM venue
                  INNER JOIN hotspots
                  ON venue.venueID=hotspots.venueID;`;
      connection.query(query,function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          res.json(rows);

      });
  });
  });

  router.post('/checkAdmin', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;


      var query=`SELECT userID, given_name,isVenueManager
                                FROM users WHERE userID = ? AND isHealthOfficial=1;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);
      });
  });
  });
  router.post('/checkVenman', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;


      var query=`SELECT userID, given_name,isVenueManager
                                FROM users WHERE userID = ? AND isVenueManager=1;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);
      });
  });
  });

router.get('/userInfo', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;

      var query=`SELECT userID,given_name,surname,street_number,street_name,surburb,state,postcode,contact_number, date_of_birth, email,emailNotification
                                FROM users WHERE userID = ?;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);
      });
  });
  });


router.post('/deleteHotspot', function(req,res,next)
{
    req.pool.getConnection(function(err,connection)
  {
       if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }

        var hotspotID = req.body.text;
        hotspotID = parseInt(hotspotID);
        var query = `DELETE FROM hotspots WHERE hotspotID = ?`;

        connection.query(query,[hotspotID],function(err,rows,fields)
      {
        connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.sendStatus(200);
      });
  });
});


  router.post('/checkIN', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {

      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var user=req.session.user;
        var userID=user[0].userID;
      var venueID=req.body.venueCheckin;
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var today1 = new Date();
      var time = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();

      var query=`INSERT INTO checkins (checkindate,checkintime,userID,venueID)
                VALUES (?,?,?,?);`;

      connection.query(query,[date,time,userID,venueID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
            res.sendStatus(200);

      });


  });


  });

  router.get('/venueInfo', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;

      var query=`SELECT venue_name,capacity,street_number,street_name,suburb,state,postcode,phone_number
                                FROM venue WHERE venue_manager = ?;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);
      });
  });
  });

  router.post('/userCheckins', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
        var user=req.session.user;
        var userID=user[0].userID;


      var query=`SELECT DISTINCT venue.venueID, street_number, street_name,suburb,state,state,postcode
                FROM venue
                INNER JOIN checkins
                ON venue.venueID=checkins.venueID
                AND userID=?;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          res.json(rows);

      });
  });
  });

router.post('/deleteUser', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {

      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var userId=req.body.userID;

      var query=`DELETE FROM users
                 WHERE userID=?`;

      connection.query(query,[userId],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;

          // res.json(rows);

            res.sendStatus(200);

      });


  });


  });

router.post('/deleteVenue', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {

      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var venueId=req.body.venueID;

      var query=`DELETE FROM venue
                 WHERE venueID=?`;

      connection.query(query,[venueId],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;

          // res.json(rows);

            res.sendStatus(200);

      });


  });


  });

  router.post('/getEmail', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {

      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var query=`SELECT DISTINCT users.email,users.userID
                FROM users WHERE emailNotification=1;`;

      connection.query(query,function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;

            res.json(rows);



      });


  });


  });

  router.post('/emailCurrentHotspots', function(req,res,next)
{
      req.pool.getConnection(function(err,connection)
    {
      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var emails=req.body.emails;


     var query = `SELECT DISTINCT venue.venue_name,venue.street_number,venue.street_name,venue.suburb,venue.state,
                    venue.postcode,venue.phone_number
                FROM hotspots INNER JOIN venue ON hotspots.venueID = venue.venueID;`;

      connection.query(query,function(err,rows,fields)
      {

          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          var j=0;
          var email_text="";
          for(;rows[j];){
          email_text = email_text+`<li>${rows[j].venue_name}: ${rows[j].street_number}, ${rows[j].street_name}
                            ${rows[j].suburb}, ${rows[j].state} ${rows[j].postcode}
                            and phone number is: ${rows[j].phone_number}</li>`;
                            j++;
          }
          var i=0;
        for(;emails[i];){
            const mailOptions = {
      from: 'covidtracerapplication@gmail.com', // sender address
      to: emails[i].email, // list of receivers
      subject: "Current Hotspots", // Subject line
      html: `<p>Current Hotspots</p>
             <ul>${email_text}</ul>
             <p>From the Fellas org.</p>
             <p>Please do not reply, this email is not monitored, its a robot actually</p>` // plain text body
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
    i++;
        }

    res.send();
});
          res.end();
      });
  });


module.exports = router;
