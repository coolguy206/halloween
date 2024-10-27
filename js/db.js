import PouchDB from 'pouchdb';
const db = new PouchDB('attendees');

//? OBJECT TO SEND EXAMPLE
// const todo = {
//     _id: new Date().toISOString(),
//     title: text,
//     completed: false
// };

//? SEND TO DB
// db.put(todo, function callback(err, result) {
//     if (!err) {
//         console.log('Successfully posted a todo!');
//     }
// });

//? GET ALL FROM DB
// db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
//     redrawTodosUI(doc.rows);
// });

//? TO EDIT DB
// db.changes({
//     since: 'now',
//     live: true
// }).on('change', showTodos);