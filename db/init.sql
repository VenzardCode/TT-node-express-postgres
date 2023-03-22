CREATE TYPE userRoles as ENUM(
    'admin',
    'user'
);

CREATE TYPE state as ENUM(
    'male',
    'female'
);

CREATE TABLE profiles(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    state state NOT NULL
);

CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    role userRoles NOT NULL,
    dateCreate TIMESTAMP with TIME zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    profileId int NOT NULL,
    Foreign Key (profileId) REFERENCES profiles(id)
);

INSERT INTO profiles(firstname,lastname,state) VALUES
('Dan','Sanche','male'),
('Jet','Colora','female'),
('Mich','Glor','male'),
('Ann','Tress','female');

INSERT INTO users(username,email,role,profileid) VALUES
('Den004','Den@gmail.com','admin',1),
('Jet992','Jet@gmail.com','user',2),
('Mich932','Mich@gmail.com','user',3),
('Ann32','Ann@gmail.com','user',4);


