angular.module('app')
  .controller('FightFriendController', function ($scope, ajax, $stateParams, USER, $cordovaDialogs) {
    var vm = this;
    vm.photo = USER.photo;
    ajax.pkTarget($stateParams.name).success(function (response) {
      if (response.code === 200) {

      }
    });

    $scope.$on('pushNotificationReceived', function(event, notification) {
      if (notification.push_type === 'res') {
        $cordovaDialogs.alert(notification.pk_result);
      }
    });
  });