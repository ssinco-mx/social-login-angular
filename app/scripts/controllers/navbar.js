'use strict';

angular.module('socialLoginApp')
  .controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });
