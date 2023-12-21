const products = [
  {
    name: 'Cheese Puffs',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91wKXvjITGL._SX679_.jpg',
    description: 'Irresistibly cheesy and crunchy snacks.',
    brand: 'SnackMaster',
    category: 'Cheese Snacks',
    price: 2.99,
    countInStock: 100,
    rating: 4.5,
    numReviews: 20,
  },
  {
    name: 'Chocolate Chip Cookies',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51DlLGtW7KL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Classic chocolate chip cookies for a sweet treat.',
    brand: 'Sweet Delights',
    category: 'Cookies',
    price: 4.49,
    countInStock: 80,
    rating: 4.2,
    numReviews: 15,
  },
  {
    name: 'Mixed Nuts',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51Ze9s-q6bL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'A healthy mix of assorted nuts for snacking.',
    brand: 'Nutty Paradise',
    category: 'Nuts',
    price: 6.99,
    countInStock: 50,
    rating: 4.8,
    numReviews: 25,
  },
  {
    name: 'Popcorn',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41kknPqS41L._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Light and fluffy popcorn for movie nights.',
    brand: 'Poppin\' Joy',
    category: 'Popcorn',
    price: 3.99,
    countInStock: 0,
    rating: 4.0,
    numReviews: 18,
  },
  {
    name: 'Potato Chips',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41grpp95ftL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Classic potato chips with the perfect crunch.',
    brand: 'Crunchy Crisps',
    category: 'Potato Chips',
    price: 1.99,
    countInStock: 90,
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: 'Trail Mix',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71i9ddZR0mL._SX679_.jpg',
    description: 'Energy-packed trail mix with nuts and dried fruits.',
    brand: 'TrailBlazers',
    category: 'Healthy Snacks',
    price: 5.49,
    countInStock: 60,
    rating: 4.7,
    numReviews: 30,
  },
  {
    name: 'Pretzels',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51wVQMmi6jL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Crunchy pretzels for a savory snack experience.',
    brand: 'Twist & Crunch',
    category: 'Pretzels',
    price: 2.79,
    countInStock: 110,
    rating: 4.4,
    numReviews: 23,
  },
  {
    name: 'Gummy Bears',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51klh7hjawL._SY300_SX300_QL70_FMwebp_.jpg',
    description: 'Chewy and fruity gummy bears for a sweet tooth.',
    brand: 'Gummy Galaxy',
    category: 'Gummies',
    price: 3.29,
    countInStock: 75,
    rating: 4.6,
    numReviews: 19,
  },
  {
    name: 'Rice Cakes',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51p1NRN7vXL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Light and airy rice cakes for guilt-free snacking.',
    brand: 'Rice Delight',
    category: 'Rice Cakes',
    price: 2.49,
    countInStock: 95,
    rating: 4.1,
    numReviews: 17,
  },
  {
    name: 'Fruit Chips',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41KdBt1dLGL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Crispy fruit chips made from a variety of fruits.',
    brand: 'Fruity Crunch',
    category: 'Fruit Snacks',
    price: 4.99,
    countInStock: 70,
    rating: 4.9,
    numReviews: 28,
  },
  {
    name: 'Spicy Popcorn Sampler',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81dTCC45KnL._SX679_PIbundle-3,TopRight,0,0_AA679SH20_.jpg',
    description: 'A sampler pack of spicy popcorn with bold and exciting flavors.',
    brand: 'PopHeat',
    category: 'Snacks',
    price: 5.49,
    countInStock: 50,
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: 'Fruit & Nut Energy Bars',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51RKwNvJZiL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Nutrient-rich energy bars with a mix of fruits and nuts for a quick energy boost.',
    brand: 'EnergizeMe',
    category: 'Snacks',
    price: 9.99,
    countInStock: 35,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'Sweet Potato Chips',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41Q33NW0OyL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Crunchy sweet potato chips seasoned with a perfect blend of spices.',
    brand: 'Tasty Roots',
    category: 'Snacks',
    price: 4.99,
    countInStock: 55,
    rating: 4.5,
    numReviews: 22,
  },
  {
    name: 'Chocolate Almond Clusters',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51VgEGLxqdL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Irresistible chocolate-covered almond clusters for a delightful treat.',
    brand: 'ChocoCrave',
    category: 'Snacks',
    price: 8.99,
    countInStock: 30,
    rating: 4.9,
    numReviews: 28,
  },
  {
    name: 'Honey Mustard Pretzels',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71xkioSIXXL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Crunchy pretzels with a savory honey mustard coating for a flavorful snack.',
    brand: 'Savory Twist',
    category: 'Snacks',
    price: 6.99,
    countInStock: 45,
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: 'Dried Mango Slices',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41pam+Cj2PL._SY300_SX300_.jpg',
    description: 'Naturally sweet and chewy dried mango slices for a tropical snack experience.',
    brand: 'MangoJoy',
    category: 'Snacks',
    price: 10.99,
    countInStock: 48,
    rating: 4.7,
    numReviews: 23,
  },
  {
    name: 'Sea Salt Rice Crackers',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51qPFhNZqsL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Light and crispy rice crackers seasoned with a touch of sea salt.',
    brand: 'CrispBite',
    category: 'Snacks',
    price: 3.49,
    countInStock: 0,
    rating: 4.6,
    numReviews: 19,
  },
  {
    name: 'Cheddar Cheese Popcorn',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51CBz4dhmhL._SX300_SY300_QL70_FMwebp_.jpg',
    description: 'Classic cheddar cheese-flavored popcorn for a cheesy and satisfying snack.',
    brand: 'CheesePop',
    category: 'Snacks',
    price: 4.99,
    countInStock: 60,
    rating: 4.5,
    numReviews: 26,
  },
];

// You can use this dummy data in your application
export default products
