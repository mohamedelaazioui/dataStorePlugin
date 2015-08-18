/**
 * Created by Mohamed on 17-08-15.
 */
angular.module('dataStore',['templates','ngRoute','ngResource'])
    .config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $routeProvider.
            when('/', {
                templateUrl: 'templates/landing.html',
                controller: 'welcomeCtrl'
            }).
            when('/branches-list',{
                templateUrl: 'templates/branches-list.html',
                controller: 'branchesListCtrl'
            }).
            when('/create-branch',{
                templateUrl: 'templates/create-branch',
                controller: 'branchCtrl'
            }).
            otherwise({
                redirectTo :'/'
            });
    }])
    .factory('Branches',['$resource',function($resource){
        return $resource('branches.json',{},{
            query: {method: 'GET', params:{branchId:'branch'}, isArray:true}
        });
    }])
    .factory('Branch',['$resource', function($resource){
        return $resource('branches/:id.json',{id: '@id'},{
            update: {
                method: 'PUT'
            }
        });
    }])
    .controller('branchCtrl',['$scope','Branch',function($scope,Branch){
        $scope.branch = new Branch();

        $scope.addBranch = function(){
          Branch.save({ branch: $scope.branch});

        };
    }])
    .controller('branchesListCtrl',['$scope','Branches',function($scope,Branches){
        $scope.branches = Branches.query();
        $scope.oderProp = 'numerical';
    }])
    .controller('welcomeCtrl',['$scope',function($scope){
        $scope.date = new Date();
    }]);