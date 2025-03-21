DROP TABLE IF EXISTS categories ;
DROP TABLE IF EXISTS tags ; 
DROP TABLE IF EXISTS ads;
DROP TABLE IF EXISTS ad_tags ;

PRAGMA foreign_keys = ON ; 


CREATE TABLE categories 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(100) NOT NULL
    );

CREATE TABLE tags 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(100) NOT NULL
    ); 
    
CREATE TABLE ads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(100) NOT NULL,
        description TEXT, 
        owner VARCHAR(100) NOT NULL, 
        price INTEGER NOT NULL, 
        picture VARCHAR(100), 
        location VARCHAR(100), 
        createdAt DATE NOT NULL, 
        category_id INTEGER NOT NULL, 
        FOREIGN KEY (category_id) REFERENCES categories(id) 
    );


CREATE TABLE ad_tags 
    (
        ad_id INT NOT NULL, 
        tag_id INT NOT NULL,
        PRIMARY KEY (ad_id, tag_id), 
        FOREIGN KEY (ad_id) REFERENCES ad(id), 
        FOREIGN KEY (tag_id) REFERENCES tag(id)
    );

INSERT INTO categories (title) VALUES 
    ('Other'),
    ('Car'), 
    ('Hifi')
; 

INSERT INTO ads(title, description, owner, price, picture, location, createdAt, category_id) VALUES
    ('Vintage Wooden Chair', 'A beautiful vintage wooden chair in great condition.', 'John Doe', 120, 'chair1.jpg', 'Bordeaux', '2024-09-01', 1),
    ('Modern Sofa Set', 'A comfortable and modern sofa set, perfect for any living room.', 'Jane Smith', 899, 'sofa1.jpg', 'Paris', '2025-03-19', 1),
    ('Smartphone for Sale', 'A brand new smartphone with all accessories included.', 'Mike Johnson', 500, 'phone1.jpg', 'Lyon', '2025-03-19', 1),
    ('Office Desk', 'Ergonomic office desk, perfect for home office setup.', 'Sarah Lee', 150, 'desk1.jpg', 'Bordeaux', '2025-03-19', 1),
    ('Luxury Watch', 'High-end luxury watch in pristine condition, barely used.', 'Alice Brown', 2500, 'watch1.jpg', 'Paris', '2025-03-19', 1),
    ('Mountain Bike', 'Durable and fast mountain bike, great for trails and adventures.', 'Tom Green', 350, 'bike1.jpg', 'Lyon', '2025-03-19', 1),
    ('Leather Jacket', 'Genuine leather jacket, size M, almost new.', 'Eve White', 200, 'jacket1.jpg', 'Bordeaux', '2025-03-19', 1),
    ('Dining Table Set', 'Elegant dining table with six chairs, perfect for families.', 'Robert Black', 600, 'dining1.jpg', 'Paris', '2025-03-19', 1),
    ('Electric Guitar', 'Electric guitar in perfect condition, includes amp and accessories.', 'Steve Harris', 700, 'guitar1.jpg', 'Lyon', '2025-03-19', 3),
    ('Coffee Maker', 'High-quality coffee maker, still under warranty, barely used.', 'Laura King', 100, 'coffee1.jpg', 'Bordeaux', '2025-03-19', 1),
    ('Fitness Treadmill', 'Advanced fitness treadmill with multiple settings and programs.', 'Chris Turner', 900, 'treadmill1.jpg', 'Paris', '2025-03-19', 1),
    ('Winter Coat', 'Warm winter coat, size L, used but in good condition.', 'David Clark', 120, 'coat1.jpg', 'Lyon', '2025-03-19', 1),
    ('Camping Tent', 'Four-person camping tent, easy to set up and very durable.', 'Hannah Scott', 250, 'tent1.jpg', 'Bordeaux', '2025-03-19', 1),
    ('Outdoor Grill', 'High-end outdoor grill, perfect for barbecues.', 'Michael Miller', 450, 'grill1.jpg', 'Paris', '2025-03-19', 1),
    ('Air Purifier', 'Air purifier with HEPA filter, great for allergies and air quality.', 'Jessica Moore', 300, 'purifier1.jpg', 'Lyon', '2025-03-19', 1),
    ('Refrigerator', 'Brand new refrigerator, energy-efficient and spacious.', 'Daniel Davis', 800, 'fridge1.jpg', 'Bordeaux', '2024-09-01', 1),
    ('Smart TV', '4K Smart TV with streaming apps, amazing picture quality.', 'Olivia Taylor', 700, 'tv1.jpg', 'Paris', '2025-03-19', 3),
    ('Bike Rack', 'Car bike rack, fits most vehicles, in excellent condition.', 'Samuel Jackson', 80, 'rack1.jpg', 'Lyon', '2025-03-19', 1),
    ('Portable Speaker', 'Waterproof portable Bluetooth speaker, excellent sound quality.', 'Monica White', 150, 'speaker1.jpg', 'Bordeaux', '2025-03-19', 3),
    ('Designer Handbag', 'Authentic designer handbag, barely used, like new.', 'Emily Harris', 1200, 'bag1.jpg', 'Paris', '2025-03-19', 1),
    ('Gaming Laptop', 'High-performance gaming laptop, top-of-the-line specs, great condition.', 'George Adams', 1500, 'laptop1.jpg', 'Lyon', '2025-03-19', 3)
;

INSERT INTO tags (title) VALUES 
    ('new'), 
    ('sold out')
; 

INSERT INTO ad_tags (ad_id) SELECT ads.id FROM ads ; 

-- INSERT INTO ad_tags (tag_id)
-- SELECT tags.id
-- FROM tags;

-- SELECT ads.id, tags.id, tags.title 
-- FROM ads
-- LEFT JOIN tags 
-- ON ads.title = tags.title ;