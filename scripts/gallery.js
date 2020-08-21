let category = location.search.substring(1).replace(/%20/g, " ");
let tabTitle = document.querySelector("title");
let galleryTitle = document.querySelector("h1")
let imageContainer = document.getElementById("image_container");

galleryTitle.innerText = category;
tabTitle.innerText = category;


getData().then(() => {
        loadImages();
    }
)

function loadImages() {

    if (category == "Recent") {
        for (let i = submissionArr.length - 1; i >= 0; i--) {
            let submission = submissionArr[i];
            let img = document.createElement('img');
            img.src = submission.image;
            img.classList.add("container-fluid");
            img.classList.add("thumbnail");
            img.classList.add("py-2");
            let link = document.createElement('a');
            link.href = "image.html?" + submission.id;
            link.appendChild(img);
            imageContainer.appendChild(link);
        }
    } else {
        let subject = categoriesMap.get(category);
        console.log(subject);

        for (let i = subject.length - 1; i >= 0; i--) {
            let img = document.createElement("img")
            img.src = subject[i].image;
            img.classList.add("container-fluid");
            img.classList.add("thumbnail");
            img.classList.add("py-2");

            let link = document.createElement('a');
            link.href = "image.html?" + subject[i].id;
            link.appendChild(img);
            imageContainer.appendChild(link);
        }

    }
}