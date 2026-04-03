import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

// ... existing code ...
let all_product = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "dien-thoai",
    image: p1_img,
    new_price: 999.0,
    old_price: 1099.0,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "dien-thoai",
    image: p2_img,
    new_price: 1199.0,
    old_price: 1299.0,
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    category: "dien-thoai",
    image: p3_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 4,
    name: "Iphone 15",
    category: "dien-thoai",
    image: p4_img,
    new_price: 1999.0,
    old_price: 2199.0,
  },
  {
    id: 5,
    name: "Samsung Galaxy S25",
    category: "dien-thoai",
    image: p5_img,
    new_price: 1799.0,
    old_price: 1999.0,
  },
  {
    id: 6,
    name: "Realme 13+",
    category: "dien-thoai",
    image: p6_img,
    new_price: 1599.0,
    old_price: 1799.0,
  },
  {
    id: 7,
    name: "Samsung Galaxy Z Flip6",
    category: "dien-thoai",
    image: p7_img,
    new_price: 249.0,
    old_price: 299.0,
  },
  {
    id: 8,
    name: "Oppo Find N5",
    category: "dien-thoai",
    image: p8_img,
    new_price: 349.0,
    old_price: 399.0,
  },
  {
    id: 9,
    name: "Vivo Y17s",
    category: "dien-thoai",
    image: p9_img,
    new_price: 799.0,
    old_price: 899.0,
  },
  {
    id: 10,
    name: "Nubia Z70S Ultra",
    category: "dien-thoai",
    image: p10_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 11,
    name: "Samsung Galaxy A05",
    category: "dien-thoai",
    image: p11_img,
    new_price: 1299.0,
    old_price: 1499.0,
  },
  {
    id: 12,
    name: "iPhone 13",
    category: "dien-thoai",
    image: p12_img,
    new_price: 1399.0,
    old_price: 1599.0,
  },
  {
    id: 13,
    name: "Apple MacBook Air M2 2024",
    category: "laptop",
    image: p13_img,
    new_price: 399.0,
    old_price: 449.0,
  },
  {
    id: 14,
    name: "MacBook Air M4 13 inch 2025",
    category: "laptop",
    image: p14_img,
    new_price: 399.0,
    old_price: 449.0,
  },
  {
    id: 15,
    name: "MacBook Pro 16 M4 Max",
    category: "laptop",
    image: p15_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 16,
    name: "Laptop Gaming Acer Nitro V ",
    category: "laptop",
    image: p16_img,
    new_price: 799.0,
    old_price: 899.0,
  },
  {
    id: 17,
    name: "Laptop Lenovo LOQ",
    category: "laptop",
    image: p17_img,
    new_price: 1999.0,
    old_price: 2199.0,
  },
  {
    id: 18,
    name: "Laptop HP Victus 16",
    category: "laptop",
    image: p18_img,
    new_price: 1899.0,
    old_price: 2099.0,
  },
  {
    id: 19,
    name: "Laptop MSI Modern 14",
    category: "laptop",
    image: p19_img,
    new_price: 229.0,
    old_price: 279.0,
  },
  {
    id: 20,
    name: "Laptop ASUS TUF Gaming A15",
    category: "laptop",
    image: p20_img,
    new_price: 229.0,
    old_price: 279.0,
  },
  {
    id: 21,
    name: "Laptop Acer Aspire Lite 15",
    category: "laptop",
    image: p21_img,
    new_price: 599.0,
    old_price: 699.0,
  },
  {
    id: 22,
    name: "Laptop ASUS ROG Strix G16",
    category: "laptop",
    image: p22_img,
    new_price: 699.0,
    old_price: 799.0,
  },
  {
    id: 23,
    name: "Laptop Gigabyte G6",
    category: "laptop",
    image: p23_img,
    new_price: 999.0,
    old_price: 1099.0,
  },
  {
    id: 24,
    name: "MacBook Air M3 13 inch 2024",
    category: "laptop",
    image: p24_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 25,
    name: "Bàn phím AKKO 5108 SE Joy of Life",
    category: "phu-kien",
    image: p25_img,
    new_price: 1299.0,
    old_price: 1499.0,
  },
  {
    id: 26,
    name: "Tai nghe Bluetooth chụp tai Marshall Major 5",
    category: "phu-kien",
    image: p26_img,
    new_price: 1599.0,
    old_price: 1799.0,
  },
  {
    id: 27,
    name: "Tai nghe Bluetooth True Wireless Marshall Minor IV",
    category: "phu-kien",
    image: p27_img,
    new_price: 2499.0,
    old_price: 2699.0,
  },
  {
    id: 28,
    name: "Loa Bluetooth JBL Charge 6",
    category: "phu-kien",
    image: p28_img,
    new_price: 2999.0,
    old_price: 3299.0,
  },
  {
    id: 29,
    name: "Bàn phím Logitech G Pro X 60 Light Speed Pink",
    category: "phu-kien",
    image: p29_img,
    new_price: 99.0,
    old_price: 129.0,
  },
  {
    id: 30,
    name: "Bàn phím Razer BlackWidow V4 75% Phantom Green Edition",
    category: "phu-kien",
    image: p30_img,
    new_price: 149.0,
    old_price: 179.0,
  },
  {
    id: 31,
    name: "Bàn phím Logitech G Pro X TKL Light Speed Tactile Switch White",
    category: "phu-kien",
    image: p31_img,
    new_price: 999.0,
    old_price: 1199.0,
  },
  {
    id: 32,
    name: "Tai nghe Bluetooth True Wireless JBL Wave Beam 2",
    category: "phu-kien",
    image: p32_img,
    new_price: 759.0,
    old_price: 899.0,
  },
  {
    id: 33,
    name: "Tai nghe chụp tai Gaming Sony Inzone H3",
    category: "phu-kien",
    image: p33_img,
    new_price: 499.0,
    old_price: 599.0,
  },
  {
    id: 34,
    name: "Loa Bluetooth Harman Kardon Onyx Studio 8",
    category: "phu-kien",
    image: p34_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 35,
    name: "DJI Action 4 Combo",
    category: "phu-kien",
    image: p35_img,
    new_price: 1199.0,
    old_price: 1299.0,
  },
  {
    id: 36,
    name: "Chuột gaming Logitech Pro X Superlight 2 Lightspeed",
    category: "phu-kien",
    image: p36_img,
    new_price: 1299.0,
    old_price: 1499.0,
  },
];

export default all_product;
