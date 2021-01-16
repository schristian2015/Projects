/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
var testing = value;
const studentList = document.querySelector(".student-list");
const studentUL_List = document.querySelector("body > div > ul.student-list");
const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");

//Counters and PlaceHolders
let filtered = 0; 
let placeHolder = 1;
let pageLinkCounter = 0; 

//const pageLinkList = appendPageLinks();
const pageLinks = document.querySelector('.pagination');
//const studentSearchForm = appendSearchInput();
const studentSearchInput = document.querySelector(".student-search input");
const studentSearchButton = document.querySelector(".student-search button");
let studentItemList = document.querySelectorAll(".avatar + h3");

function createElement(elementName, property, value, classValue) {
    const element = document.createElement(elementName);
    element[property] = value;
    if(classValue != 0){
        element.classList.add(classValue);
    }
    return element;
}
function appendLinkElement(value) {
    const li = document.createElement("li");
    const a = createElement("a", "textContent", value);
    li.appendChild(a);
    return li;
}
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
        numOfLinks = Math.ceil(document.querySelectorAll('.filter h3').length / 10);
    } 
    return page.appendChild(createUnorderList());
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
    } 
    else if(containsSpecialCharacters(value) == true){
        alert('Your Search Contains Special Characters');
    }
}


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
}
//Create Search Input Event 
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

// Add 'active' class to page link to first
function activePage(value) {
    const ul = document.querySelector(".pagination").children;
    ul[value - 1].firstElementChild.classList.add("active");
}
//Initial DOMContentLoaded functions
function initialDOMLoadContent(value){
    appendPageLinks();
    appendSearchInput();
    activePage(value);
    showPage(value);
    
}

// Test for special Charactesr
function containsSpecialCharacters(str){
    var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return regex.test(str);
}

initialDOMLoadContent(placeHolder);


function updatePageLinks(){
    let numberfilterItemsList = document.querySelectorAll('.filter');
    let numOfLinks = Math.ceil(numberfilterItemsList.length / 10);   
    let pageElements = document.querySelector(".pagination").children;
    let numOf_None_Links = document.querySelectorAll(".pagination li");
    let activeLinkCounter = 0;
    for(let i = 0; i < numOf_None_Links.length; i++){
        if(numOf_None_Links[i].style.display == ""){
            activeLinkCounter = activeLinkCounter + 1;
        }
    }
    
    if(numOfLinks < activeLinkCounter){
        for(let i = pageElements.length - 1; i >= numOfLinks; i--){
            pageElements[i].style.display = "none";
        }
    }
    else if(numOfLinks > activeLinkCounter){
        for(let i = activeLinkCounter-1; i < numOfLinks; i++){
            pageElements[i].style.display = "";
        }
    }
}


document.querySelector("body > div > div > form").addEventListener("input", (e) => {
    e.preventDefault();
    let listItems = document.querySelectorAll(".student-list li");
    function displayReset() {
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove("filter");
            if(i < 10){
                listItems[i].style.display = "";
            } else{
                listItems[i].style.display = "none";
            }
        }
        filtered == 0;
    }
    let nameNode = e.target.nodeName; 
    console.log(nameNode);
    const showPageActions = {
        'INPUT': ()=>{
            searchStudentList(e.target.value);
            let element = document.querySelector('.pagination');
            filterShowPage(placeHolder);
            updatePageLinks();
            if(e.target.value == ""){
                displayReset();
            }
            
                        /*
            if(element != null){
                element.remove();
                appendPageLinks();
                
            } else{
                updatePageLinks();
            }*/
        }
    }
    showPageActions[nameNode]();
});

document.querySelector("body > div > div > form > button").addEventListener("click", (e)=>{
    let listItems = document.querySelectorAll(".student-list li");
    const noResults = createElement("h1", "textContent", 'No Results', 'no-results');
 
    function noneDisplayListCount(){
        let counter = 0;
        for(let i = 0; i < listItems.length; i++){
            if(listItems[i].style.display == "none"){
                counter = counter + 1;
            }
        }
        return counter;
    }
    function displayReset() {
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove("filter");
            if(i < 10){
                listItems[i].style.display = "";
            } else{
                listItems[i].style.display = "none";
            }
        }
    }
    e.preventDefault();
    let studentInput = document.querySelector('.student-search input').value;

    if(studentInput === ""){
        console.log("Input is empty");
        displayReset();
    }
    else if(studentInput != ""){
        if(noneDisplayListCount() == listItems.length){
            if(studentList.firstElementChild.textContent != "No Results"){
                studentList.insertBefore(noResults, studentList.firstElementChild);
            }
        }
        else if(studentList.firstElementChild.textContent == "No Results"){
            studentList.firstElementChild.remove();
        }
    }
    //showDefault();

})

document.querySelector('.pagination').addEventListener("click", (e) => {
    function updateActivePageLink(){
        var elems = document.querySelector(".active");
        if (elems !== null) {
            elems.classList.remove("active");
        }
        e.target.className = "active";
    }
    console.log("click Pagination");
    
    if (e.target.nodeName === "A") {
        updateActivePageLink();
        let x = e.target.textContent;
        placeHolder = x;
        if (filtered == 0) {
            showPage(placeHolder);
        } else if (filtered == 1) {
            filterShowPage(placeHolder);
        };
    }
});