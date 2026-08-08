const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    brand: "Nike",
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    rating: 4.6,
    stock: 25,
    image:
      "https://media.istockphoto.com/id/1303978937/photo/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-sneakers-lifestyle.webp?a=1&b=1&s=612x612&w=0&k=20&c=ULRau7DB-Wrr9i0GZbQoDXSDjDRDc4H-hfIFWgL5PIY=",
    category: "Clothing",
    description:
      "A comfortable classic white t-shirt for everyday wear.",
  },

  {
    id: 2,
    name: "Modern Denim Jacket",
    brand: "Levi's",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.7,
    stock: 18,
    image:
      "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Clothing",
    description:
      "Stylish denim jacket with a modern fit.",
  },

  {
    id: 3,
    name: "Minimalist Sneakers",
    brand: "Adidas",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.8,
    stock: 30,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Shoes",
    description:
      "Clean and lightweight sneakers for daily comfort.",
  },

  {
    id: 4,
    name: "Luxury Smart Watch",
    brand: "Apple",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    rating: 4.9,
    stock: 10,
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Watches",
    description:
      "A sleek smartwatch with fitness and notification features.",
  },

  {
    id: 5,
    name: "Wireless Noise-Canceling Headphones",
    brand: "Sony",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    stock: 15,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics",
    description:
      "Premium sound quality for music, calls, and travel.",
  },

  {
    id: 6,
    name: "Adventure Backpack",
    brand: "Wildcraft",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.5,
    stock: 20,
    image:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Bags",
    description:
      "Spacious and durable backpack for school, travel, and daily use.",
  },

  {
    id: 7,
    name: "Harry Potter Wand Replica",
    brand: "Wizarding World",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    rating: 4.9,
    stock: 12,
    image:
     "https://images.unsplash.com/photo-1600189261900-da2183219c28?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Harry Potter",
    description:
      "A collectible wand inspired by the magical world of Harry Potter.",
  },

  {
    id: 8,
    name: "CR7 Football Jersey",
    brand: "Nike",
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    rating: 4.9,
    stock: 16,
    image:
      "https://images.unsplash.com/photo-1778454288878-9b3c0c975589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "CR7",
    description:
      "Official-style football jersey inspired by Cristiano Ronaldo.",
  },

  {
    id: 9,
    name: "Pookie Plush Toy",
    brand: "FunWorld",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.7,
    stock: 35,
    image:
      "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Pookie",
    description:
      "Cute and cuddly plush toy for comfort and decoration.",
  },

  {
    id: 10,
    name: "Sports Car Model",
    brand: "Hot Wheels",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.6,
    stock: 22,
    image:
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Cars",
    description:
      "A collectible model car for enthusiasts and display.",
  },

  {
    id: 11,
    name: "Best Seller Novel",
    brand: "Penguin",
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    rating: 4.8,
    stock: 40,
    image:
      "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm92ZWx8ZW58MHx8MHx8fDA%3D",
    category: "Books",
    description:
      "A gripping novel that is perfect for reading at home.",
  },

  {
    id: 12,
    name: "Mini Camera Drone",
    brand: "DJI",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    rating: 4.7,
    stock: 8,
    image:
      "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics",
    description:
      "Compact drone with HD camera for aerial footage.",
  },
];

export const categories = [
  "Shoes",
  "Watches",
  "Electronics",
  "Clothing",
  "Books",
  "Bags",
  "Harry Potter",
  "CR7",
  "Pookie",
  "Cars",
];

export default products;