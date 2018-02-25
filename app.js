var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
// ... other imports
const path = require("path");

//mongoose.connect('mongodb://localhost:27017/linkedin');
mongoose.connect('mongodb://test:test@ds247838.mlab.com:47838/linkedin');

app.use(cors()); //use cors as a middleware
// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use(bodyParser.json());

app.get('/api/test', function(req,res){
  res.send('hello api');
})

app.post('/api/register',function(req,res){
  //console.log(req.body);
  User.findOne({email: req.body.email}, function(error,user){
    if(user){
      return res.send({status: 'error', message: 'User already exists'});
    }
    if(error){
      return res.send({status: 'error', message: 'Something went wrong'});
    }

      User.create(req.body)
        .then(function(user){
          res.send({status: 'Success', message: 'User created in database'});
        })
        .catch(function(error){
          console.log(error);
        });
      });
});

app.post('/api/login',function(req,res){
    //console.log(req.body);
    User.findOne(req.body)
    .then(function(user){
      if(!user){
        return res.send({status: 'error',message: 'no user found'});
      }
      //console.log(user);
      res.send(user);
    })
    .catch(function(error){
      console.log(error);
      return res.send({status: 'error',message: 'no user found'});
    })
})

app.get('/api/members',function(req,res){
  User.find({})
  .then(function(members){
    res.send(members);
  })
  .catch(function(error){
    return re.send({status: 'error', message:'Something went wrong'})
  });

});


app.get('/api/members/:id',function(req,res){
  //console.log(req.body);
  User.findById(req.params.id)
  .then(function(user){
    //console.log(user);
    if(!user){
      return res.send({status: 'error', message: 'User not found'});
    }
    res.send(user);
  })
  .catch(function(error){
    return res.send({status: 'error', message: 'Something went wrong'});
  });
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 8080, function(){
  console.log("listening on port 8080");
})
