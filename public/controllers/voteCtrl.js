(function(){

      var app=  angular.module('voteController',['authServices']);
      app.controller('voteCtrl',['$http','$window','$timeout','$rootScope', funcMain]);
      app.directive('myTest', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/election/testing.tmpl.html',
       controller:'voteCtrl',
      controllerAs:'vote',
      scope: {
        name: '@',
      }
    }
  })
      app.directive('voterLogin', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/election/voter-login.html',
       controller:'voteCtrl',
      controllerAs:'vote',
      scope: {
        name: '@',
      }
    }
  })
      app.directive('castVote', function () {
        return {
          restrict: 'E',
          templateUrl: 'views/election/cast-vote.html',
           controller:'castCtrl',
          controllerAs:'cast',
          scope: {
            name: '@',
          }
        }
      })
            function funcMain($http,$window,$timeout,$rootScope){
              var vm = this;

               $("#timer").countdown(new Date().getTime()+40995000,  function(event) {
                    $(this).text( event.strftime('%-Dd:%Hh:%Mm:%Ss') );
                    if(event.type === 'stoped'){
                      console.log('am stopped')
                      $('#timer').html('TIME UP')
                    }
                     }).on('finish.countdown', function(e){
                        console.log(e)
                      alert('am done')
                   
                    
                  });
              vm.log = function(id){
                console.log(id)
              }
              vm.testData =" I am testData";
              vm.isVoter =false;
              vm.showVoterLogin =false;
              vm.amVoting =function(){
              vm.isVoter =true;
              vm.showVoterLogin =true;
                  
              }

              vm.castVote = false;
              console.log(vm.castVote)
              vm.voteSubmitted = function(){
                vm.showVoterLogin =false;
                  vm.castVote = true;
              console.log("vote submitted")
              console.log(vm.castVote)
              }


              // Contract
              // 
              // 
 
      }/*/funMain*/



})();


