document.addEventListener('DOMContentLoaded', () => {
    // Display initial book list
    displayBooks();

    // Listen for a click on the button to display the add book form
    let newBookButton = document.getElementById('new-book');
    let addBookForm = document.querySelector('form');
    newBookButton.addEventListener('click', () => {
        addBookForm.classList.remove('hidden');
    })

    // Listen for a click on the button to add a book
    let addBookButton = document.getElementById('add-book');
    addBookButton.addEventListener('click', () => {
        let bookTitle = document.querySelector('#title').value;
        let bookAuthor = document.querySelector('#author').value;
        let bookPages = document.querySelector('#pages').value;
        let bookRead = document.querySelector('input[name="read"]:checked').value === 'true' ? true : false;
        addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
        
        // Display books again, including the newly added one
        displayBooks();

        // Clear and hide the form
        addBookForm.reset();
        addBookForm.classList.add('hidden');
    })
});

let myLibrary = [
    {title: 'The Hobbit', author: 'J.R.R Tolkien', pages: 295, read: true},
    {title: 'James and the Giant Peach', author: 'Roal Dahl', pages: 125, read: false}
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read)
    myLibrary.push(book);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
}

function listenForBookRemoval() {
    // Listen for click on the buttons to remove a book
    let removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => button.addEventListener('click', () =>  {
        // Get the index of the book in myLibrary from the article id
        let bookIndex = button.parentElement.dataset.attribute;
        removeBook(bookIndex);
        displayBooks();
    }))
}

function listenForReadToggle() {
    // Listen for click on the buttons to toggle read/unread status
    let readButtons = document.querySelectorAll('.toggle-read');
    readButtons.forEach(button => button.addEventListener('click', () => {
        // Get the index of the book in myLibrary from the article id
        let bookIndex = button.parentElement.dataset.attribute;
        // Toggle the book's read/unread status
        myLibrary[bookIndex].read =  !(myLibrary[bookIndex].read); 
        // Update the book details on the page
        let bookRead = document.querySelector(`[data-attribute="${bookIndex}"] .read-status`);
        bookRead.textContent = `${myLibrary[bookIndex].read ? 'Read' : 'Not read'}`;
    }))
}

function displayBooks() {
    // Get the books container from the page
    let booksContainer = document.getElementById('books');

    // Clear current contents of books container, if any
    booksContainer.textContent = '';

    for (item of myLibrary) {
        // Create an article element to hold the book details
        let bookArticle = document.createElement('article');
        let bookIndex = myLibrary.indexOf(item);
        bookArticle.setAttribute('data-attribute', bookIndex);

        // Create header and paragraphs to display book details
        let bookTitle = document.createElement('h2');
        bookTitle.textContent = item.title;
        let bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${item.author}`;
        let bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${item.pages}`;
        let bookRead = document.createElement('p');
        bookRead.textContent = `${item.read ? 'Read' : 'Not read'}`;
        bookRead.className = 'read-status';

        // Create buttons and add them to the book article
        let removeButton = document.createElement('button');
        removeButton.className = 'remove';
        removeButton.textContent = 'Remove';

        let toggleReadButton = document.createElement('button');
        toggleReadButton.className = 'toggle-read';
        toggleReadButton.textContent = 'Mark read/unread';

        // Add the book details to the book article
        bookArticle.append(bookTitle, bookAuthor, bookPages, bookRead, toggleReadButton, removeButton);

        // Add the book article to the books container
        booksContainer.append(bookArticle);   
    }

    // Add event listeners on read toggle buttons and remove buttons
    listenForReadToggle();
    listenForBookRemoval();
}

