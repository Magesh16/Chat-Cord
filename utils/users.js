const users = [];

// JOIN USER TO CHAT
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// GET CURRENT USER
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}


module.exports ={userJoin,getCurrentUser};