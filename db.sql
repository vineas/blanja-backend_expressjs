create table category(
id int not null primary key,
image varchar(255) not null,
name varchar(255) not null
);


create table product(
id int not null primary key,
name varchar(255) not null,
price int not null,
stock int not null,
image varchar(255) not null,
rating_product rating,
nama_toko varchar(255) not null,
category_id int not null,
FOREIGN KEY (category_id) REFERENCES category(id)
);



rating enum('1','2','3','4','5')

insert into product(id, name, price, stock, image, rating_product, nama_toko, category_id) values
(1, 'Jersey Liverpool', 120000, 23, 'https://down-id.img.susercontent.com/file/id-11134207-7qul1-lf7uhjwti0ql99',
'4', 
'nike', 
1);

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

create table orders(
id int primary key not null,
date varchar(255) not null,
address_order text not null,
quantity int not null,
shipping varchar(255) not null,
total_price int not null,
id_product int not null,
id_customer int not null,
FOREIGN KEY (id_product) REFERENCES product(id),
FOREIGN KEY (id_customer) REFERENCES customer(id)
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

