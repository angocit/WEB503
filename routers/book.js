import express from 'express'
import { GetALLBook,GetBookByID,AddBooks,UpdateBooks,DeleteBooks} from '../controllers/book.js'
import {CheckPermission} from '../permission/auth.js'
import {BookValidate} from '../validate/validate.js'
const bookrouter = express.Router()
bookrouter.get('/books',GetALLBook)
bookrouter.get('/books/:id',GetBookByID)
bookrouter.post('/books',CheckPermission,BookValidate,AddBooks)
bookrouter.put('/books/:id',CheckPermission,BookValidate,UpdateBooks)
bookrouter.delete('/books/:id',CheckPermission,DeleteBooks)
export default bookrouter