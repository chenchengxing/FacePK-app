angular.module('app')
  .controller('FightFriendController', function ($scope, ajax, $stateParams, USER, $cordovaDialogs, Util, $state) {
    var vm = this;

    vm.photo = USER.photo;
    vm.pkResult = '';

    vm.cancelFight = function () {
      $state.go('home');
    }

    ajax.getUserInfo(USER.username).success(function (response) {
      if (response.code === 200) {
        angular.forEach(response.data.friends, function (friend) {
          if (friend.name === $stateParams.name && friend.image) {
            vm.targetPhoto = 'data:image/png;base64,' + friend.image;
          }
        });
      }
    }).error(function () {
      console.log('err')
    });

    ajax.pkTarget($stateParams.name).success(function (response) {
      // 返回：
      // {
      //     "code": 200,
      //     "data": {
      //         "status": "wait"
      //     },
      //     "msg": "Please wait for ann to accept pk~"
      // }
      if (response.code === 200 && response.data) {
        var data = response.data;
        $cordovaDialogs.alert(response.msg);
        // $cordovaDialogs.alert(Util.formatPKResult(data.status));
      }
    });

    $scope.$on('pushNotificationReceived', function(event, notification) {

      // 发起pk的用户收到pk结果的推送消息格式：
      // {
      //   aps = {
      //     alert = "";
      //     badge = 1;
      //   }
      //   "push_type" = res;
      //   "pk_result" = draw|win|lose;
      //   "pk_from" = username;
      // }
      if (notification.push_type === 'res') {
        vm.pkResult = notification.pk_result;
        vm.targetName = notification.pk_from;
        ajax.getPkImage(notification.pk_from).success(function (response) {
          if (response.code === 200 && response.data) {
            vm.targetPhoto = 'data:image/png;base64,' + response.data.image;
            $cordovaDialogs.alert(Util.formatPKResult(notification.pk_result));
          }
        });
      }
    });
  });