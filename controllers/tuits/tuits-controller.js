// import posts from "./tuits.js";
// let tuits = posts;
import * as tuitsDao from './tuits-dao.js'      // import the dao

const createTuit = async (req, res) => {        // now it's asynchronous function
    const newTuit = req.body;                   // retrieve data from HTTP body
    // newTuit._id = (new Date()).getTime()+'';    // add _id field as a time stamp  // ID created by database instead
    newTuit.image = "../images/NASA.png";
    newTuit.likes = 0;                          // initialize likes counter
    newTuit.liked = false;                      // initialize liked flag
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    newTuit.handle = "@nasa";
    newTuit.time = "just now";
    // tuits.push(newTuit);                        // append new tuit to tuits array // not using array anymore
    const insertedTuit = await tuitsDao.createTuit(newTuit);    // actual tuit inserted in database with DAO's createTuit
    res.json(insertedTuit);                        // respond with actual inserted tuit
    // res.json(newTuit);                          // respond with new tuit
}                                                  // next chapter will store in database instead
  

// 5.1 Retrieving data from a RESTful Web service API
const findTuits = async (req, res) => {                 // now it's asynchronous function
    const tuits = await tuitsDao.findTuits();           // retrieve tuits from database
    res.json(tuits)
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;     // retrieve the ID of the tuit we want to remove
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);  // success/failure status deleting record from database
    // tuits = tuits.filter((t) => t._id !== tuitdIdToDelete);     // filter out the tuit from the tuits array // no longer using array
    res.json(status);                               // respond with status object
    // res.sendStatus(200);                         // respond with success
}

const updateTuit = async (req, res) => {
    const tuitdId = req.params.tid;                                    // get ID of tuit to update from path
    const updates = req.body;                                          // get updates from HTTP body
    // no longer using array
        // const tuitIndex = tuits.findIndex((t) => t._id === tuitdId) // find index of tuit to update in the tuits array
    // no longer using array
        // tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};        // update the element in tuits array merging old tuit 
    const status = await tuitsDao.updateTuit(tuitdId, updates);         // status reports success or failure to update document in database
    res.json(status);                                                   // respond with status object
    // res.sendStatus(200);                                             // with updates, and respond with success
}
  

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
