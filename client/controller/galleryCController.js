Nicky.controller('galleryCController', function($scope, $routeParams, $http) {
	$scope.images = [];
	$http.get("api/Galleries/"+$routeParams.id+"/pictures").then(function(res){
		$scope.images = res.data;
	});

});