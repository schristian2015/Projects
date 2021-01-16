/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentList = document.querySelector(".student-list");
const page = document.querySelector(".page");
//Counters and PlaceHolders
let filtered = 0;
let placeHolder = 1;

//const pageLinkList = appendPageLinks();
const pageLinks = document.querySelector('.pagination');

// Dynamic createElement Function
function createElement(elementName, property, value, classValue) {
    const element = document.createElement(elementName);
    element[property] = value;
    if (classValue != 0) {
        element.classList.add(classValue);
    }
    return element;
}
// Append link elements using Create Element Function
function appendLinkElement(value) {
    const li = document.createElement("li");
    const a = createElement("a", "textContent", value);
    li.appendChild(a);
    return li;
}
// Function Create Page Link
function appendPageLinks() {
    // Create list of links for pagination
    function createUnorderList() {
        const ul = document.createElement("ul");
        ul.classList.add("pagination");
        for (let i = 0; i < numOfLinks; i++) {
            ul.appendChild(appendLinkElement(i + 1));
        }
        return ul;
    }
    // Depending on if filtered == 1 we calculate the number of links to create.
    let numOfLinks = Math.ceil(studentList.children.length / 10);
    // Return Pagination Links function value return 
    return page.appendChild(createUnorderList());
}
// Show list of 10 elements per page.
function showPage(pageNumber) {
    let position = pageNumber * 10;
    if (filtered == 0) {
        for (let i = 0; i < studentList.children.length; i++) {
            if (i < position && i > position - 11) {
                studentList.children[i].style.display = "";
            } else {
                studentList.children[i].style.display = "none";
            }
        }
    }
    filtered = 0;
}
// Add 'active' class to page link to first
function activePage(value) {
    const ul = document.querySelector(".pagination").children;
    ul[value - 1].firstElementChild.classList.add("active");
}
//Initial DOMContentLoaded functions
function initialDOMLoadContent(value) {
    appendPageLinks();
    activePage(value);
    showPage(value);
}
// Initial DOM Content Setup 
initialDOMLoadContent(placeHolder);

// Pagination Link Click Selection
document.querySelector('.pagination').addEventListener("click", (e) => {
    // Update Active PageLinks
    function updateActivePageLink() {
        var elems = document.querySelector(".active");
        if (elems !== null) {
            elems.classList.remove("active");
        }
        e.target.className = "active";
    }
    // Target Anchor elements
    if (e.target.nodeName === "A") {
        updateActivePageLink();
        // Set textContent of page link to placeHolder
        let x = e.target.textContent;
        placeHolder = x;
        if (filtered == 0) {
            showPage(placeHolder);
        } else if (filtered == 1) {
            filterShowPage(placeHolder);
        };
    }
});
