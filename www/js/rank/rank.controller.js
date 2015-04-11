app
  .controller('RankController', function ($scope, ajax, USER, $cordovaDialogs, $state) {
    var vm = this;
    ajax.getRankList().success(function (response) {
      if (response.code === 200) {
        vm.rankList = response.data;
      }
    });

    vm.goHome = function () {
      $state.go('home');
    }
  });