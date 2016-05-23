Nicky.controller('galleryController', function($scope, ModalService, $http) {
   
   $scope.images = []
   $http.get("api/galleries/5729e69b98ab47bf33b30c43/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
    $scope.images = res.data;
    console.log($scope.pictures);
  })
   $scope.showAModal = function() {

    // Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: "templates/gallery.html",
      controller: "galleryController"
    }).then(function(modal) {
      // The modal object has the element built, if this is a bootstrap modal
      // you can call 'modal' to show it, if it's a custom modal just show or hide
      // it as you need to.
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.message = result ? "You said Yes" : "You said No";
      });
    });

  };
  $scope.showAddressModal = function() {

    // Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: "templates/address.html",
      controller: "galleryController"
    }).then(function(modal) {
      // The modal object has the element built, if this is a bootstrap modal
      // you can call 'modal' to show it, if it's a custom modal just show or hide
      // it as you need to.
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.message = result ? "You said Yes" : "You said No";
      });
    });

  };
});