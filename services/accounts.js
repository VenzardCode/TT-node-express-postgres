const db = require('./db');
/**
 * Gets all users and thair profiles.
 * @returns {Array<any>} all users and thair profiles
 * 
 */
async function getAll() {

  const { rows } = await db.query(`
    SELECT users.id,username,email,role,datecreate,firstname,lastname,state 
    FROM users 
    LEFT JOIN profiles ON users.profileid = profiles.id`);
  return rows ?? [];

}
/**
 * Gets all users by their role.
 * @param {string} role The role.
 * @returns {Array<any>} all users by their role
 * 
 */
async function getByRole(role) {

  const { rows } = await db.query(`
    SELECT users.id,username,email,role,datecreate,firstname,lastname,state
    FROM users 
    LEFT JOIN profiles ON users.profileid = profiles.id
    WHERE role = $1`, [role]);
  return rows ?? [];

}
/**
 * sets parameters of the user by id
 * @param {number} id the id of the user
 * @param {string} username the username of the user
 * @param {string} email the email of the user
 * @param {string} role the role of the user
 * @param {string} firstname the first name of the user
 * @param {string} lastname the last name of the user
 * @param {string} state the gender of the user
 */
async function setById(id, username, email, role, firstname, lastname, state) {
  const { rowCount } = await db.query(`
  UPDATE profiles 
  SET firstname =$2,lastname=$3,state =$4
  from users 
  WHERE users.profileid = profiles.id AND users.id=$1;
  `, [id, firstname, lastname, state]);
  if (rowCount != 0) {
    await db.query(`
  UPDATE users 
  SET username =$2,email =$3,role=$4  
  WHERE users.id=$1
  `, [id, username, email, role]);
  }
  return rowCount;
}
/**
 * creates user which parameters
 * @param {string} firstname the first name of the user
 * @param {string} lastname the last name of the user
 * @param {string} state the gender of the user
 * @param {string} username the username of the user
 * @param {string} email the email of the user
 * @param {string} role the role of the user
 */
async function create(firstname, lastname, state, username, email, role) {
  await db.query(`WITH x AS(
    INSERT INTO profiles (firstname, lastname, state)
    VALUES($1,$2,$3)
    RETURNING id as profileid
)
INSERT INTO users (username,email,role,profileid)
SELECT $4,$5,$6, profileid FROM x;`, [firstname, lastname, state, username, email, role]);

}

/**
 * deletes user by id
 * @param {number} id the id of the user
 */
async function deleteById(id) {
  const { rowCount } = await db.query(`WITH x AS(
    DELETE FROM users
    WHERE id=$1
    RETURNING profileid
)
DELETE FROM profiles
USING x
WHERE profiles.id=x.profileid`, [id]);
  return rowCount;

}


module.exports = {
  deleteById,
  create,
  setById,
  getByRole,
  getAll
}