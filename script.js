document.addEventListener('DOMContentLoaded', () => {
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
        let bookRead = document.querySelector('input[name="read"]').value;
        addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);

        // Clear current contents of books container
        document.getElementById('books').textContent = '';

        // Display the list of books again, including the newly added one
        displayBooks();

        // Clear and hide the form
        addBookForm.reset();
        addBookForm.classList.add('hidden');
    })
});

let myLibrary = [
    {title: 'The Hobbit', author: 'J.R.R Tolkien', pages: 295, read: true},
    {title: 'James and the Giant Peach', author: 'Roal Dahl', pages: 125, read: false},
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

function displayBooks() {
    // Get the books container from the page
    let booksContainer = document.getElementById('books');

    for (item of myLibrary) {
        // Create an article element to hold the book details
        let bookArticle = document.createElement('article');

        // Create header and paragraphs to display book details
        let bookTitle = document.createElement('h2');
        bookTitle.textContent = item.title;
        let bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${item.author}`;
        let bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${item.pages}`;
        let bookRead = document.createElement('p');
        bookRead.textContent = `${item.read ? 'Read' : 'Not read'}`;

        // Add the book details to the book article
        bookArticle.append(bookTitle, bookAuthor, bookPages, bookRead);

        // Add the book article to the books container
        booksContainer.append(bookArticle);
    }
}

