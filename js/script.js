/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Joseph Bertino, 2020
*/

// Dynamically Create and Add a Search Bar
// Place this search bar before the end of <header class='header'>
const header = document.querySelector('header.header');
const searchHTML = `
    <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
`;
header.insertAdjacentHTML('beforeend',searchHTML);

//////// Add functionality to the Search Bar
const searchLabel = document.querySelector('label.student-search');
const searchInput = searchLabel.querySelector('input');
const searchButton = searchLabel.querySelector('button');

/**
 *
 * Filter and display the student cards based on the search pattern.
 *
 * @param {Event}   e   The search event. Not used currently.
 * 
 */
const showSubPage = (e) => {
    /*
        trim() whitespace to allow for the possibility of a pattern including portions of both the first and last name. 
        The pattern "ary j" will yield a match for "Mary Jane", while the pattern "ary " will match "Mary Jane" as well as "Karyn Fields".
    */
    let pattern = searchInput.value.toLowerCase().trim();
    let sublist = [];
    
    // Iterate through the complete list of students, looking for those whose names match or include the search pattern entered by the user
    data.forEach((student) => {
        let fullName = student.name.first + ' ' + student.name.last;
        // If the pattern is found in the student name, add the student to our filtered list
        if (fullName.toLowerCase().includes(pattern)) {
            sublist.push(student);
        }
    });
    // Display the filtered student cards onto the page and update the pagination buttons.
    if (sublist.length > 0) {
        showPage(sublist, 1); 
        addPagination(sublist);
    }
    // If the filtered student list is empty, display a "No Results" message on screen
    else {
        noResults();
    }   
};

/**
 *
 * When the "Search" button is clicked, call showSubPage().
 * 
 */
searchButton.addEventListener('click', (e) => {
    showSubPage(e);
});

/**
 *
 * When the "Search" input value is updated, call showSubPage().
 *
 */
searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value.trim() === '') {
        // If input is empty, show full student list by default.
        showPage(data, 1);
        addPagination(data);
    } else {
        showSubPage(e);
    }
});

/**
 * Clear the pagination buttons from the page.
 * 
 * @return {HTMLElement} buttonList     The DOM UL element with class 'link-list'
 * 
*/
const clearButtons = () => {
    // Select the UL element with a class of link-list and assign its value to a variable. 
    const buttonList = document.querySelector('ul.link-list');
    // Use the innerHTML property to set the HTML content of the link-list variable you just created to an empty string. 
    buttonList.innerHTML = '';
    
    return buttonList;
};

/**
 * Print a "No results" message to the screen and remove pagination buttons.
 * 
 * The ul.innerHTML will be re-set when the search pattern is updated.
 * 
*/
const noResults = () => {
    const ul = document.querySelector('ul.student-list');
    ul.innerHTML = `
        <p>No results found. Try another search pattern.</p>
    `;
    
    clearButtons();
};

////// END SEARCH BAR FUNCTIONALITY

/**
 * Insert/append the elements needed to display a page of nine students.
 *
 * Given a list of students (with biographical details) and a page number, generate a page
 * displaying nine of those students.
 *
 * @param {Array}   list    The full list of student data.
 * @param {Number}  page    The page to generate. Index starts at 1. 
 *
*/
const showPage = (list, page) => {
    // Create two variables to store the start index and the end index of the list items to be displayed on the given page.
    const startIdx = (page * 9) - 9;
    const endIdx = (page * 9);

    // Select the UL element with a class of student-list and assign its value to a variable.
    const ul = document.querySelector('ul.student-list');
    
    // Use the innerHTML property set the HTML content of the student-list variable you just created to an empty string. This will remove any students that might have previously been displayed.
    ul.innerHTML = '';
    
    // Loop over the list parameter.
    for (let i = 0; i < list.length; i++) {
        // If the current index (i) is greater than or equal to the start index variable and less than the end index variable...
        if (startIdx <= i && i < endIdx) {
            // Create the DOM elements needed to display the information for each matching student as you iterate over the list parameter. 
            let info = list[i]
            let liHTML = `
                <li class="student-item cf">
                  <div class="student-details">
                    <img class="avatar" src=${info.picture.large} alt="Profile Picture">
                      <h3>${info.name.first} ${info.name.last}</h3>
                      <span class="email">${info.email}</span>
                  </div>
                  <div class="joined-details">
                    <span class="date">Joined ${info.registered.date}</span>
                  </div>
                </li>
            `;
            // Insert the elements you have created to the student-list variable you created earlier.
            ul.insertAdjacentHTML('beforeend', liHTML);
        }
    }
};


/**
 * Create and insert/append the elements needed for the pagination buttons.
 *
 * @param {Array}   list    Array of the student data.
 *
*/
const addPagination = (list) => {
    // Create a variable to store the value of the number of pagination buttons needed.
    const pageCount = Math.ceil(list.length / 9)
    
    buttonList = clearButtons();
    
    // Only create pagination buttons (and their listener events) if there will be at least 2.
    if (pageCount > 1) {    
        for (let i = 1; i <= pageCount; i++) {
            // Create the DOM elements needed to display the pagination button as you iterate over the number of pages.
            let buttonHTML = `
                <li>
                  <button type="button">${i}</button>
                </li>
            `;
            buttonList.insertAdjacentHTML('beforeend',buttonHTML);
        }
    
        // Select the first pagination button and give it a class name of active.
        const first = buttonList.firstElementChild.querySelector('button');
        first.className = 'active';
        
        // Create an event listener to listen for clicks on the link-list variable that you created earlier.
        buttonList.addEventListener('click', (e) => {
            // The click event should only fire when the buttons are clicked.
            if (e.target.tagName === 'BUTTON') {
                // Remove the active class from any other pagination button.
                const buttons = buttonList.querySelectorAll('BUTTON');
                [...buttons].forEach((b) => {
                    b.className = '';
                });
                
                // Add the active class to the pagination button that was just clicked.
                e.target.className = 'active';
                
                // Call the showPage function passing the list parameter and the page number to display as arguments.
                const page = parseInt(e.target.textContent, 10);
                showPage(list, page);
            }
        });    
    }
};

// Call functions
showPage(data, 1);
addPagination(data);