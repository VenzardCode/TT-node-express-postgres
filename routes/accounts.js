const express = require('express');
const router = express.Router();
const accounts = require('../services/accounts');

/* GET accounts listing. */
router.get('/', async function (req, res, next) {
  res.status(200).json(await accounts.getAll());
});
router.get('/:role', async function (req, res, next) {
  if (req.params == null) req.params = {};
  const role = req.params.role;
  if (role == null || !(role == "admin" || role == "user")) {
    res.status(400).json({ error: "Invalid role" });
  }
  else {
    res.status(200).json(await accounts.getByRole(role));
  }
});
/* POST accounts creation. */
router.post('/', async function (req, res, next) {
  const errors = validate(req.body);
  if (errors.length == 0) {
    await accounts.create(req.body.firstname, req.body.lastname, req.body.state, req.body.username, req.body.email, req.body.role);
    res.status(200).json({ result: 'Ok' })
  }
  else {
    res.status(400).json({ errors: errors })
  }
});

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
    else {
      res.status(200).json({ result: 'Ok' })
    }
  }
  else {
    res.status(400).json({ errors: errors })
  }
});
/* DELETE accounts removal */

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
    else {
      res.status(200).json({ result: 'Ok' });
    }
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
  if (firstname == null || firstname.trim() == "") {
    errors.push("Invalid first name");
  }
  if (lastname == null || lastname.trim() == "") {
    errors.push("Invalid last name");
  }
  if (state == null || !(state == "male" || state == "female")) {
    errors.push("Invalid gender");
  }
  if (username == null || username.trim() == "") {
    errors.push("Invalid user name");
  }
  if (email == null || email.trim() == "" || email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) == null) {
    errors.push("Invalid email");
  }
  if (role == null || !(role == "admin" || role == "user")) {
    errors.push("Invalid role");
  }
  return errors;
}
module.exports = router;
