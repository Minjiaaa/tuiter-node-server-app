// import people from './users.js'         // import the array of users. Include the extension
// let users = people
import * as usersDao from './users-dao.js';     // import the DAO
                                                // don't use the array anymore


const UserController = (app) => {       // use express instance app to declare HTTP GET
   app.get('/api/users', findUsers)     // request pattern /api/users to call a function
   app.get('/api/users/:uid', findUserById);    // map path pattern to handler function
   app.post('/api/users', createUser);          // map URL pattern to handler function
   app.delete('/api/users/:uid', deleteUser);   // map URL pattern to handler function
   app.put('/api/users/:uid', updateUser);      // 4.5 Updating data in a Web server with Postman
}

const createUser = async (req, res) => {
    const newUser = req.body;
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser);
}

const updateUser = async(req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    const status = await usersDao.updateUser(userId, updates);
    const user = await usersDao.findUserById(userId);
    req.session["currentUser"] = user;
    res.json(status);
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const status = await usersDao.deleteUser(userId);
    res.json(status);
}

const findUserById = async (req, res) => {                  // make functions async
    const userId = req.params.uid;
    const user = await usersDao.findUserById(userId);       // use DAO instead of array
    res.json(user);
}

const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else if (username) {
      const user = await usersDao.findUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      const users = await usersDao.findAllUsers();
      res.json(users);
    }
};

// 4.3 Posting data to a Web server using Postman
// const createUser = (req, res) => {              // function invoked if URL matches pattern
//     const newUser = req.body;                   // extract new user from BODY in request
//     newUser._id = (new Date()).getTime() + '';  // add an _id property with unique timestamp
//     users.push(newUser);                        // append new user to users array
//     res.json(newUser);                          // respond with new user to client
// }

// 4.5 Updating data in a Web server with Postman
// const updateUser = (req, res) => {              // handle PUT /api/users/:uid
//     const userId = req.params['uid'];           // get user ID from path
//     const updates = req.body;                   // BODY includes updated fields
//     users = users.map((usr) =>                  // create a new array of users
//       usr._id === userId ?                      // if current user's ID matches ID we want to update
//         {...usr, ...updates} :                  // merge old usr with new updates
//         usr                                     // otherwise keep the old user
//     );
//     res.sendStatus(200);                        // return OK
// }
   

// 4.4 Deleting data from a Web server using Postman
// const deleteUser = (req, res) => {
//     const userId = req.params['uid'];                   // get user ID from path parameter uid filter out the user
//     users = users.filter(usr => usr._id !== userId);    // whose ID is the ID of the user we want to remove
//     res.sendStatus(200);                                // respond with success code
// }
  
// 3.3 Sending path parameters to a Web server
// const findUserById = (req, res) => {        // function called if URL matches pattern
//     const userId = req.params.uid;          // get uid from request parameter map
//     const user = users                      // find user in users array whose _id
//       .find(u => u._id === userId);         // matches userId retrieved from params
//     res.json(user);                         // respond to client with user found
// }
  
// const findUsers = (req, res) => {       // function runs when /api/users requested
//     const type = req.query.type         // retrieve type parameter from query
//     if(type) {                          // if type parameter in query
//         const usersOfType = users       // find users of that type
//             .filter(u => u.type === type)
//         res.json(usersOfType)           // respond with users of that type
//         return                          // return so it doesn't continue
//     }                                   // otherwise respond with all users
//    res.json(users)                      // responds with JSON array of users
// }
export default UserController           // exports so app.js can import