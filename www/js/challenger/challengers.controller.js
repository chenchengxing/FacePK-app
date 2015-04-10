app
  .controller('ChallengersController', function ($scope, ajax, USER, $cordovaDialogs) {
    var vm = this;
    vm.photo = USER.photo;
    ajax.getChallengerList().success(function (response) {
      if (response.code === 200) {
        vm.challengerList = response.data.names;
      }
    })
    vm.fightChallenger = function (challengerName) {
      ajax.acceptPK(challengerName).success(function (response) {
        if (response.code === 200) {
          if (response.data.result === 'win') {

          }
          $cordovaDialogs.alert(response.msg);
        }
      })
    }
  });