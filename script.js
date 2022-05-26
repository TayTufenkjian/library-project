document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
});

let myLibrary = [
    {title: 'The Hobbit', author: 'J.R.R Tolkien', pages: 295, read: true},
    {title: 'Test Book', author: 'Jo Schmo', pages: 30, read: true},
    {title: 'James and the Giant Peach', author: 'Roal Dahl', pages: 125, read: false},
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    // stuff
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

