// Initial data for Teamood Cafe
// Based in Kota, Rajasthan

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Royal Rajwadi CTC Tea",
    slug: "royal-rajwadi-ctc-tea",
    category: "Chai Patti",
    price: 320,
    discountPrice: 280,
    weight: "500g",
    sku: "TMD-CTC-500",
    stock: 45,
    minStock: 10,
    rating: 4.9,
    reviewsCount: 142,
    featured: true,
    bestseller: true,
    published: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "Hand-picked high-grown Assam CTC blend specially curated for authentic Indian kadak chai. Rich golden liquor with a robust malty finish and invigorating aroma.",
    ingredients: "100% Pure Assam CTC Black Tea Leaves",
    brewingTime: "4-5 mins with milk and crushed cardamom",
    tags: ["Assam", "Kadak", "Strong", "Everyday"]
  },
  {
    id: "prod-2",
    name: "Kota Shahi Masala Chai Blend",
    slug: "kota-shahi-masala-chai-blend",
    category: "Masala Tea",
    price: 380,
    discountPrice: 340,
    weight: "250g",
    sku: "TMD-MSL-250",
    stock: 32,
    minStock: 8,
    rating: 5.0,
    reviewsCount: 210,
    featured: true,
    bestseller: true,
    published: true,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    description: "Our signature blend of premium Assam tea infused with sun-dried whole spices: green cardamom from Idukki, Kerala cinnamon, cloves, dry ginger, black pepper, and nutmeg.",
    ingredients: "Assam Black Tea, Cardamom, Cinnamon, Cloves, Dry Ginger, Black Pepper, Nutmeg",
    brewingTime: "5 mins with equal parts water and whole milk",
    tags: ["Spice Blend", "Signature", "Digestive", "Warm"]
  },
  {
    id: "prod-3",
    name: "Artisanal Kashmiri Kesar Chai",
    slug: "artisanal-kashmiri-kesar-chai",
    category: "Special Tea",
    price: 550,
    discountPrice: 490,
    weight: "200g",
    sku: "TMD-KSR-200",
    stock: 18,
    minStock: 5,
    rating: 4.8,
    reviewsCount: 88,
    featured: true,
    bestseller: false,
    published: true,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    description: "A royal tea indulgence crafted with certified Kashmiri Mongra saffron threads, crushed green cardamom pods, and delicate rose petals. Imparts a luxurious golden hue and heavenly fragrant taste.",
    ingredients: "Orthodox Assam Leaf Tea, Kashmiri Mongra Saffron, Cardamom, Dried Rose Petals",
    brewingTime: "3-4 mins gently simmered with milk",
    tags: ["Royal", "Saffron", "Festive", "Luxury"]
  },
  {
    id: "prod-4",
    name: "Dark Velvet Chocolate Chai",
    slug: "dark-velvet-chocolate-chai",
    category: "Flavoured Tea",
    price: 360,
    discountPrice: 310,
    weight: "250g",
    sku: "TMD-CHOC-250",
    stock: 28,
    minStock: 10,
    rating: 4.9,
    reviewsCount: 165,
    featured: true,
    bestseller: true,
    published: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    description: "The Teamood cafe sensation now in your kitchen! Premium roasted cocoa nibs seamlessly paired with strong black tea and gentle vanilla notes for the ultimate dessert chai experience.",
    ingredients: "CTC Tea, Pure Dutch Cocoa Powder, Cocoa Nibs, Madagascar Vanilla Extract",
    brewingTime: "5 mins with warm frothy milk",
    tags: ["Chocolate", "Dessert Chai", "Cafe Favorite"]
  },
  {
    id: "prod-5",
    name: "Pure Cardamom (Elaichi) Chai",
    slug: "pure-cardamom-elaichi-chai",
    category: "Flavoured Tea",
    price: 350,
    discountPrice: 299,
    weight: "250g",
    sku: "TMD-ELC-250",
    stock: 50,
    minStock: 12,
    rating: 4.7,
    reviewsCount: 94,
    featured: false,
    bestseller: true,
    published: true,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
    description: "Naturally scented with real ground green cardamom. Smooth, fragrant, and soothing for any hour of the day or study sessions.",
    ingredients: "Assam CTC Tea, Crushed Green Cardamom Pods",
    brewingTime: "4 mins with milk",
    tags: ["Cardamom", "Refreshing", "All-Day"]
  },
  {
    id: "prod-6",
    name: "Zesty Adrak (Ginger) Kadak Tea",
    slug: "zesty-adrak-ginger-kadak-tea",
    category: "Flavoured Tea",
    price: 320,
    discountPrice: 285,
    weight: "250g",
    sku: "TMD-ADR-250",
    stock: 38,
    minStock: 8,
    rating: 4.8,
    reviewsCount: 76,
    featured: false,
    bestseller: false,
    published: true,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
    description: "Sun-dried ginger flakes blended with brisk CTC tea. The quintessential spicy kick that awakens your senses and revives your energy.",
    ingredients: "Assam CTC Black Tea, Sun-Dried Ginger Granules",
    brewingTime: "4 mins with milk and sweetener of choice",
    tags: ["Ginger", "Immunity", "Kadak"]
  },
  {
    id: "prod-7",
    name: "Teamood Heritage Wooden Tea Gift Box",
    slug: "teamood-heritage-wooden-gift-box",
    category: "Gift Packs",
    price: 1299,
    discountPrice: 1099,
    weight: "4 x 100g Tins",
    sku: "TMD-GFT-WDN",
    stock: 14,
    minStock: 4,
    rating: 5.0,
    reviewsCount: 42,
    featured: true,
    bestseller: false,
    published: true,
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    description: "A handcrafted wooden keepsake box containing 4 curated signature tins: Shahi Masala, Kashmiri Kesar, Dark Velvet Chocolate, and Royal CTC with a solid brass tea strainer.",
    ingredients: "Assortment of 4 signature blends with brass strainer",
    brewingTime: "Varies by blend",
    tags: ["Gift", "Festive", "Luxury", "Brass Strainer"]
  },
  {
    id: "prod-8",
    name: "Authentic Mitti Kulhad Set (Pack of 6)",
    slug: "authentic-mitti-kulhad-set",
    category: "Tea Accessories",
    price: 299,
    discountPrice: 249,
    weight: "6 Pcs (150ml each)",
    sku: "TMD-ACC-KLH",
    stock: 60,
    minStock: 15,
    rating: 4.9,
    reviewsCount: 118,
    featured: false,
    bestseller: true,
    published: true,
    image: "https://images.unsplash.com/photo-1627881637126-b6b0c036329e?auto=format&fit=crop&w=800&q=80",
    description: "Earthen terracotta baked kulhads made by traditional Rajasthani potters. Imparts that unmistakable earthy aroma (saunda pan) to your morning chai.",
    ingredients: "100% Natural Terracotta Baked Clay",
    brewingTime: "Pour directly into kulhad",
    tags: ["Kulhad", "Terracotta", "Traditional", "Kota Clay"]
  }
];

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Chai Patti", count: 1, description: "Pure CTC and orthodox Assam whole leaf teas" },
  { id: "cat-2", name: "Masala Tea", count: 1, description: "Hand-pounded Indian spice blended teas" },
  { id: "cat-3", name: "Special Tea", count: 1, description: "Royal saffron, rose and celebratory blends" },
  { id: "cat-4", name: "Flavoured Tea", count: 3, description: "Chocolate, cardamom, ginger and vanilla creations" },
  { id: "cat-5", name: "Gift Packs", count: 1, description: "Curated gift assortments and festive hampers" },
  { id: "cat-6", name: "Tea Accessories", count: 1, description: "Kulhads, brass strainers and brewing kits" }
];

