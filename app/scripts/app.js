'use strict';

/**
 * @ngdoc overview
 * @name socialLoginApp
 * @description
 * # socialLoginApp
 *
 * Main module of the application.
 * For Social login details, you can go to https://github.com/sahat/satellizer
 */
angular
  .module('socialLoginApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'toastr'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "views/main.html"
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/auth/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/auth/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      });

    $authProvider.twitter({
      url: '/auth/twitter'
    });
    // More info: https://developers.facebook.com/docs/facebook-login
    $authProvider.facebook({
      clientId: '918781088177099', // SSINCO Social Login Demo
      // public_profile, email and user_friends
      scope: ['email', 'public_profile']
    });

     function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };

     function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    };
  });
