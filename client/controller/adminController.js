Nicky.controller('adminController', function($scope, FileUploader, $http, ModalService) {
	$scope.pictures =[];
	$scope.galleries = [];
	$http.get("api/galleries/5729e69b98ab47bf33b30c43/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
		$scope.pictures = res.data;
		console.log($scope.pictures);
	})
	$http.get
	$scope.uploader = new FileUploader({
		url: "api/containers/Front/upload"
	});
	$scope.uploader.onCompleteAll(function(){
		$http.get("api/galleries/5729e69b98ab47bf33b30c43/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
			$scope.pictures = res.data;
			console.log($scope.pictures);
		})
	});
	$http.get("api/Galleries").then(function(res){
		$scope.galleries = res.data;
		$scope.galleries.forEach(function(gallery, i){
			if(gallery.titel == "Front"){
				$scope.galleries.splice(i, 1);
			}
		});
	});
	$scope.addNew = function(){
		$scope.pictures.push({
			fileurl: "image",
			filename: undefined,
			galleryId: "5729e69b98ab47bf33b30c43",
		});
	}
	$scope.galleries =[{name:"Option1"},{name:"Option2"},{name:"Option3"}]
	$scope.removePicture = function($index){
		if($scope.pictures[$index].id){
			$http.delete("api/Galleries/5729e69b98ab47bf33b30c43/pictures/"+$scope.pictures[$index].id);
		}
		$http.delete("api/Containers/Front/files/"+$scope.pictures[$index].filename)
		$scope.pictures.splice($index, 1)

	}
	$scope.gallerySelected = function(gallery, $index){
		console.log("Gallery selected");
		console.log($index);
		$scope.pictures[$index].galleryLink = gallery;
		console.log($scope.pictures[$index]);
	}
	$scope.saveAll = function(){
		$scope.pictures.forEach(function(picture,i){
			picture.order = i;
			console.log(i);
			if(!picture.id){
				$http.post("api/Galleries/5729e69b98ab47bf33b30c43/pictures", picture).then(function(){
					console.log("posted picture");
					$scope.pictures = [];
					$http.get("api/galleries/5729e69b98ab47bf33b30c43/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
						$scope.pictures = res.data;
					});
				});
			}
			else{
				$http.put("api/Galleries/5729e69b98ab47bf33b30c43/pictures/"+picture.id, picture).then(function(){
					console.log("update picture");
					$scope.pictures = [];
					$http.get("api/galleries/5729e69b98ab47bf33b30c43/pictures?filter=%7B%22order%22%3A%20%22order%22%7D").then(function(res){
						$scope.pictures = res.data;
						console.log($scope.pictures);
					});
				});
			}
		});

		
	}
	$scope.upload = function($index){
		$scope.uploader.uploadAll();
		console.log($index);
		if($scope.pictures[$index].filename){
			$http.delete("api/Containers/Front/files/"+$scope.pictures[$index].filename)
		}
		fname = $(".picture"+$index).val();
		console.log(fname);
		fname = fname.replace("C:\\fakepath\\", "");
		$scope.pictures[$index].filename = fname;
		$scope.pictures[$index].fileurl="img/Front/"+fname
	}
});