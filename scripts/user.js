//TODO make user page more unique or
// TODO generalize gallery functions

// TODO Use URL parameters correctly
let username = location.search.substring(1).replace(/%20/g, " ");
let tabTitle = document.querySelector("title");
let galleryTitle = document.getElementById("galleryTitle")
let imageContainer = document.getElementById("imageContainer");
let thumbnailTemplate = document.getElementById("thumbnail-template");

tabTitle.innerText = username;
galleryTitle.innerText = username;


getData().then(() => {
    inflateThumbnails(imageContainer, userMap.get(username), thumbnailTemplate, true);
})
