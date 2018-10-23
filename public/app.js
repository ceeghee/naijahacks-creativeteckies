(function(){

        angular.module('votera',['voteController','castController','ngMaterial'])
        .config(['$httpProvider',function($httpProvider){
            $httpProvider.interceptors.push('AuthInterceptors');

        }])

        // .filter('startFrom',function(){
        //     return function(data,start){
        //         // start = 0 + start;
        //         return data.slice(start);
        //     }
        // });
        
})();
// 'ui.bootstrap',