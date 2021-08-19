let galleriesParentElement = document.getElementById("galleries-section");
let galleryTemplate = document.getElementById("carousel-template");
let thumbnailTemplate = document.getElementById("thumbnail-template");

let announcementsPlaceholder = document.getElementById("announcements");

getData().then(() => {
    displayAnnouncements(announcementsPlaceholder);
    createGalleries(galleriesParentElement, galleryTemplate, thumbnailTemplate);
});