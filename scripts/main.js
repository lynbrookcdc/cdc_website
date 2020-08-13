const submitButton = document.getElementById("submit_button");
submitButton.onclick = () => window.open('https://forms.gle/5y9HjxX23axi9nrU8', '_blank');

//JSON link: https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json
const url = "https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json"
fetch(url).then(res => res.json())
    .then((data) => {
        loadImages(data)
    })
    .catch(err => { throw err });


function loadImages(data) {
    const recentGallery = document.getElementById("recent_gallery");

    let submissions = organiseData(data);

    submissions.forEach(submission => {
            let img = document.createElement('img');
            img.src = submission.image;
            recentGallery.appendChild(img);
        }
    );



}





function organiseData(data) {
    console.log(data)
    let  cellArr = data.feed.entry;

    class submission{
        constructor() {
            this.timestamp;
            this.displayName;
            this.description;
            this.category;
            this.image;
        }
    }

    let maxRow = Number(data.feed.gs$rowCount.$t);
    let maxCol = 7;
    let submissionArr = [];
    let rCount = 0;



    //may create blacklist or whitelist system.

    //Sorts cells by their submissions (which im super confused as to why it isn't already like that but whatever)
    for (let i = 7; i < cellArr.length; i++) {

        let cell = cellArr[i];
        rCount = cell.gs$cell.row - 2;

        if (submissionArr[rCount] == null){
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
                if(cell.gs$cell.$t == null) {
                    submissionArr[rCount].description = "a piece of art";
                }
                else {
                    submissionArr[rCount].description = cell.gs$cell.$t;
                }
                break;
            case 5:
                submissionArr[rCount].category = cell.gs$cell.$t;
                break;
            case 7:
                submissionArr[rCount].image = cell.gs$cell.$t;
                break;
        }
    }

    console.log(submissionArr);
    console.log(cellArr);

    return submissionArr;
}



