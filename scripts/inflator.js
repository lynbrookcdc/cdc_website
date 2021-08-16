
//TODO make isOverflow == true dependent on screen width
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