(function(){
    angular.module('authServices',[])

    .factory('Auth',['$http','AuthToken','$q',function($http,AuthToken,$q){
         authFactory = {};

        authFactory.login = function(loginData){
            return  $http.post('/api/authenticate',loginData).then(function(data){
                 AuthToken.setToken(data.data.token,data.data.udata);
                return data;
            });
        }

        authFactory.switchLive = function(online){
            return $http.post('/api/switchLive',online);
        }

        authFactory.itsLanding = function(online){
            return $http.get('/api/vcookies');
        }

        // Check if user is logged in
        authFactory.isLoggedIn = function(){
            if(AuthToken.getToken()){
                return true;
            }else{
                return false;
            }
        }
        // Log user Out
        authFactory.logout = function(){
            AuthToken.setToken();
        }

        authFactory.getUser = function(){
            if(AuthToken.getToken()){
                return $http.post('/api/me');
            }else{
                $q.reject({message : 'user has no access'});
            }
        }

        authFactory.validToken = function(){
            if(AuthToken.getToken()){
                return $http.post('/api/me').then(function(data){
                    if(data.data.success){
                        return true;
                    }else{
                        return false;
                    }
                })
            }
        }

        return authFactory;
    }])
    
    .factory('AuthToken',['$window',function($window){
        // var vdata = LiveTradeData.getBlob()
        // var _vData = JSON.parse(vdata);
          authTokenFactory ={};
          // var vvCD ={};
          //   var _ccd = {};
          //   _ccd.active = _vData.vvCD.active;
          //   _ccd.currencyIso= _vData.vvCD.currencyIso;
          //           vvCD.vvCD = _ccd;
          //   cData = angular.toJson(vvCD);
          //                           LiveTradeData.setBlob(cData);
          //       $window.localStorage.setItem('/vActiveP/',data);

        authTokenFactory.setToken = function(token,uData){
            if(token){
                var tokens ={};
                tokens.token = token;
                tokens.udata =uData;
                dtoken = angular.toJson( tokens );
            $window.localStorage.setItem('vT',dtoken);
            // $window.localStorage.setItem('/vActiveP/',uData);
            }else{
                $window.localStorage.removeItem('vT');
            // $window.localStorage.setItem('/vActiveP/',cData);
            }
        }

        authTokenFactory.getToken = function(){
            var data = $window.localStorage.getItem('vT');
            var ddata = JSON.parse(data);
            if(data!=null && typeof data != "undefined"){

            // return $window.localStorage.getItem('vT');
                return ddata.token;
            }
        }

        return authTokenFactory;
    }])/*Auth Token ends*/

    // price ticker-currency and trade datas
    .factory('LiveTradeData',['$window','$rootScope',function($window,$rootScope){
       
        liveTradeDataFactory ={};
        liveTradeDataFactory.setData = function(tdata){
            // socketio.on('vTdata',function(data){
                if(tdata){
                $window.localStorage.setItem('_vlTD',tdata);
                // $window.localStorage.('_vlTD')= angular.toJson(tdata);
                }else{

                }
            // });
        }
        liveTradeDataFactory.getData = function(){
            return $window.localStorage.getItem('_vlTD');
        }
        liveTradeDataFactory.setBlob = function(data){
            if(data){
                $window.localStorage.setItem('/vActiveP/',data);
            }
        }
        liveTradeDataFactory.getBlob = function(){
            return $window.localStorage.getItem('/vActiveP/');
        }
        return liveTradeDataFactory;
    }])

    /*Socket.io Factory*/
    .factory('socketio',['$rootScope',function($rootScope){
        var socket =  io.connect();
        return {
            on : function(eventName,callback){
                socket.on(eventName,function(){
                    var args = arguments;
                    $rootScope.$apply(function(){
                        callback.apply(socket,args);
                    });
                });
            },
            emit : function(eventName, data, callback){
                    socket.emit(eventName,data, function(){
                        var args = arguments;
                        $rootScope.apply(function(){
                            if(callback){
                                callback.apply(socket,args);
                            }
                        });
                    });
            }
        };
    }])
    

    .factory('AuthInterceptors',function(AuthToken){
        var authInterceptorsFactory = {};
        authInterceptorsFactory.request = function(config){

            var token= AuthToken.getToken();
            if(token){
                config.headers['x-access-token']= token;
            }
            return config;
        }

        return authInterceptorsFactory;
    });
})();