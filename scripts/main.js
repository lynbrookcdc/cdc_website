function createGalleries(galleriesParentElement, galleryTemplate, thumbnailTemplate){
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

function displayAnnouncements(announcementsPlaceholder) {
    //announcmentsText is a public variable unfortunately but its fine.
    announcementsPlaceholder.innerHTML = linkifyStr(announcementsText, {});
}

function inflateThumbnails(parentElement, imagesArray, thumbnailTemplate, isOverflow){
    let maxImgNum = 10;
    if(isOverflow){
        maxImgNum =  imagesArray.length;
    }
    for (let i = imagesArray.length - 1; i >= 0 && i > imagesArray.length - 1 - maxImgNum; i--){
        let thumbnailCopy = thumbnailTemplate.content.cloneNode(true);

        console.log(i);

        //set link
        thumbnailCopy.querySelector("a").href = "image.html?"+ imagesArray[i].id;
        thumbnailCopy.querySelector(".thumbnail-text").textContent = imagesArray[i].title;
        thumbnailCopy.querySelector("img").src = imagesArray[i].thumb;

        parentElement.append(thumbnailCopy);
    }
}












