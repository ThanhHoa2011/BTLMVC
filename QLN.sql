create table Accounts(
	Email nvarchar(255) not null primary key,
	Password nvarchar(100) not null,
	Fullname nvarchar(255),
	Avatar nvarchar(255),
	Sdt varchar(12),
	Address nvarchar(255),
	Role varchar(10)
);


create table Loai(
	Maloai int not null primary key,
	Tenloai nvarchar(100)
);

create table Products(
	ProductId varchar(100) not null primary key,
	ProductName nvarchar(255),
	Maloai int not null foreign key (Maloai) references Loai(Maloai),
	ProductImage nvarchar(255),
	Soluongton int,
	Price float,
	Mota text
);

create table Orders(
	OrderId varchar(100) not null primary key,
	Email nvarchar(255) not null foreign key (Email) references Accounts(Email),
	OrderDate datetime,
	TotalPrice float,
	status varchar(50)
);

create table OrdersDetails(
	OrderDetailId varchar(100) not null primary key,
	OrderId varchar(100) not null foreign key (OrderId) references Orders(OrderId),
	ProductId varchar(100) not null foreign key (ProductId) references Products(ProductId),
	Quantity int,
	Giaban float
);

insert into Loai(Maloai, Tenloai) values (1, N'Hoa Handmade');
insert into Loai(Maloai, Tenloai) values (2, N'Đất Sét');
insert into Loai(Maloai, Tenloai) values (3, N'Khung Tranh/ Ảnh');
insert into Loai(Maloai, Tenloai) values (4, N'Gấu');

select * from OrdersDetails

insert into Accounts(Email, Password, Fullname, Avatar, Sdt, Address, Role) values ('user@gmail.com', 'user', 'User', '', '0123456789', N'', 'User');
insert into Accounts(Email, Password, Fullname, Avatar, Sdt, Address, Role) values ('admin@gmail.com', 'admin', 'Admin', '', '0123456789', N'', 'Admin');

insert into Orders(OrderId,Email,OrderDate,TotalPrice,status) values ('1', 'user@gmail.com', N'04-6-2024', 100000, 'Approved');

insert into OrdersDetails(OrderDetailId,OrderId,ProductId,Quantity,Giaban) values ('1', '1', '1', 10, 20000);
insert into OrdersDetails(OrderDetailId,OrderId,ProductId,Quantity,Giaban) values ('2', '1', '2', 20, 40000);