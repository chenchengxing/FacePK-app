angular.module('app')
  .controller('FightFriendController', function ($scope, ajax, $stateParams, USER, $cordovaDialogs, Util) {
    var vm = this;
    vm.photo = USER.photo;
    vm.targetPhoto = ''
    vm.pkResult = '';
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
        // $cordovaDialogs.alert(response.msg);
        var data = response.data;
          $cordovaDialogs.alert(data.status);
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
        ajax.getPkImage(notification.pk_from).success(function (response) {
          if (response.code === 200 && response.data) {
            vm.pkResult = response.data.pk_result;
            vm.targetName = response.data.pk_from;
            vm.targetPhoto = 'data:image/png;base64,' + response.data.image;
            $cordovaDialogs.alert(notification.pk_result);
          }
        });
      }
    });
  });