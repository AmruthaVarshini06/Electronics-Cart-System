const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    process.exit(1);
  }
};

const products = [

  {
    slug: "apple-macbook-m2",
    name: "Apple MacBook AIR M2 - (16 GB/256 GB SSD/macOS Sequoia)",
    price: 70559,
    category: "Laptops",
    image: "Apple MacBook AIR M2.webp",
    page: "product-items/Apple-MacBook-M2.html"
  },

  {
    slug: "dell-13th-gen",
    name: "DELL 15 Intel Core i3 13th Gen",
    price: 39990,
    category: "Laptops",
    image: "DELL 13th Gen.webp",
    page: "product-items/Dell-13th-gen.html"
  },

  {
    slug: "dell-15-amd",
    name: "DELL 15 AMD Ryzen 3",
    price: 20999,
    category: "Laptops",
    image: "DELL 15 AMD.webp",
    page: "product-items/Dell-15-AMD.html"
  },

  {
    slug: "hp-15-amd",
    name: "HP 15 AMD Athlon Laptop",
    price: 30990,
    category: "Laptops",
    image: "HP 15 AMD.webp",
    page: "product-items/HP-15-AMD.html"
  },

  {
    slug: "lenovo-chromebook",
    name: "Lenovo Chromebook Gen 4",
    price: 11990,
    category: "Laptops",
    image: "Lenovo Chrome Book.webp",
    page: "product-items/Lenovo-Chrome-Book.html"
  },

  {
    slug: "iphone-14",
    name: "Apple iPhone 14 (Starlight, 128 GB)",
    price: 54900,
    category: "Mobiles",
    image: "Apple iPhone 14 Starlight.webp",
    page: "product-items/Apple-iPhone-14.html"
  },

  {
    slug: "iphone-16",
    name: "Apple iPhone 16 (Teal, 256 GB)",
    price: 74900,
    category: "Mobiles",
    image: "Apple iPhone 16 Teal.webp",
    page: "product-items/Apple-iPhone-16.html"
  },

  {
    slug: "samsung-a35",
    name: "Samsung Galaxy A35 5G",
    price: 20999,
    category: "Mobiles",
    image: "Samsung Galaxy A35 5G Awesome Navy Blue.webp",
    page: "product-items/Samsung-galaxy.html"
  },

  {
    slug: "cmf-phone-2-pro",
    name: "CMF by Nothing Phone 2 Pro",
    price: 18999,
    category: "Mobiles",
    image: "CMF by Nothing Phone 2 Pro Black.webp",
    page: "product-items/CMF-By-Nothing.html"
  },

  {
    slug: "vivo-t4-lite",
    name: "vivo T4 Lite 5G",
    price: 12999,
    category: "Mobiles",
    image: "Vivo T4 Lite 5G.webp",
    page: "product-items/Vivo-T4-Lite.html"
  },

  {
    slug: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    price: 41900,
    category: "Smart Watches",
    image: "Apple Watch Series 10.webp",
    page: "product-items/Apple-Watch-10.html"
  },

  {
    slug: "boat-wave",
    name: "boAt Wave Smartwatch",
    price: 1999,
    category: "Smart Watches",
    image: "Boat SmartWatch.webp",
    page: "product-items/Boat-Smartwatch.html"
  },

  {
    slug: "fire-boltt-ninja",
    name: "Fire-Boltt Ninja Smartwatch",
    price: 2499,
    category: "Smart Watches",
    image: "Fire Boltt.webp",
    page: "product-items/Fire-Boltt-Smartwatch.html"
  },

  {
    slug: "noise-crew",
    name: "Noise Crew Smartwatch",
    price: 2999,
    category: "Smart Watches",
    image: "Noise Crew.webp",
    page: "product-items/Noise-Crew-Smartwatch.html"
  },

  {
    slug: "fastrack-reflex",
    name: "Fastrack Reflex Smartwatch",
    price: 2695,
    category: "Smart Watches",
    image: "Fastrack.webp",
    page: "product-items/Fastrack-Smartwatch.html"
  },

  {
    slug: "apple-airpods",
    name: "Apple AirPods",
    price: 12999,
    category: "Headphones & EarPods",
    image: "Apple AirPods.webp",
    page: "product-items/Apple-AirPods.html"
  },

  {
    slug: "boat-airdopes",
    name: "boAt Airdopes Earbuds",
    price: 1299,
    category: "Headphones & EarPods",
    image: "Boat AirPods.webp",
    page: "product-items/Boat-AirPods.html"
  },

  {
    slug: "noise-buds-vs104",
    name: "Noise Buds VS104",
    price: 1499,
    category: "Headphones & EarPods",
    image: "Noise AirPods.webp",
    page: "product-items/Noise-AirPods.html"
  },

  {
    slug: "one-roar",
    name: "One Roar Headphones",
    price: 1999,
    category: "Headphones & EarPods",
    image: "One Roar.webp",
    page: "product-items/One-Roar.html"
  },

  {
    slug: "zebronics-thunder",
    name: "Zebronics Thunder Headphones",
    price: 899,
    category: "Headphones & EarPods",
    image: "Zebronics.webp",
    page: "product-items/Zebronics.html"
  }

];

const seedDB = async () => {
  try {

    await connectDB();

    await Product.deleteMany();
    console.log("Old products removed 🧹");

    await Product.insertMany(products);
    console.log("ALL products inserted into DB ✅");

    process.exit();

  } catch (error) {

    console.error("Seeding failed ❌", error.message);
    process.exit(1);

  }
};

seedDB();