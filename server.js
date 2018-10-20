    const express       = require('express');
    const compression   = require('compression');
    var minify          = require('express-minify');
    const helmet        = require('helmet');
    const app           = express();
    var store = require('store');
// import store from 'store';
    const server        = require('http').createServer(app);
    const io            = require('socket.io').listen(server);
    
    const port          = process.env.PORT || 3000;
    const mongoose      = require('mongoose');
    const logger        = require('morgan');
    const path          = require('path');
    const config         = require('./config/db');
    const bodyParser    = require('body-parser');
    const router        = express.Router();
    const appRoutes     = require('./routes/api')(router,io);



    // make use of morgan logger Middleware

    // BodyParser Middleware
    app.use(compression());
    // app.use(minify());
    app.use(helmet());
    

    // app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, '/node_modules')));
     app.use('/', appRoutes);
    app.get('/', function(req,res){
        res.sendFile(path.join(__dirname + '/public/views/index.html'));
        // var ip= req.header('x-forwarded-for') || req.connection.remoteAddress;
        //             localStorage.setItem('uIp',ip);
        //             
              

    });
    
    
    // Connecting to Mongodb Database
    mongoose.connect(config.db,function(err){
        if(err){
            console.log('Connection to Database Failed '+ err);

        }else{
             console.log('Connected to the Database '+config.db);
        }
    });



    // mongoose.connection.on('connected', function(){
    //     console.log('Connected to the Database '+config.db);
    // });

    // mongoose.connection.on('err', function(err){
    //     console.log('Connection to Database Failed '+ err);
    // });
    mongoose.promise= global.promise;
    connections =[];


    server.listen(port, function(){
        console.log('Server started on port :'+ port);
    });