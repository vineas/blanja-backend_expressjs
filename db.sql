CREATE TABLE customer(
    customer_id VARCHAR PRIMARY KEY,
    customer_name VARCHAR NOT NULL,
    customer_email VARCHAR NOT NULL,
    customer_password VARCHAR NOT NULL,
    customer_confirmpassword VARCHAR NOT NULL,
    customer_phone VARCHAR,
    customer_gender VARCHAR,
    customer_birth VARCHAR,
    customer_image VARCHAR
)

create table seller(
    seller_id VARCHAR PRIMARY KEY,
    seller_name VARCHAR NOT NULL,
    seller_email VARCHAR NOT NULL,
    seller_phone VARCHAR NOT NULL,
    seller_storename VARCHAR NOT NULL,
    seller_confirmpassword VARCHAR NOT NULL,
    seller_password VARCHAR NOT NULL,
    seller_description TEXT,
    seller_image VARCHAR
)

CREATE TABLE category(
category_id INT primary key,
category_name VARCHAR not null,
);
-- product_id VARCHAR primary key,

CREATE TABLE orders(
order_id VARCHAR primary key not null,
order_quantity int not null,
total_price int not null,
payment_id INT,
address_id VARCHAR,
product_id VARCHAR,
customer_id VARCHAR
);
order_shipping varchar(255) not null,
order_address text not null,


CREATE TABLE payment(
payment_id INT primary key,
payment_name VARCHAR not null,
);


CREATE TABLE address (
    address_id VARCHAR PRIMARY KEY,
    address_as VARCHAR,
    recipient_name VARCHAR,
    recipient_phone VARCHAR(15),
    address_line TEXT,
    postal_code VARCHAR(10),
    city_or_subdistrict VARCHAR,
    customer_id VARCHAR
);


CREATE TABLE product(
product_id VARCHAR primary key,
product_name VARCHAR not null,
product_price INT not null,
product_stock INT not null,
product_image VARCHAR not null,
description_product TEXT not null,
category_id INT,
seller_id VARCHAR 
);


create type rating as enum('1','2','3','4','5')

insert into product(id, name, price, stock, image, rating_product, nama_toko, description_product) values
(1, 'Jersey Liverpool', 120000, 23, 'https://down-id.img.susercontent.com/file/id-11134207-7qul1-lf7uhjwti0ql99','4','nike', 'baju bagus');

insert into product(id, name, price, stock, image, rating_product, nama_toko, category_id) values
(2, 
'Kaos Pria', 
110000, 
20, 
'https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/61031c2fd05624e684820883d878e514e69d0079_xxl-1.jpg',
'5', 
'H&M', 2);

insert into product(id, name, price, stock, image, rating_product, nama_toko, category_id) values
(3, 
'Kaos Erigo',
134000,
12,
'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/5/20/46ed3e34-8cce-4eec-996b-3fd3c4552c47.jpg',
'4',
'Erigo');



SELECT products.*, categories.nama_category AS kategori, categories.description_category 
FROM products join categories ON products.categories_id = categories.id;  

SELECT product.*, category.name AS kategori FROM product join category ON product.category_id = category.id WHERE product.id = 1

SELECT product.name, product.price, category.name AS kategori FROM product join category ON product.category_id = category.id WHERE product.id = 1

-- date varchar(255) not null,
create table orders(
id int primary key not null,
address_order text not null,
quantity int not null,
shipping varchar(255) not null,
total_price int not null,
id_product serial not null,
id_users VARCHAR not null,
FOREIGN KEY (id_product) REFERENCES product(id),
FOREIGN KEY (id_users) REFERENCES users(id)
);

SELECT orders.*, product.name AS nama_product, customer.name AS pembeli 
FROM orders join product ON orders.id_product = product.id
JOIN customer ON orders.id_customer = customer.id;

create table customer(
id int not null primary key,
name varchar(255) not null,
email varchar(255) not null,
phone_number varchar(255) not null,
gender jk not null,
dateofBirth varchar(255) not null
);

insert into orders(
id ,
date,
address_order ,
quantity ,
shipping ,
total_price,
id_product ,
id_customer) values (
1,
'2023-05-14',
'Jl Gatot Subroto RT 007/008 Kec. Tambun Kab Bekasi',
1,
'Sicepat',
120000,
1,
1);


insert into customer(
id ,
name ,
email ,
phone_number ,
gender ,
dateofBirth ) values (
1,
'Bambang Malik',
'bambang@gmail.com',
'081228838221',
'L',
'2000-09-14'
);



CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    role VARCHAR
);