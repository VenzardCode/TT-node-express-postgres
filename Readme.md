# API

## Get all accounts
----

* **URL**
  
  /accounts

* **Method:**
  
  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [{"id":1,
    "username":"Den004",
    "email":"Den@gmail.com",
    "role":"admin",
    "datecreate":"2023-03-22T14:54:24.612Z",
    "firstname":"Dan",
    "lastname":"Sanche",
    "state":"male"},
    {...},]
    ```

## Get accounts by role
----

* **URL**
  
  /accounts/:role

* **Method:**
  
  `GET`
  
*  **URL Params**
   
   **Required:**
   
   `role="admin" | "user"`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [{"id":1,
    "username":"Den004",
    "email":"Den@gmail.com",
    "role":"admin",
    "datecreate":"2023-03-22T14:54:24.612Z",
    "firstname":"Dan",
    "lastname":"Sanche",
    "state":"male"},
    {...}]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD RECQUEST<br />
    **Content:**
    ```json
    {
        "error" : "Invalid role"
    }
    ```

## Create an account
----

* **URL**
  
  /accounts

* **Method:**
  
  `POST`
  
*  **URL Params**
   
   None

* **Data Params**

  **Required:**

   `firstname=[string]`

   `lastname=[string]`

   `state="male" | "female"`

   `email=[string]`

   `username=[alphanumeric]`

   `role="user" | "admin"`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "result": "Ok"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
        "errors" : ["<ERROR_MESSAGE_STRING>",...]
    }
    ```
    **Possible Error Messages:**
    - `Invalid first name`
    - `Invalid last name`
    - `Invalid gender`
    - `Invalid user name`
    - `Invalid email`
    - `Invalid role`


## Modify an account by id
----

* **URL**
  
  /accounts/:id

* **Method:**
  
  `POST`
  
*  **URL Params**
   
   **Required:**
   
    `id=[number]`

* **Data Params**

  **Required:**

   `firstname=[string]`

   `lastname=[string]`

   `state="male" | "female"`

   `email=[string]`

   `username=[alphanumeric]`

   `role="user" | "admin"`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "result": "Ok"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
        "errors" : ["<ERROR_MESSAGE_STRING>",...]
    }
    ```
    **Possible Error Messages:**
    - `Invalid first name`
    - `Invalid last name`
    - `Invalid gender`
    - `Invalid user name`
    - `Invalid email`
    - `Invalid role`
    - `Invalid id`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
        "errors" : ["Account not found"]
    }
    ```

## Delete an account by id
----

* **URL**
  
  /accounts/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**
   
   **Required:**
   
    `id=[number]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "result": "Ok"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
        "error" : "Invalid id"
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
        "error" : "Account not found"
    }
    ```
    