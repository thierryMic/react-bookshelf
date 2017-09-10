function bookIndex (books, book) {
	if (books && book) {
		return books.findIndex((aBook) => aBook.id === book.id)
	}
	return -1
}


export default bookIndex