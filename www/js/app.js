/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */
var app = angular.module('app', ['ionic','ngCordova', 'jrCrop'])
    .run(function($ionicPlatform) {
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'js/login/login.tpl.html',
    controller: 'LoginController as vm'
  })

  // setup an abstract state for the tabs directive
    .state('home', {
    url: '/home',
    templateUrl: 'js/home/home.tpl.html',
    controller: 'HomeController as vm'
  })

  // setup an abstract state for the tabs directive
    .state('fight', {
    url: "/fight",
    abstract: true,
    templateUrl: "js/fight/fight.tpl.html"
  })
    .state('fight.anonymous', {
    url: "/anonymous",
    views: {
      anonymous: {
        templateUrl: "js/fight/anonymous/anonymous.tpl.html",
        controller: 'FightAnonymousController as vm'
      }
    }
  })
    .state('fight.friend', {
    url: "/friend/:name",
    views: {
      friend: {
        templateUrl: "js/fight/friend/friend.tpl.html",
        controller: 'FightFriendController as vm'
      }
    }
  })
    .state('challengers', {
    url: "/challengers",
    templateUrl: "js/challenger/challengers.tpl.html",
    controller: 'ChallengersController as vm'
  })
    .state('rank', {
    url: "/rank",
    templateUrl: "js/rank/rank.tpl.html",
    controller: 'RankController as vm'
  })
});

app.config([ '$httpProvider', function($httpProvider) {

      //GET header config
      $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};
      // $httpProvider.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
      // $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';

      //POST header config
      $httpProvider.defaults.headers.post = {
          'Content-Type' : 'application/json; charset=UTF-8'};
    }
  ]);

