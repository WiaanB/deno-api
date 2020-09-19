// Importing Context for abc and the Book model
import { Context } from 'https://deno.land/x/abc/mod.ts'
import { Book } from '../models/bookModel.ts'
// Importing the UUID for crating books
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
// Creating a base array
let books: Book[] = [
    { id: '1', title: 'Name of the Wind', author: 'Patrick Rothfuss', pages: 500 },
    { id: '2', title: 'The Way of Kings', author: 'Brandon Sanderson', pages: 400 },
    { id: '3', title: 'Good Omens', author: 'Terry Pratchet', pages: 300 }
]
// Returning all the books
export const getAllBooks = (ctx: Context) => {
    return ctx.json(books, 200)
}
// Returning a book by id
export const getBook = (ctx: Context) => {
    const { id } = ctx.params
    const book = books.find( (b: Book) => b.id === id)
    if (book) { // Checking whether the book was found or not
        return ctx.json(book, 200)
    } else {
        return ctx.string('No book with that id, sorry', 404)
    }
}
// Creating a new book
export const createBook = async (ctx: Context) => {
    const { title, author, pages } = await ctx.body()
    const id = v4.generate()
    const book = {id, title, author, pages }
    books.push(book)
    return ctx.json(book, 201)
}
// Deleting a book by id
export const deleteBook = (ctx: Context) => {
    const { id } = ctx.params
    const book = books.find((b: Book) => b.id === id)
    if (book) { // Confirming the book exists
        books = books.filter((b: Book) => b.id !== id)
        return ctx.json(book, 200)
    } else {
        return ctx.string('No book found with that id, sorry', 404)
    }
}