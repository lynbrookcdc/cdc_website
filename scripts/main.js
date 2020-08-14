const submitButton = document.getElementById("submit_button");
submitButton.onclick = () => window.open('https://forms.gle/5y9HjxX23axi9nrU8', '_blank');

console.log("hi");
//TODO ADD TITLE

//JSON link: https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json
const url = "https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json"
fetch(url).then(res => res.json())
    .then((data) => {
        loadImages(data)
    })
    .catch(err => {
        throw err
    });


let categories = new Map();


function loadImages(data) {
    const recentGallery = document.getElementById("recent_gallery");
    let submissions = organiseData(data);


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
    let catIter = categories.entries();
    let arr = Array.from(catIter);
    arr.reverse().forEach(category => {

        let clone = template.content.cloneNode(true);


        let title = clone.querySelector("h5");
        let imageHolder = clone.querySelector(".gallery");// is an array
        console.log(category);
        title.innerText = category[0];
        for (let i = category[1].length - 1; i > category[1].length - 8 && i >= 0; i--) {
            let img = document.createElement("img")
            img.src = category[1][i].image;
            img.classList.add("container-fluid")
            img.classList.add("image")
            console.log(category[1][i]);
            imageHolder.appendChild(img);
        }
        document.getElementById("galleries").appendChild(clone);
    })

}


function organiseData(data) {
    console.log(data)
    let cellArr = data.feed.entry;


    let maxRow = Number(data.feed.gs$rowCount.$t);
    let maxCol = 7;
    let submissionArr = [];

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
                if (!categories.has(cell.gs$cell.$t)) {
                    categories.set(cell.gs$cell.$t, []);
                }
                submissionArr[rCount].category = cell.gs$cell.$t;
                break;
            case 7:
                submissionArr[rCount].image = cell.gs$cell.$t;
                break;
        }
    }

    if (categories.size > 0) {

        submissionArr.forEach(submission => {
                categories.get(submission.category).push(submission);
            }
        )
    }


    return submissionArr;
}


class submission{
    constructor() {
        this.timestamp;
        this.displayName;
        this.description;
        this.category;
        this.image;
    }
}

class category {
    constructor(name) {
        this.name = name;
        this.images = [];
    }
}



