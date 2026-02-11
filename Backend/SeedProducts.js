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
    name: "Apple MacBook AIR M2 - (16 GB/256 GB SSD/macOS Sequoia) MC7X4HN/A",
    price: 70559,
    category: "Laptops",
    page: "product-items/Apple-MacBook-M2.html"
  },
  {
    slug: "dell-13th-gen",
    name: "DELL 15 Intel Core i3 13th Gen 1305U - (16 GB/512GB SSD/Windows 11 Home)",
    price: 39990,
    category: "Laptops",
    page: "product-items/Dell-13th-gen.html"
  },
  {
    slug: "dell-15-amd",
    name: "DELL 15 AMD Ryzen 3 Quad Core 7320U - (8 GB/512 GB SSD/Windows 11 Home) DC15255 Thin and Light Laptop",
    price: 20999,
    category: "Laptops",
    page: "product-items/Dell-15-AMD.html"
  },
  {
    slug: "hp-15-amd",
    name: "HP 15 (2025) AMD Athlon Dual Core 7120U - (8 GB/256 GB SSD/Windows 11 Home) 15 Thin and Light Laptop",
    price: 30990,
    category: "Laptops",
    page: "product-items/HP-15-AMD.html"
  },
  {
    slug: "lenovo-chromebook",
    name: "Lenovo 100e Chromebook Gen 4 MediaTek Kompanio 520 - (4 GB/32 GB EMMC Storage/Chrome OS)",
    price: 11990,
    category: "Laptops",
    page: "product-items/Lenovo-Chrome-Book.html"
  },
  {
    slug: "iphone-14",
    name: "Apple iPhone 14 (Starlight, 128 GB)",
    price: 54900,
    category: "Mobiles",
    page: "product-items/Apple-iPhone-14.html"
  },
  {
    slug: "iphone-16",
    name: "Apple iPhone 16 (Teal, 256 GB)",
    price: 74900,
    category: "Mobiles",
    page: "product-items/Apple-iPhone-16.html"
  },
  {
    slug: "samsung-a35",
    name: "Samsung Galaxy A35 5G (Awesome Navy, 256 GB)",
    price: 20999,
    category: "Mobiles",
    page: "product-items/Samsung-galaxy.html"
  },
  {
    slug: "cmf-phone-2-pro",
    name: "CMF by Nothing Phone 2 Pro (Black, 128 GB)",
    price: 18999,
    category: "Mobiles",
    page: "product-items/CMF-By-Nothing.html"
  },
  {
    slug: "vivo-t4-lite",
    name: "vivo T4 Lite 5G Charger in the Box (Titanium Gold, 128 GB)",
    price: 12999,
    category: "Mobiles",
    page: "product-items/Vivo-T4-Lite.html"
  },
  {
    slug: "apple-watch-series-10",
    name: "Apple Watch Series 10 (GPS, 44mm)",
    price: 41900,
    category: "Smart Watches",
    page: "product-items/Apple-Watch-10.html"
  },
  {
    slug: "boat-wave",
    name: "boAt Wave Smartwatch (Black)",
    price: 1999,
    category: "Smart Watches",
    page: "product-items/Boat-Smartwatch.html"
  },
  {
    slug: "fire-boltt-ninja",
    name: "Fire-Boltt Ninja Smartwatch",
    price: 2499,
    category: "Smart Watches",
    page: "product-items/Fire-Boltt-Smartwatch.html"
  },
  {
    slug: "noise-crew",
    name: "Noise Crew Smartwatch (Metal Strap)",
    price: 2999,
    category: "Smart Watches",
    page: "product-items/Noise-Crew-Smartwatch.html"
  },
  {
    slug: "fastrack-reflex",
    name: "Fastrack Reflex Smartwatch",
    price: 2695,
    category: "Smart Watches",
    page: "product-items/Fastrack-Smartwatch.html"
  },
  {
    slug: "apple-airpods",
    name: "Apple AirPods (2nd Generation)",
    price: 12999,
    category: "Headphones & EarPods",
    page: "product-items/Apple-AirPods.html"
  },
  {
    slug: "boat-airdopes",
    name: "boAt Airdopes True Wireless Earbuds",
    price: 1299,
    category: "Headphones & EarPods",
    page: "product-items/Boat-AirPods.html"
  },
  {
    slug: "noise-buds-vs104",
    name: "Noise Buds VS104 Wireless Earbuds",
    price: 1499,
    category: "Headphones & EarPods",
    page: "product-items/Noise-AirPods.html"
  },
  {
    slug: "one-roar",
    name: "One Roar Wireless Bluetooth Headphones",
    price: 1999,
    category: "Headphones & EarPods",
    page: "product-items/One-Roar.html"
  },
  {
    slug: "zebronics-thunder",
    name: "Zebronics Zeb-Thunder Wireless Headphones",
    price: 899,
    category: "Headphones & EarPods",
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