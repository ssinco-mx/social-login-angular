'use strict';

/**
 * @ngdoc function
 * @name socialLoginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialLoginApp
 */
angular.module('socialLoginApp')
  .controller('MainCtrl', function ($scope) {
    $scope.date = new Date();
  });
