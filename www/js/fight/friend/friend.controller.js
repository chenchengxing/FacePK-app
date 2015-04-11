angular.module('app')
  .controller('FightFriendController', function ($scope, ajax, $stateParams, USER, $cordovaDialogs) {
    var vm = this;
    vm.photo = USER.photo;
    vm.targetPhoto = ''
    ajax.pkTarget($stateParams.name).success(function (response) {
      // 返回：
      // {
      //     "code": 200,
      //     "data": {
      //         "status": "wait"
      //     },
      //     "msg": "Please wait for ann to accept pk~"
      // }
      if (response.code === 200) {
        $cordovaDialogs.alert(response.msg);
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
        $cordovaDialogs.alert(notification.pk_result);
      }
    });
  });