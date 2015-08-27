/**
 * Created by Mohamed on 17-08-15.
 */
'use strict';

angular.module('dataStore',['templates','ngRoute','ngResource','Devise'])
    .config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $routeProvider.
            when('/', {
                templateUrl: 'templates/landing.html',
                controller: 'welcomeCtrl'
            }).
            when('/login',{

            }).
            when('/register',{

            }).
            when('/requests-list',{
                templateUrl: 'templates/requests-list.html',
                controller: 'requestsListCtrl'
            }).
            when('/create-scratch-request',{
                templateUrl: 'templates/create-scratch-request.html',
                controller: 'welcomeCtrl'
            }).
            when('/default-request',{
                templateUrl: 'templates/default-request.html',
                controller: 'welcomeCtrl'
            }).
            when('/previous-request',{
                templateUrl: 'templates/previous-request.html',
                controller: 'welcomeCtrl'
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
             'User': 'G02751',
             'Description': 'One Fortis user with One Current Account',
             'Date': '18/08/2015',
             'Project': '9066',
             'Contains':[{'clientQuantity':'1','clientBranch':'Fortis','clientAccountsQuantity':'1','clientAccountCategory': 'CNORM', 'clientAccountCategoryQuantity':'1'}]
            },
            {'ID': 'TDC-282',
             'User':'G02751',
             'Description': 'One Fortis user with One Current account and One Domestic Beneficiary',
             'Date': '19/08/2015',
             'Project': '8022',
             'Contains':[{'clientQuantity':'1','clientBranch':'Fortis','clientAccountsQuantity':'1','clientAccountCategory': 'CNORM','clientAccountCategoryQuantity':'1','clientDomesticBeneficiariesQuantity':'1'}]
            },
            {
             'ID': 'TDC-283',
             'Description': 'One Fortis user with One Current account and the account must have 1000 euro positive saldo on it',
             'Date': '20/08/2015',
             'Project': '8050',
             'Contains':[{'clientQuantity':'3','clientBranch':'Fortis','clientAccountsQuantity':'1','clientAccountCategory': 'CNORM', 'clientAccountCategoryQuantity':'1','accountBalance':'1000'}]
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
    .controller('navCtrl',['$scope','Auth',function($scope,Auth){
        $scope.signedIn = Auth.isAuthenticated;
        $scope.logout = Auth.logout;
        Auth.currentUser().then(function(user){
            $scope.user = user;
        });
        $scope.$on('devise:new-registration', function(e, user){
            $scope.user = user;
        });
    }])
    .controller('defaultRequestCtrl',['$scope',function($scope){
        $scope.Description = 'One Fortis Client, with One Current Account, having 1000 EUROS, positive balance';
    }])
    .controller('welcomeCtrl',['$scope',function($scope) {
        $scope.format = 'd/M/yyyy h:mm:ss a';

        // requests-lists
            $scope.requests = [
                {
                    'ID': 'TDC-281',
                    'User': 'G02751',
                    'Description': 'One Fortis user with One Current Account',
                    'Date': '18/08/2015',
                    'Project': '9066',
                    'Contains': [{
                        'clientQuantity': '1',
                        'clientBranch': 'Fortis',
                        'clientAccountQuantity': '1',
                        'clientAccountCategory': 'CNORM',
                        'clientAccountCategoryQuantity': '1'
                    }]
                },
                {
                    'ID': 'TDC-282',
                    'User': 'G02751',
                    'Description': 'One Fortis user with One Current account and One Domestic Beneficiary',
                    'Date': '19/08/2015',
                    'Project': '8022',
                    'Contains': [{
                        'clientQuantity': '1',
                        'clientBranch': 'Fortis',
                        'clientAccountQuantity': '1',
                        'clientAccountCategory': 'CNORM',
                        'clientAccountCategoryQuantity': '1',
                        'clientDomesticBeneficiariesQuantity': '1'
                    }]
                },
                {
                    'ID': 'TDC-283',
                    'Description': 'One Fortis user with One Current account and the account must have 1000 euro positive saldo on it',
                    'Date': '20/08/2015',
                    'Project': '8050',
                    'Contains': [{
                        'clientQuantity': '3',
                        'clientBranch': 'Fortis',
                        'clientAccountQuantity': '1',
                        'clientAccountCategory': 'CNORM',
                        'clientAccountCategoryQuantity': '1',
                        'cashDepositAmount': '1000'
                    }]
                },
                {
                    'ID': 'TDC-284',
                    'Description': 'One Fortis user with One Current account and the account must have 1000 euro positive saldo on it',
                    'Date': '22/08/2015',
                    'Project': '8030',
                    'Contains': [{
                        'clientQuantity': '3',
                        'clientBranch': 'Hello',
                        'clientAccountQuantity': '1',
                        'clientAccountCategory': 'CDIGOF',
                        'clientAccountCategoryQuantity': '1',
                        'cashDepositAmount': '1000'
                    }]
                }

            ];

        $scope.orderReq = '-Date';


        $scope.extendRequest = function () {

        };



        $scope.addRequest = function () {
            $scope.requests.push({
                'ID': $scope.newID,
                'Description':$scope.newDescription,
                'Date': $scope.newDate,
                'Project': $scope.newProject,
                'Contains':[{
                             'clientQuantity': $scope.newCQ,
                             'clientBranch': $scope.newCBranch,
                             'clientAccountQuantity': $scope.newACQ,
                             'clientAccountCategory': $scope.newAC,
                             'cashDepositAmount': $scope.newCashDepositAmount

                }]

            });
            $scope.$watch('requests', function(newVal, oldVal) {}, true );
            // reset properties
            $scope.newID = '';
            $scope.newDescription = '';
            $scope.newDate = '';
            $scope.newProject = '';
            $scope.newCQ = '';
            $scope.newCBranch = '';
            $scope.newAC = '';
            $scope.newACQ = '';
            $scope.newCashDepositAmount = '';
        };


        $scope.addDefaultRequest = function(){
            $scope.requests.push({
                'ID': $scope.newID,
                'Description':$scope.newDescription,
                'Date': $scope.newDate,
                'Project': $scope.newProject,
                'Contains':[{
                    'clientQuantity': $scope.newCQ,
                    'clientBranch': $scope.newCBranch,
                    'clientAccountQuantity': $scope.newACQ,
                    'clientAccountCategory': $scope.newAC,
                    'cashDepositAmount': $scope.newCashDepositAmount

                }]
            });
            // reset ID
            $scope.newID = '';
            $scope.$watch('requests', function(newVal, oldVal) {}, true );
        };
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
    }])
    .directive('myPreviousRequest',function(){
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //convert data from view format to model format
                    return data; //converted
                });

                ngModelController.$formatters.push(function(data) {
                    //convert data from model format to view format
                    return data; //converted
                });
            }
        };
    })
;