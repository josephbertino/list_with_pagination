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
`
header.insertAdjacentHTML('beforeend',searchHTML);

// Add functionality to the Search Bar

// const searchFN = (searchInput, names) => {
//   console.log(searchInput);
//   console.log(names);
//   [...names].forEach((name) => {
//     name.classList.remove('match'); 
//     if (searchInput.value.length !== 0 && name.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
//       name.classList.add('match');
//     }
//   });
// };


/**
 * Create and insert/append the elements needed to display a "page" of nine students.
 *
 * Given a list of students (with biographical details) and a page number, generate a page
 * displaying nine of those students.
 *
 * @param {Array}   list    The full list of students
 * @param {Number}  page    The page to generate. Index starts at 1. 
 *
 * @return {null}   Does not return anything
*/
const showPage = (list, page) => {
    // Create two variables to store the start index and the end index of the list items to be displayed on the given page.
    const startIdx = (page * 9) - 9;
    const endIdx = (page * 9);

    // Select the UL element with a class of student-list and assign its value to a variable.
    const ul = document.querySelector('.student-list');
    
    // Use the innerHTML property set the HTML content of the student-list variable you just created to an empty string. This will remove any students that might have previously been displayed.
    ul.innerHTML = '';
    
    // Loop over the list parameter.
    for (let i = 0; i < list.length; i++) {
        if (startIdx <= i && i < endIdx) {
            var info = list[i]
            var liHTML = `
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
            
            ul.insertAdjacentHTML('beforeend', liHTML);
        }
    }
};


/**
 * This function will create and insert/append the elements needed for the pagination buttons.
 *
 * @param {Array}   list    Array of the student data.
 *
 * @return {null}   Does not return anything
*/
const addPagination = (list) => {
    // Create a variable to store the value of the number of pagination buttons needed.
    const pageCount = Math.ceil(list.length / 9)
    
    // Select the UL element with a class of link-list and assign its value to a variable. Use the innerHTML property set the HTML content of the link-list variable you just created to an empty string. 
    const buttonList = document.querySelector('.link-list');
    buttonList.innerHTML = '';
    
    // Loop over the variable for the number of pages needed that you created earlier.
    for (let i = 1; i <= pageCount; i++) {
        // Create the DOM elements needed to display the pagination button as you iterate over the number of pages.
        var buttonHTML = `
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
            [...buttonList.children].forEach((li) => {
                var b = li.querySelector('button');
                if (b !== e.target) {
                    b.className = '';
                }
            });
            
            // Add the active class to the pagination button that was just clicked.
            e.target.className = 'active';
            
            // Call the showPage function passing the list parameter and the page number to display as arguments.
            const page = parseInt(e.target.textContent, 10);
            showPage(data, page);
        }
    });
};

// Call functions
showPage(data, 1);
addPagination(data);