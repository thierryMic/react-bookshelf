/**
* @description - finds the index of a book object within an array of books
* @description - the search is not looking for the same Book object, it is only search for any
* @description book object with the same id
* @param {array} books - the array of Book objects to search
* @param {Book} book - the book to locate within the Books array
* @ returns the index of the Book within the array or -1 if the Book is not found
*/
function bookIndex (books, book) {
	if (books && book) {
		return books.findIndex((aBook) => aBook.id === book.id)
	}
	return -1
}


export default bookIndex