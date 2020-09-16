let user = location.search.substring(1).replace(/%20/g, " ");
let tabTitle = document.querySelector("title");
let userTitle = document.querySelector("h1")
let imageContainer = document.getElementById("image_container");

userTitle.innerText = user;
tabTitle.innerText = user;


getData().then(() => {
        loadImages();
    }
)

function loadImages() {
        let subject = userMap.get(user);

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
    //    }

    }
}