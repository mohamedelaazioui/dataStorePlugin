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
            when('/requests-list',{
                templateUrl: 'templates/requests-list.html',
                controller: 'requestsListCtrl'
            }).
            when('/create-request',{
                templateUrl: 'templates/create-request.html',
                controller: 'requestCtrl'
            }).
            when('/branches-list',{
                templateUrl: 'templates/branches-list.html',
                controller: 'branchesListCtrl'
            }).
            when('/create-branch',{
                templateUrl: 'templates/create-branch.html',
                controller: 'branchCtrl'
            }).
            when('/clients-list',{
                templateUrl: 'templates/clients-list.html',
                controller: 'clientsListCtrl'
            }).
            when('/create-client',{
                templateUrl: 'templates/create-client.html',
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
    .controller('requestsListCtrl',['$scope', function($scope){
        $scope.requests = [
            {'ID': 'TDC-281',
             'Description': 'One Fortis user with One Current Account',
                'Date': '18/08/2015',
                'Project': '9066'
            },
            {'ID': 'TDC-282',
             'Description': 'One Fortis user with One Current account and One Domestic Beneficiary',
             'Date': '19/08/2015',
            'Project': '8022'
            },
            {
             'ID': 'TDC-230',
             'Description': 'One Fortis user with One Current account and the account must have 1000 euro positive saldo on it',
              'Date': '20/08/2015',
              'Project': '8050'
            }

        ];
        $scope.orderReq = '-Date';
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
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.date = new Date();
    }])
    .directive('myCurrentTime',['$interval','dateFilter',function($interval, dateFilter){
        function link(scope, element, attrs) {
            var format,
                timeoutId;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        };
    }]);