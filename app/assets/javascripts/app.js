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
            when('/clients-list',{
                templateUrl: 'templates/clients-list',
                controller: 'clientsListCtrl'
            }).
            when('/create-client',{
                templateUrl: 'templates/create-client',
                controller: 'clientCtrl'
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
    .factory('Clients',['$resource',function($resource){
        return $resource('api/clients.json',{},{
            query:{method: 'GET', params:{clientId:'client'}, isArray:true}
        });
    }])
    .factory('Client',['$resource',function($resource){
        return $resource('clients/:id.json',{id: '@id'},{
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
        $scope.oderProp = 'code';
    }])
    .controller('clientsListCtrl',['$scope','Clients',function($scope,Clients){
        $scope.clients = Clients.query();
        $scope.clientOrderProp = 'PSP';
    }])
    .controller('clientCtrl',['$scope', 'Client',function($scope,Client){
        $scope.client = new Client();
        $scope.addClient = function(){
          Client.save({ client: $scope.client});
        };
    }])
    .controller('welcomeCtrl',['$scope',function($scope){
        $scope.date = new Date();
    }]);