angular.module('app')
  .controller('FightAnonymousController', function ($scope, ajax, USER) {
    var vm = this;
    vm.photo = USER.lastPhoto;
    ajax.pkRandom().success(function (response) {
      if (response.code === 200) {
        
      }
    });
  });