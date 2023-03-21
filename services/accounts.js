const db = require('./db');
const config = require('../config');

/**
 * Gets all users and thair profiles.
 * @returns {Array<any>} all users and thair profiles
 * 
 */
async function getAll(){
    
    const rows= await db.query(`
    SELECT users.id,username,email,role,datecreate,firstname,lastname,state 
    FROM users 
    LEFT JOIN profiles ON users.profileid = profiles.id`);
    return rows??[];

}
/**
 * Gets all users by their role.
 * @param {string} role The role.
 * @returns {Array<any>} all users by their role
 * 
 */
async function getByRole(role){
    
    const rows= await db.query(`
    SELECT * FROM users 
    WHERE role = $1`,[role]);
    return rows??[];

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
async function setById(id,username,email,role,firstname,lastname,state){
  await db.query(`BEGIN;
  UPDATE users 
  SET username =$2,email =$3,role=$4  
  WHERE users.id=$1;
  UPDATE profiles 
  SET firstname =$5,lastname=$6,state =$7
  from users 
  WHERE users.profileid = profiles.id AND users.id=$1;
  COMMIT;`,[id,username,email,role,firstname,lastname,state]);

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
async function create(firstname,lastname,state,username,email,role){
  await db.query(`WITH x AS(
    INSERT INTO profiles (firstname, lastname, state)
    VALUES($1,$2,$3)
    RETURNING id as profileid
)
INSERT INTO users (username,email,role,profileid)
SELECT $4,$5,$5, profileid FROM x;`,[firstname,lastname,state,username,email,role]);

}

/**
 * deletes user by id
 * @param {number} id the id of the user
 */
async function deleteById(id){
  await db.query(`WITH x AS(
    DELETE FROM users
    WHERE id=$1
    RETURNING profileid
)
DELETE FROM profiles
USING x
WHERE profiles.id=x.profileid`,[id]);

}

module.exports = {
  deleteById,
  create,
  setById,
  getByRole,
  getAll
}