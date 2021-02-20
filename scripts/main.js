console.log(performance.now())
const submitButton = document.getElementById("submit_button");
submitButton.onclick = () => window.open('https://forms.gle/5y9HjxX23axi9nrU8', '_blank');

    getData.then( () => populateMain(submissionArr, categoriesMap));


function populateMain(submissions, categories) {

    console.log(submissions);

    const recentGallery = document.getElementById("recent_gallery");


    // for (let i = submissions.length - 1; i > submissions.length - 10 && i >= 0; i--) {
    //     let submission = submissions[i]
    //     let img = document.createElement('img');
    //     img.src = submission.image;
    //     img.classList.add("container-fluid");
    //     img.classList.add("thumbnail");
    //
    //     let link = document.createElement('a');
    //     link.href = "image.html?" + submission.id;
    //     link.appendChild(img);
    //     recentGallery.appendChild(link);
    // }

    //fill gallery

    const template = document.getElementById("gallery_template");

    //TODO use categories entry iterator
    let catIter = categories.entries();
    let arr = Array.from(catIter);
    let limitWidth = window.innerWidth;
    arr.reverse().forEach(category => {

        let clone = template.content.cloneNode(true);

        let imagesWidth =0;


        let title = clone.querySelector("h5");
        let link = clone.querySelector('a');
        let imageHolder = clone.querySelector(".previewGallery");
        title.innerText = category[0];
        link.href += "?" + category[0];
        for (let i = category[1].length - 1; i > category[1].length - 10 && i >= 0; i--) {

            console.log(imagesWidth + ";;" + limitWidth);
            let img = document.createElement("img")
            img.src = AA;//category[1][i].thumbnail;
            img.loading = "lazy";
            img.classList.add("container-fluid");
            img.classList.add("thumbnail");


            let link = document.createElement('a');
            link.href = "image.html?" + category[1][i].id;
            link.appendChild(img);
            imageHolder.appendChild(link);
        }
        document.getElementById("galleries").appendChild(clone);})

    // display the announcements
    const announcementsPlaceholder = document.getElementById("announcements");
//    let announcementLines = announcmentsText.split('\n');


//    announcementLines.forEach(line => {
        let newLine = document.getElementById("newline");
//        console.log( line)
        newLine.innerHTML = announcmentsText.replace(new RegExp('\r?\n','g'), '<br />').autoLink();
        announcementsPlaceholder.appendChild(newLine);


    //})

}






