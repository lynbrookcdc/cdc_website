let id = location.search.substring(1);
let tabTitle = document.querySelector("title");
let image = document.querySelector("img");
let title = document.getElementById("title");
let name = document.getElementById("name");
let category = document.getElementById("category");
let description = document.getElementById("description");


getData().then(() => {
        let submission = findEntry(id);
        fillInfo(submission);
    }
)

function findEntry(token) {
    for (let submission of submissionArr) {
        if (token == submission.id) {
            return submission;
        }
    }
}

function fillInfo(submission) {



    image.src = submission.image;
    tabTitle.textContent = submission.title;
    title.textContent = submission.title;
    name.textContent =  "By: " + submission.displayName;
    category.textContent = "Category: " + submission.category;
    description.innerHTML = submission.description.replace(new RegExp('\r?\n','g'), '<br />');
}