// Importing the ABC files I need
import { Application, Context } from 'https://deno.land/x/abc/mod.ts'
// Importing the Book Controller
import { 
    getAllBooks, 
    getBook, 
    createBook, 
    deleteBook } from './controllers/bookController.ts'
// Creating an ABC app
const app = new Application()

// Static files
app.static('/', './public')

// Basic landing page for the routes
app.get('/', async ( ctx: Context) => {
    await ctx.file('./public/index.html')
})
// Routes for the Books API
app
    .get('/books', getAllBooks)
    .get('/books/:id', getBook)
    .post('/books',createBook )
    .delete('/books/:id', deleteBook)

// Listen to port
app.start({ port: 3000 })