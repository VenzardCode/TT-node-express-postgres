const express = require('express');
const router = express.Router();
const accounts = require('../services/accounts');

/* GET accounts listing. */

/*Get all accounts*/
router.get('/', async function (req, res, next) {
  res.status(200).json(await accounts.getAll());
});

/*Get accounts by role*/
router.get('/:role', async function (req, res, next) {
  if (req.params == null) req.params = {};
  const role = req.params.role;
  if (role == null || !(role == "admin" || role == "user")) {
    res.status(400).json({ error: "Invalid role" });
  }
  res.status(200).json(await accounts.getByRole(role));
});

/* POST accounts creation. */

/*Create account*/
router.post('/', async function (req, res, next) {
  const errors = validate(req.body);
  if (errors.length == 0) {
    await accounts.create(req.body.firstname, req.body.lastname, req.body.state, req.body.username, req.body.email, req.body.role);
    res.status(200).json({ result: 'Ok' })
  }
  res.status(400).json({ errors: errors })
});

/*Modify account by id*/
router.post('/:id', async function (req, res, next) {
  if (req.params == null) req.params = {};
  const errors = validate(req.body);
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    errors.push("Invalid id");
  }
  if (errors.length == 0) {
    const result = await accounts.setById(id, req.body.username, req.body.email, req.body.role, req.body.firstname, req.body.lastname, req.body.state);
    if (result == 0) {
      res.status(404).json({ errors: ['Account not found'] })
    }
    res.status(200).json({ result: 'Ok' })
  }
  res.status(400).json({ errors: errors })
});

/* DELETE accounts removal */

/*Delete account by id*/
router.delete('/:id', async function (req, res, next) {
  if (req.params == null) req.params = {};
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
  }
  else {
    const result = await accounts.deleteById(id)
    if (result == 0) {
      res.status(404).json({ error: 'Account not found' })
    }
    res.status(200).json({ result: 'Ok' });
  }
});

/**
 * Validate the account details
 * @param {any} body 
 * @returns {Array<string>} errors 
 */
function validate(body) {
  const errors = [];
  if (body == null) body = {};
  const firstname = body.firstname;
  const lastname = body.lastname;
  const state = body.state;
  const username = body.username;
  const email = body.email;
  const role = body.role;

  if (validateRequiredField(firstname)) {
    errors.push("Invalid first name");
  }
  if (validateRequiredField(lastname)) {
    errors.push("Invalid last name");
  }
  if (validateRequiredField(state) || !(state == "male" || state == "female")) {
    errors.push("Invalid gender");
  }
  if (validateRequiredField(username)) {
    errors.push("Invalid user name");
  }
  if (validateRequiredField(email) || email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) == null) {
    errors.push("Invalid email");
  }
  if (validateRequiredField(role) || !(role == "user" || role == "admin")) {
    errors.push("Invalid role");
  }
  
  return errors;
}

/**
* Validate feald is not null or empty
* @param {any} field 
* @returns {boolean}  
*/
function validateRequiredField(field) {
  if (field == null || field.trim() == "") {
    return true;
  }
  return false;
}

module.exports = router;
