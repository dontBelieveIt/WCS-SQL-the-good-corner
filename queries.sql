DROP TABLE IF EXISTS ad;

CREATE TABLE ad 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHART (100) NOT NULL,
        description TEXT, 
        owner VARCHART (100) NOT NULL, 
        price INTEGER NOT NULL, 
        picture VARCHART (100), 
        location VARCHART (100), 
        createdAt CURRENT_DATE NOT NULL
    );