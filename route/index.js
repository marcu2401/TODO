const uuid = require('uuid');
const path = require('path');

const getTodosMW = require('../middleware/getTodos');
const getTodoMW = require('../middleware/getTodo');
const addTodoMW = require('../middleware/addTodo');
const deleteTodoMW  = require('../middleware/deleteTodo');
const renderMW = require('../middleware/render');

function addRoutes(app, db, myModel) {
    const objRep = {
        myModel, // JSON formátum arról amit utaztatok
        db, // adatbázis
        uuid // azonosítókat generál, tartalmaznia kell, postmanban nem kell használni
    }

    // objRep objektumban utaznak az adataink, annak a modellnek kell benne lennie (ha több akkor mindnek) amelyik perzisztál,
    // az uuid azért kell mert hátha kell új azonosító akkor ezt meg lehet adni UUIDV4-et kell használni!

    app.get("/todos" , getTodosMW(objRep) );
    app.get('/remove/:tid', getTodoMW(objRep), deleteTodoMW(objRep));
    app.get('/', getTodosMW(objRep), renderMW(objRep, 'index'));
    app.post('/addTodo', addTodoMW(objRep));// a mw a felfolgozási lánc nem legutolsó eleme, az objRepo-n keresztül utazttajuk az adatokat
    app.delete('/todo/:tid', getTodoMW(objRep), deleteTodoMW(objRep)); // lehet több tid is pl tid2
    app.get('/static/todo.css', (req,res,next) => { res.sendFile(path.join(__dirname, "../public/todo.css"))});
}

module.exports = addRoutes;