export const INITIAL_MENU_ITEMS = [
  // Classic Tea
  {
    id: "menu-1",
    name: "Teamood Special Kulhad Chai",
    category: "Classic Tea",
    price: 35,
    description: "Our signature piping hot tea served in traditional clay kulhad infused with cardamom & crushed ginger.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-2",
    name: "Elaichi Kadak Chai",
    category: "Classic Tea",
    price: 40,
    description: "Steaming milk chai brewed with aromatic green cardamom pods from southern plantations.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: false,
    status: "Active"
  },
  {
    id: "menu-3",
    name: "Adrak Tulsi Immunity Chai",
    category: "Classic Tea",
    price: 40,
    description: "Fresh grated ginger and holy basil leaves boiled to perfection with Assam CTC tea.",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: false,
    status: "Active"
  },

  // Special Tea
  {
    id: "menu-4",
    name: "Signature Chocolate Chai",
    category: "Special Tea",
    price: 65,
    description: "Kota's cult favorite! Dark melted chocolate blended smoothly into creamy spiced milk tea.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-5",
    name: "Shahi Kesar Badam Chai",
    category: "Special Tea",
    price: 85,
    description: "Kashmiri saffron threads, roasted almond slivers and cardamom in rich reduced milk.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-6",
    name: "Gulkand Rose Chai",
    category: "Special Tea",
    price: 60,
    description: "Infused with organic rose petal preserve and sun-dried organic rose water.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: false,
    status: "Active"
  },

  // Cold Tea & Brews
  {
    id: "menu-7",
    name: "Iced Peach & Lemon Tea",
    category: "Cold Tea",
    price: 90,
    description: "Crisp black tea steeped cold, muddled with juicy peach syrup and freshly squeezed lemon.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-8",
    name: "Hibiscus Berry Cooler",
    category: "Cold Tea",
    price: 95,
    description: "Ruby red herbal hibiscus infusion shaken with crushed ice, mint, and strawberry crush.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: false,
    status: "Active"
  },

  // Coffee
  {
    id: "menu-9",
    name: "Frothy South Indian Filter Kaapi",
    category: "Coffee",
    price: 55,
    description: "Chicory-blended decoction frothed high in traditional brass dabarah and tumbler.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: false,
    status: "Active"
  },
  {
    id: "menu-10",
    name: "Creamy Hazelnut Cold Coffee",
    category: "Coffee",
    price: 110,
    description: "Double shot espresso whipped with rich milk, hazelnut praline, and vanilla ice cream scoop.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },

  // Snacks & Bites
  {
    id: "menu-11",
    name: "Crispy Bun Maska with Jam",
    category: "Snacks",
    price: 50,
    description: "Freshly baked soft sweet bun loaded with Amul butter and homemade mixed fruit preserve.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-12",
    name: "Rajasthani Pyaaz Kachori (2 Pcs)",
    category: "Snacks",
    price: 60,
    description: "Golden flaky pastry stuffed with spicy caramelised onion and hing, served with tamarind chutney.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-13",
    name: "Cheese Garlic Toasties",
    category: "Snacks",
    price: 85,
    description: "Toasted artisan sourdough loaded with gooey mozzarella, roasted garlic butter, and chilli flakes.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: false,
    status: "Active"
  },

  // Combos
  {
    id: "menu-14",
    name: "Chai & Maska Combo",
    category: "Food and Combos",
    price: 80,
    description: "1 Kulhad Masala Chai + 1 Freshly toasted Bun Maska. The timeless Indian cafe comfort pairing.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  },
  {
    id: "menu-15",
    name: "Evening Gossip Combo",
    category: "Food and Combos",
    price: 130,
    description: "2 Kulhad Chais + 2 Crispy Pyaaz Kachoris + Mint & Tamarind Chutneys.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isPopular: true,
    status: "Active"
  }
];

export const INITIAL_BRANDS = [
  {
    id: "brand-teamood",
    name: "Teamood Cafe",
    tagline: "More Than Just Chai. It's A Whole Mood.",
    badge: "Modern Flagship Cafe",
    accentColor: "#6B3E26",
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The contemporary heartbeat of Kota's tea scene. Teamood Cafe combines artisanal handcrafted teas, soothing earthy aesthetics, vibrant study lounges, and modern cafe culture where students, thinkers, and friends gather.",
    focus: "Modern Cafe Ambience, Signature Teas, Youth Vibes, Artisanal Nibbles",
    locations: "Kota, Rajasthan (Aerodrome Circle / Rajeev Gandhi Nagar)",
    established: "Editable (Kota, Rajasthan)",
    signature: "Chocolate Chai, Shahi Kesar Chai & Bun Maska",
    instagram: "https://www.instagram.com/teamoodofficial/"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-9482",
    date: "2026-10-30T10:15:00Z",
    type: "online",
    customer: {
      name: "Rohit Verma",
      email: "rohit.verma@example.com",
      phone: "+91 98290 12345",
      address: "Flat 402, Coral Heights, Vigyan Nagar",
      city: "Kota",
      state: "Rajasthan",
      pincode: "324005"
    },
    items: [
      { id: "prod-1", name: "Royal Rajwadi CTC Tea", quantity: 2, price: 280 },
      { id: "prod-2", name: "Kota Shahi Masala Chai Blend", quantity: 1, price: 340 }
    ],
    subtotal: 900,
    discount: 50,
    tax: 42.5,
    total: 892.5,
    paymentMethod: "UPI (Simulated)",
    paymentStatus: "Paid",
    orderStatus: "Processing"
  },
  {
    id: "ORD-9481",
    date: "2026-10-29T16:40:00Z",
    type: "online",
    customer: {
      name: "Ananya Sharma",
      email: "ananya.s@example.com",
      phone: "+91 94140 76543",
      address: "12-B, Talwandi",
      city: "Kota",
      state: "Rajasthan",
      pincode: "324005"
    },
    items: [
      { id: "prod-7", name: "Teamood Heritage Wooden Tea Gift Box", quantity: 1, price: 1099 }
    ],
    subtotal: 1099,
    discount: 0,
    tax: 54.95,
    total: 1153.95,
    paymentMethod: "Card (Simulated)",
    paymentStatus: "Paid",
    orderStatus: "Delivered"
  },
  {
    id: "POS-1042",
    date: "2026-10-30T13:20:00Z",
    type: "pos",
    customer: {
      name: "Counter Walk-in (Table 4)",
      phone: "+91 98291 00000"
    },
    items: [
      { id: "menu-1", name: "Teamood Special Kulhad Chai", quantity: 3, price: 35 },
      { id: "menu-11", name: "Crispy Bun Maska with Jam", quantity: 2, price: 50 },
      { id: "menu-12", name: "Rajasthani Pyaaz Kachori", quantity: 2, price: 60 }
    ],
    subtotal: 325,
    discount: 0,
    tax: 16.25,
    total: 341.25,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Delivered"
  },
  {
    id: "POS-1041",
    date: "2026-10-30T12:05:00Z",
    type: "pos",
    customer: {
      name: "Siddharth",
      phone: "+91 97850 55443"
    },
    items: [
      { id: "menu-4", name: "Signature Chocolate Chai", quantity: 2, price: 65 },
      { id: "menu-13", name: "Cheese Garlic Toasties", quantity: 1, price: 85 }
    ],
    subtotal: 215,
    discount: 15,
    tax: 10,
    total: 210,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    orderStatus: "Delivered"
  }
];

export const INITIAL_FRANCHISE_ENQUIRIES = [
  {
    id: "FRN-301",
    date: "2026-10-30T09:30:00Z",
    fullName: "Vikramaditya Rathore",
    phone: "+91 98290 88990",
    email: "vikram.rathore@outlook.com",
    city: "Jaipur",
    state: "Rajasthan",
    preferredBrand: "Teamood Cafe",
    investmentBudget: "₹15 Lakh - ₹25 Lakh",
    hasProperty: "Yes",
    propertyLocation: "Tonk Road, Commercial Market",
    businessExperience: "5 years managing a quick-service cafe franchise in Jaipur",
    message: "Interested in setting up a prime flagship cafe with comfortable seating for students and families.",
    status: "Interested",
    notes: "High potential lead. Sent franchise deck on WhatsApp.",
    assignedTo: "Rahul (Business Dev)"
  },
  {
    id: "FRN-302",
    date: "2026-10-29T14:15:00Z",
    fullName: "Pooja Mehta",
    phone: "+91 94141 55667",
    email: "pooja.mehta@gmail.com",
    city: "Udaipur",
    state: "Rajasthan",
    preferredBrand: "Teamood Cafe",
    investmentBudget: "₹8 Lakh - ₹15 Lakh",
    hasProperty: "Yes",
    propertyLocation: "Fateh Sagar Lake Promenade",
    businessExperience: "New entrepreneur with family retail background",
    message: "Looking for an express kiosk model near tourist walkway.",
    status: "New",
    notes: "Initial enquiry received through website.",
    assignedTo: "Unassigned"
  },
  {
    id: "FRN-303",
    date: "2026-10-28T11:45:00Z",
    fullName: "Karan Singhal",
    phone: "+91 98200 44321",
    email: "karan.singhal@rediffmail.com",
    city: "Indore",
    state: "Madhya Pradesh",
    preferredBrand: "Teamood Cafe",
    investmentBudget: "₹25 Lakh+",
    hasProperty: "No",
    propertyLocation: "Exploring locations near 56 Dukan",
    businessExperience: "Owns two retail lifestyle stores",
    message: "Huge demand for modern tea lounges in Indore. Would love to discuss master franchise terms.",
    status: "Follow-up",
    notes: "Scheduled video call for Saturday 4 PM.",
    assignedTo: "Priya (Franchise Head)"
  }
];

export const INITIAL_CONTACT_ENQUIRIES = [
  {
    id: "CNT-101",
    date: "2026-10-30T11:20:00Z",
    name: "Dr. Arvind Joshi",
    email: "arvind.joshi@kotauniversity.ac.in",
    phone: "+91 94142 33221",
    subject: "Catering for Annual College Symposium",
    message: "We would like to book a live Teamood Chai Counter with 4 tea variants and snacks for 350 attendees next month.",
    status: "New",
    notes: "Call back to discuss dates and custom menu."
  },
  {
    id: "CNT-102",
    date: "2026-10-29T17:10:00Z",
    name: "Meera Gupta",
    email: "meera.g@gmail.com",
    phone: "+91 98299 11223",
    subject: "Corporate Festive Gift Boxes Bulk Order",
    message: "Looking to order 80 wooden heritage tea gift hampers for Diwali client gifting. Need custom branding options.",
    status: "Replied",
    notes: "Shared PDF catalogue with quantity slab pricing."
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "t-1",
    author: "Ayush Mathur",
    role: "IIT-JEE Aspirant & Daily Regular",
    location: "Kota, Rajasthan",
    comment: "Teamood was my sanctuary during grueling study months. That Chocolate Kulhad Chai and calm vibe gave me the exact mental reset I needed every evening.",
    rating: 5,
    date: "October 2026"
  },
  {
    id: "t-2",
    author: "Simran Kapoor",
    role: "Food & Travel Creator",
    location: "Jaipur, Rajasthan",
    comment: "I travel across India searching for great chai, and Teamood’s Shahi Kesar Chai served in genuine terracotta kulhads is hands down one of the most fragrant brews I have ever experienced.",
    rating: 5,
    date: "September 2026"
  },
  {
    id: "t-3",
    author: "Devendra Solanki",
    role: "Local Resident & Tea Aficionado",
    location: "Kota, Rajasthan",
    comment: "What I love is the consistency. Whether it is their classic adrak kadak chai or their packaged Assam CTC tea I brew at home, the depth of flavour never drops.",
    rating: 5,
    date: "October 2026"
  }
];

export const INITIAL_SITE_CONTENT = {
  hero: {
    badge: "Authentic Chai Culture • Kota, Rajasthan",
    headline: "More Than Just Chai.\nIt's A Whole Mood.",
    subheadline: "Discover the art of chai, unforgettable flavours and moments worth sharing in an atmosphere where traditions meet contemporary cafe elegance.",
    primaryCta: "Explore Our Menu",
    secondaryCta: "Discover Our Story",
  },
  about: {
    storyTitle: "Rooted in Kota's Energetic Spirit",
    storyParagraph1: "Born in the vibrant educational hub of Kota, Rajasthan, Teamood Cafe began with a simple yet passionate vision: to elevate everyday chai from a hurried street sip into an inspiring sensory ritual.",
    storyParagraph2: "We believe a cup of tea is never just a drink. It is the backdrop to late-night brainstorms, heartwarming conversations with friends, quiet moments of solace, and joyous celebrations.",
    mission: "To craft authentic, comforting, and inventive chai experiences that bring people together across generations.",
    vision: "To establish a national footprint of contemporary tea cafes and express destinations celebrating Indian beverage heritage."
  },
  contact: {
    address: "Aerodrome Circle, Near Coaching Hub, Kota, Rajasthan 324007",
    phone: "+91 98290 00000",
    email: "namaste@teamoodcafe.com",
    hours: "Everyday: 7:00 AM – 11:30 PM",
    googleMapUrl: "https://www.google.com/maps/search/teamood+kota",
    googleBusinessUrl: "https://www.google.com/search?q=teamood+kota+google+business+profile",
    instagramUrl: "https://www.instagram.com/teamoodofficial/"
  }
};
