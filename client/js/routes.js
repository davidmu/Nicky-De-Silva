Nicky.config(function($routeProvider) {
        $routeProvider
           // route for the home page
           .when('/', {
               templateUrl : 'templates/front.html',
               controller: 'galleryController'
           })
           // route for the about page
           .when('/admin', {
               templateUrl : 'templates/adminFront.html',
               controller  : 'adminController'
      }).when('/adminGallery', {
               templateUrl : 'templates/adminGallery.html',
               controller  : 'adminGalleryController'
      }).when('/gallery/:id', {
               templateUrl : 'templates/gallery.html',
               controller  : 'galleryCController'
      })
      
});