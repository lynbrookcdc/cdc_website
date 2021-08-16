let category = location.search.substring(1).replace(/%20/g, " ");
let tabTitle = document.querySelector("title");
let galleryTitle = document.getElementById("galleryTitle")
let imageContainer = document.getElementById("imageContainer");
let thumbnailTemplate = document.getElementById("thumbnail-template");

tabTitle.innerText = category;
galleryTitle.innerText = category;



getData().then(loadImages)

function loadImages() {
    let categoryArr = categoriesMap.get(category);
    inflateThumbnails(imageContainer, categoryArr, thumbnailTemplate, true);


}