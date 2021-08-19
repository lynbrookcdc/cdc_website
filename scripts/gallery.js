let galleriesParentElement = document.getElementById("galleries-section");
let galleryTemplate = document.getElementById("carousel-template");
let thumbnailTemplate = document.getElementById("thumbnail-template");

getData().then(() => {
    createGalleries(galleriesParentElement, galleryTemplate, thumbnailTemplate);
});