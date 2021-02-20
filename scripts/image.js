let id = location.search.substring(1);
let tabTitle = document.querySelector("title");
let image = document.querySelector("img");
let title = document.getElementById("title");
let name = document.getElementById("name");
let category = document.getElementById("category");
let description = document.getElementById("description");
let previousLink = document.getElementById("previous_link");
let nextLink = document.getElementById("next_link") ;


getData().then(() => {
        let submission = idMap.get(id);
        fillInfo(submission);
    }
)


function fillInfo(submission) {


    //fill in all the text
    image.src = submission.image;
    tabTitle.textContent = submission.title;
    title.textContent = submission.title;
    name.textContent =  "By: " + submission.displayName;
    category.textContent = "Category: " + submission.category;
    //Im pretty sure this is bad practice...
    description.innerHTML = submission.description.replace(new RegExp('\r?\n','g'), '<br />');

    //fill next and previous
    let subject = categoriesMap.get(submission.category);

    if (submission.categoryPos === subject.length - 1) {//edge case for last entry TODO replace with gray out
        previousLink.href = "image.html?" + subject[0].id;
    } else {
        previousLink.href = "image.html?" + subject[submission.categoryPos + 1].id;
    }

    if (submission.categoryPos === 0) {//edge case for first TODO replace with gray out
        nextLink.href = "image.html?" + subject[subject.length - 1].id;
    } else {
        nextLink.href = "image.html?" + subject[submission.categoryPos - 1].id;
    }





    //link to user profile
    let link = document.getElementById("name_link");
    link.href = "user.html?" + submission.displayName;
}