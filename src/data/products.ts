export interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  mainImage: string;
  colors: string[];
  sizes?: string[];
  code?: string;
  spec?: string;
}

export const PRODUCTS: Product[] = [
  {
    "id": "chairs-101",
    "name": "Dimple Chair",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/101/101A beige.webp",
      "/images/Chairs/Chairs/101/101A green.webp",
      "/images/Chairs/Chairs/101/101A white.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/101/101A beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "101",
    "spec": "13 x 15 x 30.5"
  },
  {
    "id": "chairs-109",
    "name": "Junior Chair",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/109/109A beige.webp",
      "/images/Chairs/Chairs/109/109A green2.webp",
      "/images/Chairs/Chairs/109/109A white.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/109/109A beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "109",
    "spec": ""
  },
  {
    "id": "chairs-198-diamond-stool",
    "name": "Diamond Stool",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/198 Diamond Stool/198 black.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 blue.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 brown.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 green.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 orange.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 pink.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 white.webp",
      "/images/Chairs/Chairs/198 Diamond Stool/198 yellow.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/198 Diamond Stool/198 black.webp",
    "colors": [
      "Black",
      "Blue",
      "Brown",
      "Green",
      "Orange",
      "Pink",
      "White",
      "Yellow"
    ],
    "code": "198",
    "spec": ""
  },
  {
    "id": "chairs-268",
    "name": "Rectangular Stool",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/268/268 beige.webp",
      "/images/Chairs/Chairs/268/268 green.webp",
      "/images/Chairs/Chairs/268/268 white.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/268/268 beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "268",
    "spec": "10.5 x 10.5 x 18"
  },
  {
    "id": "chairs-368",
    "name": "Rectangular Stool with Cover",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/368/368 beigeorange.webp",
      "/images/Chairs/Chairs/368/368 beigeyellow.webp",
      "/images/Chairs/Chairs/368/368 green.webp",
      "/images/Chairs/Chairs/368/368 white red.webp",
      "/images/Chairs/Chairs/368/368 whiteblue.webp",
      "/images/Chairs/Chairs/368/368 whitegreen.webp",
      "/images/Chairs/Chairs/368/368 whiteorange.webp",
      "/images/Chairs/Chairs/368/368 whitepink.webp",
      "/images/Chairs/Chairs/368/368 whiteyellow.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/368/368 beigeorange.webp",
    "colors": [
      "Orange",
      "Beige",
      "Yellow",
      "Green",
      "Red",
      "White",
      "Blue",
      "Pink"
    ],
    "code": "368",
    "spec": "10.75 x 10.75 x 18.5"
  },
  {
    "id": "chairs-junior-chair-902",
    "name": "Junior Chair 902",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/Junior Chair 902/902A beige.webp",
      "/images/Chairs/Chairs/Junior Chair 902/902A green.webp",
      "/images/Chairs/Chairs/Junior Chair 902/902A white.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/Junior Chair 902/902A beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "902A",
    "spec": "13.5 x 14 x 26"
  },
  {
    "id": "chairs-kiddie-chair-168",
    "name": "Kiddie Chair 168",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/Kiddie Chair 168/168A blue.webp",
      "/images/Chairs/Chairs/Kiddie Chair 168/168A green.webp",
      "/images/Chairs/Chairs/Kiddie Chair 168/168A Orange.webp",
      "/images/Chairs/Chairs/Kiddie Chair 168/168A Red.webp",
      "/images/Chairs/Chairs/Kiddie Chair 168/168A White.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/Kiddie Chair 168/168A blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange",
      "Red",
      "White"
    ],
    "code": "168A",
    "spec": ""
  },
  {
    "id": "chairs-rattan-chair-890",
    "name": "Rattan Chair",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/Rattan Chair 890/890 black.webp",
      "/images/Chairs/Chairs/Rattan Chair 890/890 blue2.webp",
      "/images/Chairs/Chairs/Rattan Chair 890/890 brown.webp",
      "/images/Chairs/Chairs/Rattan Chair 890/890 green.webp",
      "/images/Chairs/Chairs/Rattan Chair 890/890 orange3.webp",
      "/images/Chairs/Chairs/Rattan Chair 890/890 red.webp",
      "/images/Chairs/Chairs/Rattan Chair 890/890 white2.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/Rattan Chair 890/890 black.webp",
    "colors": [
      "Black",
      "Blue",
      "Brown",
      "Green",
      "Orange",
      "Red",
      "White"
    ],
    "code": "890",
    "spec": "16 x 15 x 32.5"
  },
  {
    "id": "chairs-rattan-stool-903",
    "name": "Rattan Stool",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/Rattan Stool 903/IMG_7260.jpg"
    ],
    "mainImage": "/images/Chairs/Chairs/Rattan Stool 903/IMG_7260.jpg",
    "colors": [],
    "code": "903",
    "spec": "13.5 x 19.5 x 15.5"
  },
  {
    "id": "chairs-stool-900",
    "name": "Stool",
    "category": "chairs",
    "images": [
      "/images/Chairs/Chairs/Stool 900/900A beige.webp",
      "/images/Chairs/Chairs/Stool 900/900A green.webp",
      "/images/Chairs/Chairs/Stool 900/900A white.webp"
    ],
    "mainImage": "/images/Chairs/Chairs/Stool 900/900A beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "900",
    "spec": "12.5 x 17"
  },
  {
    "id": "dish-cabinets-8000",
    "name": "Dish Cabinet",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/8000/8000 blue3.webp",
      "/images/Dish Cabinet/Dish Cabinet/8000/8000 green3.webp",
      "/images/Dish Cabinet/Dish Cabinet/8000/8000 red.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/8000/8000 blue3.webp",
    "colors": [
      "Blue",
      "Green",
      "Red"
    ],
    "code": "8000",
    "spec": ""
  },
  {
    "id": "dish-cabinets-alpha-mega-8808",
    "name": "Alpha Mega",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/Alpha Mega 8808/Alpha Mega 8808.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/Alpha Mega 8808/Alpha Mega 8808.webp",
    "colors": [],
    "code": "8808",
    "spec": "14 x 18.5 x 30"
  },
  {
    "id": "dish-cabinets-dish-rack-388",
    "name": "Dish Rack 388",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/Dish Rack 388/388 blue.webp",
      "/images/Dish Cabinet/Dish Cabinet/Dish Rack 388/388 green.webp",
      "/images/Dish Cabinet/Dish Cabinet/Dish Rack 388/388 red.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/Dish Rack 388/388 blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Red"
    ],
    "code": "388-2L",
    "spec": "13.5 x 19.5 x 15.5"
  },
  {
    "id": "dish-cabinets-fiesta-bunny-228",
    "name": "Fiesta Bunny",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/Fiesta Bunny 228/228 green.webp",
      "/images/Dish Cabinet/Dish Cabinet/Fiesta Bunny 228/228 green2.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/Fiesta Bunny 228/228 green.webp",
    "colors": [
      "Green"
    ],
    "code": "228",
    "spec": "20 x 17.5 x 12.5"
  },
  {
    "id": "dish-cabinets-platinum-0088",
    "name": "Platinum",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/Platinum 0088/0088 Blue.webp",
      "/images/Dish Cabinet/Dish Cabinet/Platinum 0088/0088 Green.webp",
      "/images/Dish Cabinet/Dish Cabinet/Platinum 0088/0088 Orange.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/Platinum 0088/0088 Blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange"
    ],
    "code": "0088",
    "spec": "14.5 x 18.5 x 33"
  },
  {
    "id": "dish-cabinets-platinum-1088",
    "name": "Platinum",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/Platinum 1088/Platinum 1088 Blue.webp",
      "/images/Dish Cabinet/Dish Cabinet/Platinum 1088/Platinum 1088 Green.webp",
      "/images/Dish Cabinet/Dish Cabinet/Platinum 1088/Platinum 1088 Orange.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/Platinum 1088/Platinum 1088 Blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange"
    ],
    "code": "1088",
    "spec": "14.5 x 18.5 x 19.5"
  },
  {
    "id": "dish-cabinets-platinum-2088",
    "name": "Platinum",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/Platinum 2088/Platinum 2088 Blue1.webp",
      "/images/Dish Cabinet/Dish Cabinet/Platinum 2088/Platinum 2088 Green5.webp",
      "/images/Dish Cabinet/Dish Cabinet/Platinum 2088/Platinum 2088 Orange3.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/Platinum 2088/Platinum 2088 Blue1.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange"
    ],
    "code": "2088",
    "spec": "14.5 x 18.5 x 40"
  },
  {
    "id": "dish-cabinets-sb-10-ruby-star",
    "name": "Ruby Star",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/SB-10 Ruby Star/SB-10 blue.webp",
      "/images/Dish Cabinet/Dish Cabinet/SB-10 Ruby Star/SB-10 green.webp",
      "/images/Dish Cabinet/Dish Cabinet/SB-10 Ruby Star/SB-10 peach.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/SB-10 Ruby Star/SB-10 blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Peach"
    ],
    "code": "SB-10",
    "spec": "13.5 x 23.5 x 59"
  },
  {
    "id": "dish-cabinets-sb-8-golden-fortune",
    "name": "Golden Fortune",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/SB-8 Golden Fortune/SB-8 blue.webp",
      "/images/Dish Cabinet/Dish Cabinet/SB-8 Golden Fortune/SB-8 green.webp",
      "/images/Dish Cabinet/Dish Cabinet/SB-8 Golden Fortune/SB-8 peach.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/SB-8 Golden Fortune/SB-8 blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Peach"
    ],
    "code": "SB-8",
    "spec": "13.5 x 23.5 x 46.5"
  },
  {
    "id": "dish-cabinets-sb-9-ultra-bunny",
    "name": "Ultra Bunny",
    "category": "dish-cabinets",
    "images": [
      "/images/Dish Cabinet/Dish Cabinet/SB-9 Ultra Bunny/SB-9 blue.webp",
      "/images/Dish Cabinet/Dish Cabinet/SB-9 Ultra Bunny/SB-9 green.webp",
      "/images/Dish Cabinet/Dish Cabinet/SB-9 Ultra Bunny/SB-9 peach.webp"
    ],
    "mainImage": "/images/Dish Cabinet/Dish Cabinet/SB-9 Ultra Bunny/SB-9 blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Peach"
    ],
    "code": "SB-9",
    "spec": "13.5 x 23.5 x 33.5"
  },
  {
    "id": "drawers-18000-5l",
    "name": "Drawer 18000 (5L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/18000 5L/18000 5L Aqua.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/18000 5L/18000 5L Pink.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/18000 5L/18000 5L Aqua.webp",
    "colors": [
      "Aqua",
      "Pink"
    ],
    "code": "18000-5L",
    "spec": "16 x 23.5 x 45"
  },
  {
    "id": "drawers-18000-6l",
    "name": "Drawer 18000 (6L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/18000 6L/18000 6L Aqua.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/18000 6L/18000 6L Pink.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/18000 6L/18000 6L Aqua.webp",
    "colors": [
      "Aqua",
      "Pink"
    ],
    "code": "18000-6L",
    "spec": "16 x 23.5 x 53"
  },
  {
    "id": "drawers-19000-5l",
    "name": "Drawer 19000 (5L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 5L/19000 5L Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 5L/19000 5L Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 5L/19000 5L Orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 5L/19000 5L Rainbow.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 5L/19000 5L Yellow.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/19000 5L/19000 5L Blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange",
      "Yellow"
    ],
    "code": "19000-5L",
    "spec": "16 x 23.5 x 45"
  },
  {
    "id": "drawers-19000-6l",
    "name": "Drawer 19000 (6L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 6L/19000 6L Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 6L/19000 6L Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 6L/19000 6L Orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 6L/19000 6L Rainbow.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19000 6L/19000 6L Yellow.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/19000 6L/19000 6L Blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange",
      "Yellow"
    ],
    "code": "19000-6L",
    "spec": "16 x 23.5 x 53"
  },
  {
    "id": "drawers-19500-5l",
    "name": "Drawer 19500 with Mirror (5L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/19500 5L/19500 5L Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19500 5L/19500 5L Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19500 5L/19500 5L Orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19500 5L/19500 5L Rainbow.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/19500 5L/19500 5L Yellow.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/19500 5L/19500 5L Blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange",
      "Yellow"
    ],
    "code": "19500-5L",
    "spec": "16 x 23.5 x 45"
  },
  {
    "id": "drawers-21000-5l",
    "name": "Drawer 21000 (5L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 5L/21000 5L Aqua.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 5L/21000 5L Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 5L/21000 5L Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 5L/21000 5L Rainbow.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 5L/21000 5L Yellow.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/21000 5L/21000 5L Aqua.webp",
    "colors": [
      "Aqua",
      "Blue",
      "Green",
      "Yellow"
    ],
    "code": "21000-5L",
    "spec": "Missing dimensions"
  },
  {
    "id": "drawers-21000-6l",
    "name": "Drawer 21000 (6L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 6L/21000 6L Orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21000 6L/21000 6L Rainbow.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/21000 6L/21000 6L Orange.webp",
    "colors": [
      "Orange"
    ],
    "code": "21000-6L",
    "spec": "16 x 23.5 x 45"
  },
  {
    "id": "drawers-21500-5l",
    "name": "Drawer 21500 with Mirror (5L)",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Aqua.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Rainbow.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Yellow.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/21500 5L/21500 5L Aqua.webp",
    "colors": [
      "Aqua",
      "Blue",
      "Green",
      "Orange",
      "Yellow"
    ],
    "code": "21500-5L",
    "spec": "16 x 23.5 x 45"
  },
  {
    "id": "drawers-888-3l",
    "name": "Drawer 888 with Basket - 3 Layer",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 3L/888-3L blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 3L/888-3L green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 3L/888-3L purple.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 3L/888-3L red.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/888 3L/888-3L blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Purple",
      "Red"
    ],
    "code": "888-3L",
    "spec": "16 x 18.5 x 26.5"
  },
  {
    "id": "drawers-888-4l",
    "name": "Drawer 888 with Basket - 4 Layer",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888 4L blue with basket.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888 4L green with basket.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888 4L purple with basket.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888 4L red with basket.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Blue2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Blue3.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L gREEN.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Green2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Green3.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Purple.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Purple2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L Purple3.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L red.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L red2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888-4L red3.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/888 4L/888 4L blue with basket.webp",
    "colors": [
      "Blue",
      "Green",
      "Purple",
      "Red"
    ],
    "code": "888-4L",
    "spec": "16 x 18.5 x 33"
  },
  {
    "id": "drawers-888-5l",
    "name": "Drawer 888 with Basket - 5 Layer",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 5L/888-5L Blue2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 5L/888-5L Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 5L/888-5L purple2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/888 5L/888-5L red3.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/888 5L/888-5L Blue2.webp",
    "colors": [
      "Blue",
      "Green",
      "Purple",
      "Red"
    ],
    "code": "888-5L",
    "spec": "16 x 18.5 x 39"
  },
  {
    "id": "drawers-golden-bunny-8828",
    "name": "Golden Bunny",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Goden Bunny Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Blue2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Green2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Orange2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Pink.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Golden Bunny Pink2.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/Golden Bunny 8828/8828 Goden Bunny Blue.webp",
    "colors": [
      "Blue",
      "Gold",
      "Green",
      "Orange",
      "Pink"
    ],
    "code": "8828",
    "spec": ""
  },
  {
    "id": "drawers-lucky-charm-5088",
    "name": "Lucky Charm",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 blue2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 green2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 orange.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 orange2.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/Lucky Charm 5088/5088 blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Orange"
    ],
    "code": "5088",
    "spec": "13.5 x 23.5 x 59"
  },
  {
    "id": "drawers-mega-bunny-3l",
    "name": "Mega Bunny 3L",
    "category": "drawers",
    "images": [
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Blue.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Brown.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Brown2.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Collection.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA green.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Pink.webp",
      "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA White.webp"
    ],
    "mainImage": "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Blue.webp",
    "colors": [
      "Blue",
      "Brown",
      "Green",
      "Pink",
      "White"
    ],
    "code": "2028-3L",
    "spec": ""
  },
  {
    "id": "storage-box-black",
    "name": "Storage Box Black",
    "category": "storage-box",
    "images": [
      "/images/Storage Box/Storage Box/Black/111-L black.webp"
    ],
    "mainImage": "/images/Storage Box/Storage Box/Black/111-L black.webp",
    "colors": [
      "Black"
    ],
    "sizes": [
      "L"
    ]
  },
  {
    "id": "storage-box-colored",
    "name": "Storage Box Colored",
    "category": "storage-box",
    "images": [
      "/images/Storage Box/Storage Box/Colored/111-L blue.webp",
      "/images/Storage Box/Storage Box/Colored/111-L green.webp",
      "/images/Storage Box/Storage Box/Colored/111-L red.webp",
      "/images/Storage Box/Storage Box/Colored/111-M blue.webp",
      "/images/Storage Box/Storage Box/Colored/111-M green.webp",
      "/images/Storage Box/Storage Box/Colored/111-M red.webp"
    ],
    "mainImage": "/images/Storage Box/Storage Box/Colored/111-L blue.webp",
    "colors": [
      "Blue",
      "Green",
      "Red"
    ],
    "sizes": [
      "L",
      "M"
    ]
  },
  {
    "id": "storage-box-transparent",
    "name": "Storage Box Transparent",
    "category": "storage-box",
    "images": [
      "/images/Storage Box/Storage Box/Transparent/111-L transblue.webp",
      "/images/Storage Box/Storage Box/Transparent/111-L transgreen.webp",
      "/images/Storage Box/Storage Box/Transparent/111-L transorange.webp",
      "/images/Storage Box/Storage Box/Transparent/111-L transred.webp",
      "/images/Storage Box/Storage Box/Transparent/111-M transblue.webp",
      "/images/Storage Box/Storage Box/Transparent/111-M transgreen.webp",
      "/images/Storage Box/Storage Box/Transparent/111-M transorange.webp",
      "/images/Storage Box/Storage Box/Transparent/111-M transred.webp",
      "/images/Storage Box/Storage Box/Transparent/111-S transblue.webp",
      "/images/Storage Box/Storage Box/Transparent/111-S transorange.webp",
      "/images/Storage Box/Storage Box/Transparent/111-S transred.webp"
    ],
    "mainImage": "/images/Storage Box/Storage Box/Transparent/111-L transblue.webp",
    "colors": [
      "Blue",
      "Transparent",
      "Green",
      "Orange",
      "Red"
    ],
    "sizes": [
      "L",
      "M",
      "S"
    ]
  },
  {
    "id": "tables-1011-bingo-rattan-table",
    "name": "1011 Bingo Rattan Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/1011 Bingo Rattan Table/1011 beige.webp",
      "/images/Tables/Tables/1011 Bingo Rattan Table/1011 black.webp",
      "/images/Tables/Tables/1011 Bingo Rattan Table/1011 brown.webp",
      "/images/Tables/Tables/1011 Bingo Rattan Table/1011 green.webp",
      "/images/Tables/Tables/1011 Bingo Rattan Table/1011 orange.webp",
      "/images/Tables/Tables/1011 Bingo Rattan Table/1011 white.webp"
    ],
    "mainImage": "/images/Tables/Tables/1011 Bingo Rattan Table/1011 beige.webp",
    "colors": [
      "Beige",
      "Black",
      "Brown",
      "Green",
      "Orange",
      "White"
    ],
    "code": "1011",
    "spec": "30 x 48 x 29"
  },
  {
    "id": "tables-8824",
    "name": "Rectangular Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/8824/8824 beige.webp",
      "/images/Tables/Tables/8824/8824 green.webp",
      "/images/Tables/Tables/8824/8824 white.webp"
    ],
    "mainImage": "/images/Tables/Tables/8824/8824 beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "8824",
    "spec": "30 x 30 x 28"
  },
  {
    "id": "tables-8830",
    "name": "Square Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/8830/8830 beige.webp",
      "/images/Tables/Tables/8830/8830 green.webp",
      "/images/Tables/Tables/8830/8830 white.webp"
    ],
    "mainImage": "/images/Tables/Tables/8830/8830 beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "8830",
    "spec": "24 x 36 x 28"
  },
  {
    "id": "tables-8836",
    "name": "Square Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/8836/8836 beige.webp",
      "/images/Tables/Tables/8836/8836 green.webp",
      "/images/Tables/Tables/8836/8836 White.webp"
    ],
    "mainImage": "/images/Tables/Tables/8836/8836 beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "8836",
    "spec": "36 x 36 x 28"
  },
  {
    "id": "tables-8837",
    "name": "Round Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/8837/8837 beige.webp",
      "/images/Tables/Tables/8837/8837 green.webp",
      "/images/Tables/Tables/8837/8837 white.webp"
    ],
    "mainImage": "/images/Tables/Tables/8837/8837 beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "8837",
    "spec": "37 x 28"
  },
  {
    "id": "tables-8838",
    "name": "Cross-Legged Rectangular Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/8838/8838 maroon.webp",
      "/images/Tables/Tables/8838/8838 white.webp"
    ],
    "mainImage": "/images/Tables/Tables/8838/8838 maroon.webp",
    "colors": [
      "Maroon",
      "White"
    ],
    "code": "8838",
    "spec": "24 x 38 x 28"
  },
  {
    "id": "tables-8848",
    "name": "Rectangular Table",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/8848/8848 beige.webp",
      "/images/Tables/Tables/8848/8848 green.webp",
      "/images/Tables/Tables/8848/8848 white.webp"
    ],
    "mainImage": "/images/Tables/Tables/8848/8848 beige.webp",
    "colors": [
      "Beige",
      "Green",
      "White"
    ],
    "code": "8848",
    "spec": "30 x 48 x 28"
  },
  {
    "id": "tables-kiddie-table",
    "name": "",
    "category": "tables",
    "images": [
      "/images/Tables/Tables/Kiddie Table/IMG_0968.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_0977.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_0978(1).webp",
      "/images/Tables/Tables/Kiddie Table/IMG_0990.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_0993.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_0996.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_1003.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_1006.webp",
      "/images/Tables/Tables/Kiddie Table/IMG_9615.webp"
    ],
    "mainImage": "/images/Tables/Tables/Kiddie Table/IMG_0968.webp",
    "colors": [],
    "code": "Kiddie Table",
    "spec": ""
  }
];
