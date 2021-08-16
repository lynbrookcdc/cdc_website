
getData().then(() => {
        displayAnnouncements();
        createGalleries();
    });


function createGalleries(){
    let galleriesParentElement = document.getElementById("galleries-section");
    let galleryTemplate = document.getElementById("carousel-template");
    let thumbnailTemplate = document.getElementById("thumbnail-template");

    categoriesMap.forEach(function(value, key) {
        if (key != "") {

            let galleryCopy = galleryTemplate.content.cloneNode(true);
            //set the title
            galleryCopy.querySelector("h4").textContent = key;
            //set the link
            galleryCopy.querySelector("a").href = "category.html?" + key;
            //inflate images
            let carousel = galleryCopy.querySelector(".carousel");

            inflateThumbnails(carousel, value, thumbnailTemplate, false);

            galleriesParentElement.prepend(galleryCopy);
        }
    })
}

//TODO finish display announcements
function displayAnnouncements() {
    let announcementsPlaceholder = document.getElementById("announcements");
    announcementsPlaceholder.innerHTML = announcementsText.autoLink();
}












