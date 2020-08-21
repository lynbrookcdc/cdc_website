var submissionArr = [];  //TODO change submissionsArr to a map (maybe)
var categoriesMap = new Map();
var announcmentsText = "nothing to see here"



//JSON link: https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json
const url = "https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json"

var getData =  function getData(){
    return fetch(url).then(res => res.json())
        .then((data) => {
            organiseData(data);
        })
        .catch(err => {
            throw err
        });
};



function organiseData(data) {


    console.log(data)
    let cellArr = data.feed.entry;


    let maxRow = Number(data.feed.gs$rowCount.$t);
    let maxCol = 7;
    let rCount = 0;


    //may create blacklist or whitelist system.

    //Sorts cells by their submissions (which im super confused as to why it isn't already like that but whatever)
    for (let i = 9; i < cellArr.length; i++) {

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
                submissionArr[rCount].description = cell.gs$cell.$t;
                break;
            case 5:
                if (!categoriesMap.has(cell.gs$cell.$t)) {
                    categoriesMap.set(cell.gs$cell.$t, []);
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
            case 11:
                if (Number(cell.gs$cell.row) === 2){
                    announcmentsText = cell.gs$cell.$t;
                }
                break;
        }
    }

    if (categoriesMap.size > 0) {
        submissionArr.forEach(submission => {
                if (categoriesMap.has(submission.category)) {
                    categoriesMap.get(submission.category).push(submission);
                }
            }
        )
    }



}

class submission{
    constructor() {
        this.timestamp;
        this.title;
        this.displayName;
        this.description = "";
        this.category;
        this.image;
        this.id;
    }
}

