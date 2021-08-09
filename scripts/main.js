
loadData().then(populateGallery);

function populateGallery(){
    const galleriesParentElement = document.getElementById("galleries-section");
    const galleryTemplate = document.getElementById("carousel-template");
    const thumbnailTemplate = document.getElementById("thumbnail-template");
    categoriesMap.forEach(function(value, key) {
        let copy = galleryTemplate.content.cloneNode(true);
        let gallery = galleriesParentElement.appendChild(copy);


        let galleryTitleElement = gallery.querySelector("h");
        console.log(galleryTitleElement);
        galleryTitleElement.textContent = key;



    })
}







