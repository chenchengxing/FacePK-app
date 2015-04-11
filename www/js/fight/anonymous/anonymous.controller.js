angular.module('app')
  .controller('FightAnonymousController', function ($scope, ajax, USER, $cordovaDialogs, $rootScope) {
    var vm = this;
    vm.photo = USER.lastPhoto;
    ajax.pkRandom().success(function (response) {
      if (response.code === 200) {
        $cordovaDialogs.alert(response.msg);
      }
    });
    $rootScope.$on('pushNotificationReceived', function(event, notification) {
      if (notification.push_type === 'res') {
        $cordovaDialogs.alert(notification.pk_result);
      }
    });
  });