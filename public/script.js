var myAppModule = angular.module('myApp', []);

myAppModule.controller('formController', function ($scope, $http){
	$scope.form = { username: "bob", password: "secret"};
	// $scope.form = { username: "joe", password: "birthday"};
	$scope.testCode = "";

	$scope.loginForm = function () {
		$http({
			method:"post",
			url:"/login",
			data:$scope.form
		})
		.success(
			function (data, status, headers, config){
				console.log(data);
				$scope.testCode = data;
				// $location.path("/");
			})
		.error(
			function (data, status, headers, config){
				console.error(data);
				$scope.testCode = data;
			});
	};

	$scope.me = function (){
		$http.get("/me").success(
			function (data, status, headers, config){
				console.log(data);
				$scope.testCode = data;
			})
		.error(
			function (data, status, headers, config){
				console.error(data);
				$scope.testCode = data;
			});
	};

	$scope.me2 = function (){
		$http.get("/me2").success(
			function (data, status, headers, config){
				console.log(data);
				$scope.testCode = data;
			})
		.error(
			function (data, status, headers, config){
				console.error(data);
				$scope.testCode = data;
			});
	};

	$scope.hello = function (){
		$http.get("/hello").success(
			function (data, status, headers, config){
				console.log(data);
				$scope.testCode = data;
			})
		.error(
			function (data, status, headers, config){
				console.error(data);
				$scope.testCode = data;
			});
	};

	$scope.logout = function (){
		$http({
			method:"post",
			url:"/logout",
		})
		.success(
			function (data, status, headers, config){
				console.log(data);
				$scope.testCode = data;
			})
		.error(
			function (data, status, headers, config){
				console.error(data);
				$scope.testCode = data;
			});
	};
});
