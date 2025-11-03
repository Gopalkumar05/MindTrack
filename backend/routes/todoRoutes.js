import  express  from 'express';
import {getAllTodos,deleteTodo,addTodo,updateTodo} from '../Controllers/TodoController.js'
const route=express.Router();

route.post('/add',addTodo);
route.get('/all',getAllTodos)
route.delete('/delete/:id',deleteTodo)
route.put('/update/:id',updateTodo)
export default route;