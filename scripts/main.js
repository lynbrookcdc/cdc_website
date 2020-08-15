const submitButton = document.getElementById("submit_button");
submitButton.onclick = () => window.open('https://forms.gle/5y9HjxX23axi9nrU8', '_blank');


var submissionArr = [];  //TODO change submissionsArr to a map (maybe)
var categoriesArr = new Map();

//JSON link: https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json
const url = "https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json"
fetch(url).then(res => res.json())
    .then((data) => {
        organiseData(data);
        loadImages(submissionArr, categoriesArr)

    })
    .catch(err => {
        throw err
    });








function organiseData(data) {


    console.log(data)
    let cellArr = data.feed.entry;


    let maxRow = Number(data.feed.gs$rowCount.$t);
    let maxCol = 7;
    let rCount = 0;


    //may create blacklist or whitelist system.

    //Sorts cells by their submissions (which im super confused as to why it isn't already like that but whatever)
    for (let i = 7; i < cellArr.length; i++) {

        let cell = cellArr[i];
        rCount = cell.gs$cell.row - 2;

        if (submissionArr[rCount] == null) {
            submissionArr[rCount] = new submission();
        }


        switch (Number(cell.gs$cell.col)) {
            case 1:
                submissionArr[rCount].timestamp = cell.gs$cell.$t;
                break;
            case 3:
                submissionArr[rCount].displayName = cell.gs$cell.$t;
                break;
            case 4:
                if (cell.gs$cell.$t == null) {
                    submissionArr[rCount].description = "a piece of art";
                } else {
                    submissionArr[rCount].description = cell.gs$cell.$t;
                }
                break;
            case 5:
                if (!categoriesArr.has(cell.gs$cell.$t)) {
                    categoriesArr.set(cell.gs$cell.$t, []);
                }
                submissionArr[rCount].category = cell.gs$cell.$t;
                break;

            case 7:
                submissionArr[rCount].title = cell.gs$cell.$t;
                break;
            case 8:
                submissionArr[rCount].image = cell.gs$cell.$t;
                break;
            case 9:
                submissionArr[rCount].id = cell.gs$cell.$t;
                break;
        }
    }

    if (categoriesArr.size > 0) {

        submissionArr.forEach(submission => {
                if (categoriesArr.has(submission.category)) {
                    categoriesArr.get(submission.category).push(submission);
                }
            }
        )
    }


    return submissionArr;
}



function loadImages(submissions, categoriesArr) {
    const recentGallery = document.getElementById("recent_gallery");


    for (let i = submissions.length - 1; i > submissions.length - 8 && i >= 0; i--) {
        let submission = submissions[i]
        let img = document.createElement('img');
        img.src = submission.image;
        img.classList.add("container-fluid")
        img.classList.add("image")
        recentGallery.appendChild(img);
    }


    const template = document.getElementById("gallery_template");

    //TODO use categories entry iterator
    let catIter = categoriesArr.entries();
    let arr = Array.from(catIter);
    arr.reverse().forEach(category => {

        let clone = template.content.cloneNode(true);


        let title = clone.querySelector("h5");
        let imageHolder = clone.querySelector(".gallery");// is an array
        title.innerText = category[0];
        for (let i = category[1].length - 1; i > category[1].length - 8 && i >= 0; i--) {
            let img = document.createElement("img")
            img.src = category[1][i].image;
            img.classList.add("container-fluid")
            img.classList.add("image")
            imageHolder.appendChild(img);
        }
        document.getElementById("galleries").appendChild(clone);
    })

}


class submission{
    constructor() {
        this.timestamp;
        this.title;
        this.displayName;
        this.description;
        this.category;
        this.image;
        this.id;
    }
}

class category {
    constructor(name) {
        this.name = name;
        this.images = [];
    }
}



