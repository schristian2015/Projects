/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentList = document.querySelector(".student-list");
const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");

//Counters and PlaceHolders
let filtered = 0; 
let placeHolder = 1;
let pageLinkCounter = 0; 


const pageLinkList = appendPageLinks();
const studentSearchForm = appendSearchInput();
let studentItemList = document.querySelectorAll(".avatar + h3");

// Show 10 elements of Student List on the screen based on pageLink selected 
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

// Add 'active' class to page link
function activePage(value) {
    const ul = document.querySelector(".pagination").children;
    ul[value - 1].firstElementChild.classList.add("active");
}

// Dynamic Create Element Function
function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
}

// Create Link Element
function appendLinkElement(value) {
    const li = document.createElement("li");
    const a = createElement("a", "textContent", value);
    li.appendChild(a);
    return li;
}
// Create Page Unorder list of page links
function appendPageLinks() {
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
    if(filtered == 1){
        numOfLinks = document.querySelectorAll('.filter h3');
    }
    return page.appendChild(createUnorderList());
}

function appendSearchInput() {
    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");
    const searchForm = document.createElement("form");
    searchForm.classList.add("student-search");
    searchButton.textContent = "search";
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    pageHeader.appendChild(searchForm);
    return searchForm
}
// Test for special Charactesr
function containsSpecialCharacters(str){
    var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return regex.test(str);
}

function searchStudentList(value) {
    if(containsSpecialCharacters(value) == false){
        filtered = 1;
        if (value != 0) {
            for (let i = 0; i < studentItemList.length; i++) {
                if (studentItemList[i].textContent.indexOf(value) > -1) {
                    studentItemList[i].parentNode.parentNode.style.display = "";
                    studentItemList[i].parentNode.parentNode.classList.add('filter');
                } else {
                    studentItemList[i].parentNode.parentNode.style.display = "none";
                    studentItemList[i].parentNode.parentNode.classList.remove('filter');
                }
            }
            filtered = 1;
        }
        else {
            alert("No Results");
        }
    } 
    else if(containsSpecialCharacters(value) == true){
        alert('Your Search Contains Special Characters');
    }
}

function filterShowPage(pageNumber) {
    /* Loop through elements with class 'filter' and 
    display 10 elements based on page link selected */
    let position = pageNumber * 10;
    let filterList = document.querySelectorAll('.filter h3');
    for (let i = 0; i < filterList.length; i++) {
        if (i < position && i > position - 11) {
            filterList[i].parentNode.parentNode.style.display = "";
        } else {
            filterList[i].parentNode.parentNode.style.display = "none";
        }
    }

    /* Loop through number of Page Link elements based 
    on condition pageLinkCounter value */
    let numOfLinks = Math.ceil(filterList.length / 10);
    let links = document.querySelectorAll('.pagination li');
    if(pageLinkCounter === 0){
        for (let i = numOfLinks; i < links.length; i++) {
            links[i].remove();
        }
    }
    else if (pageLinkCounter > 0) {
        if (pageLinkCounter <= numOfLinks) {
            for (let i = links.length +1; i < numOfLinks; i++) {
                let ele = appendLinkElement(i);
                document.querySelector('.pagination').appendChild(ele);
            }    
        }
        else {
            for (let i = numOfLinks ; i < links.length; i++) {
                links[i].remove();
            }
        }
    }
    // Set value pageLinkCounter for next search entry
    pageLinkCounter = numOfLinks;
}

//Initial DOMContentLoaded functions
activePage(placeHolder);
showPage(placeHolder);

// Listen for clicks on page Links and set value to text content in link
pageLinkList.addEventListener("click", (e) => {
    if (e.target.nodeName === "A") {
        let x = e.target.textContent;
        placeHolder = x;
        if (filtered == 0) {
            showPage(placeHolder);
        } else if (filtered == 1) {
            filterShowPage(placeHolder);
        };
        // get old and set new active class element
        var elems = document.querySelector(".active");
        if (elems !== null) {
            elems.classList.remove("active");
        }
        e.target.className = "active";
    }
});

// Listen for button click and use input value to manipulate both pagelinks & student list
studentSearchForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.nodeName === "BUTTON") {
        console.log(document.querySelector("body > div > div > form > input").value);
        searchStudentList(document.querySelector("body > div > div > form > input").value);
        if(filtered == 1){
            filterShowPage(placeHolder);
        }
    }
});


