Nicky.controller('adminGalleryController', function($scope,FileUploader, ModalService,$http) {
	$scope.galleries = [];
	$scope.pictures = [];
	$scope.currentGallery = undefined;
	$scope.currentGalleryName = undefined;
	$scope.uploader = new FileUploader();
	$scope.findGallery = function(id){
		$scope.galleries.forEach(function(gallery){
			console.log(gallery.id);
			console.log(id);
			if(gallery.id == id){
				console.log("MATCH");
				console.log(gallery.titel);
				$scope.currentGalleryName = gallery.titel;
			}
		});
	}
	$http.get("api/Galleries").then(function(res){
		$scope.galleries = res.data;
		$scope.currentGallery = res.data[0].id;
		$scope.galleries.forEach(function(gallery, i){
			if(gallery.titel == "Front"){
				$scope.galleries.splice(i, 1);
			}
		});
	});
	$scope.addGallery = function(){
		console.log($scope.newName);
		gallery = {
			titel: $scope.newName
		}
		$http.post("api/Containers", {"name":$scope.newName}).then(function(){

		});
		$http.post("api/Galleries", gallery).then(function(response){
			$http.get("api/Galleries").then(function(res){
				$scope.galleries = res.data;
				$scope.currentGallery = res.data[0].id;
				$scope.galleries.forEach(function(gallery, i){
					if(gallery.titel == "Front"){
						$scope.galleries.splice(i, 1);
					}
				});
			});
		});
	}
	$scope.removePicture = function($index){
		if($scope.pictures[$index].id){
			$http.delete("api/Galleries/"+$scope.currentGallery+"/pictures/"+$scope.pictures[$index].id);
		}
		$http.delete("api/Containers/"+$scope.currentGalleryName+"/files/"+$scope.pictures[$index].filename)
		$scope.pictures.splice($index, 1)

	}
	$scope.loadNewImages = function(value){
		console.log(value);
		if(value){
			$scope.currentGallery = value;
			$scope.findGallery(value);
			console.log(value);
			$http.get("api/galleries/"+ $scope.currentGallery+ "/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
				$scope.pictures = res.data;
			});
			$scope.uploader.url= "api/containers/"+ $scope.currentGalleryName +"/upload";
		}
	}
	$scope.loadNewImages();
	$scope.addNew = function(){
		$scope.pictures.push({
			fileurl: "image",
			filename: "horse",
			galleryId: "5729e69b98ab47bf33b30c43",
		});
	}
	$scope.upload = function($index){
		$scope.uploader.uploadAll();
		console.log($index);
		fname = $(".picture"+$index).val();
		console.log(fname);
		console.log($scope.currentGallery);
		fname = fname.replace("C:\\fakepath\\", "");
		var galleryName = $scope.findGallery($scope.currentGallery);
		console.log($scope.currentGalleryName);
		$scope.pictures[$index].fileurl="img/"+$scope.currentGalleryName+"/"+fname;
		$scope.pictures[$index].galleryId = $scope.currentGallery;
	}
	$scope.saveGallery = function(){
		$scope.pictures.forEach(function(picture,i){
			picture.order = i;
			console.log(i);
			if(!picture.id){
				$http.post("api/Galleries/"+ $scope.currentGallery + "/pictures", picture).then(function(){
					console.log("posted picture");
				});
			}
			else{
				$http.put("api/Galleries/"+ $scope.currentGallery + "/pictures/"+picture.id, picture).then(function(){
					console.log("update picture");
				});
			}
		});
		$scope.pictures = [];
		$http.get("api/galleries/"+ $scope.currentGallery + "/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
			$scope.pictures = res.data;
			console.log($scope.pictures);
		})
	}
});