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
        createdAt DATE NOT NULL
    );

INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES
('Vintage Wooden Chair', 'A beautiful vintage wooden chair in great condition.', 'John Doe', 120, 'chair1.jpg', 'Bordeaux', '2023-09-01'),
('Modern Sofa Set', 'A comfortable and modern sofa set, perfect for any living room.', 'Jane Smith', 899, 'sofa1.jpg', 'Paris', '2025-03-19'),
('Smartphone for Sale', 'A brand new smartphone with all accessories included.', 'Mike Johnson', 500, 'phone1.jpg', 'Lyon', '2025-03-19'),
('Office Desk', 'Ergonomic office desk, perfect for home office setup.', 'Sarah Lee', 150, 'desk1.jpg', 'Bordeaux', '2025-03-19'),
('Luxury Watch', 'High-end luxury watch in pristine condition, barely used.', 'Alice Brown', 2500, 'watch1.jpg', 'Paris', '2025-03-19'),
('Mountain Bike', 'Durable and fast mountain bike, great for trails and adventures.', 'Tom Green', 350, 'bike1.jpg', 'Lyon', '2025-03-19'),
('Leather Jacket', 'Genuine leather jacket, size M, almost new.', 'Eve White', 200, 'jacket1.jpg', 'Bordeaux', '2025-03-19'),
('Dining Table Set', 'Elegant dining table with six chairs, perfect for families.', 'Robert Black', 600, 'dining1.jpg', 'Paris', '2025-03-19'),
('Electric Guitar', 'Electric guitar in perfect condition, includes amp and accessories.', 'Steve Harris', 700, 'guitar1.jpg', 'Lyon', '2025-03-19'),
('Coffee Maker', 'High-quality coffee maker, still under warranty, barely used.', 'Laura King', 100, 'coffee1.jpg', 'Bordeaux', '2025-03-19'),
('Fitness Treadmill', 'Advanced fitness treadmill with multiple settings and programs.', 'Chris Turner', 900, 'treadmill1.jpg', 'Paris', '2025-03-19'),
('Winter Coat', 'Warm winter coat, size L, used but in good condition.', 'David Clark', 120, 'coat1.jpg', 'Lyon', '2025-03-19'),
('Camping Tent', 'Four-person camping tent, easy to set up and very durable.', 'Hannah Scott', 250, 'tent1.jpg', 'Bordeaux', '2025-03-19'),
('Outdoor Grill', 'High-end outdoor grill, perfect for barbecues.', 'Michael Miller', 450, 'grill1.jpg', 'Paris', '2025-03-19'),
('Air Purifier', 'Air purifier with HEPA filter, great for allergies and air quality.', 'Jessica Moore', 300, 'purifier1.jpg', 'Lyon', '2025-03-19'),
('Refrigerator', 'Brand new refrigerator, energy-efficient and spacious.', 'Daniel Davis', 800, 'fridge1.jpg', 'Bordeaux', '2023-09-01'),
('Smart TV', '4K Smart TV with streaming apps, amazing picture quality.', 'Olivia Taylor', 700, 'tv1.jpg', 'Paris', '2025-03-19'),
('Bike Rack', 'Car bike rack, fits most vehicles, in excellent condition.', 'Samuel Jackson', 80, 'rack1.jpg', 'Lyon', '2025-03-19'),
('Portable Speaker', 'Waterproof portable Bluetooth speaker, excellent sound quality.', 'Monica White', 150, 'speaker1.jpg', 'Bordeaux', '2025-03-19'),
('Designer Handbag', 'Authentic designer handbag, barely used, like new.', 'Emily Harris', 1200, 'bag1.jpg', 'Paris', '2025-03-19'),
('Gaming Laptop', 'High-performance gaming laptop, top-of-the-line specs, great condition.', 'George Adams', 1500, 'laptop1.jpg', 'Lyon', '2025-03-19');


SELECT * FROM ad ;

SELECT title, owner, location FROM ad WHERE location = 'Bordeaux';

SELECT title, owner, price, createdAt FROM ad WHERE price > 40 ; 

SELECT title, owner, price, createdAt FROM ad WHERE createdAt LIKE '20%%-09-01' ;

UPDATE ad SET price = 0 WHERE createdAt LIKE '20%%-09-01' ;

SELECT AVG(price) FROM ad WHERE location = 'Paris' ;

SELECT location, AVG(price) FROM ad GROUP BY location ;
