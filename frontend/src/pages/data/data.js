export const masterServices = [
  {
    id: "residential-design",
    categoryName: "Residential Design",
    heroTeaser: "Private sanctuaries designed for generations.",
    mainImg:
      "https://images.unsplash.com/photo-1758445043367-3c91bf6cb0d9?q=80&w=1200",

    // YAHAN SE DETAILING SHURU
    subProjects: [
      {
        id: "glass-villa",
        projectName: "The Glass Villa",
        tagline: "Transparency meets Solitude",
        description:
          "A seamless synthesis of transparency and solitude in the heart of the highlands. We’ve blurred the boundaries to invite the landscape indoors through expansive 12ft structural glass facades.",

        // Detailed Info for UI Grids
        stats: {
          rating: 4.9,
          location: "Kasauli, HP",
          area: "4500 sqft",
          year: "2024",
          budgetRange: "Premium",
          timeline: "14 Months",
        },

        // Images Array (Multiple perspectives for Slider/Gallery)
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200", // Exterior Night
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200", // Living Room
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200", // Deck Area
        ],

        // Key Features (Jo hum Detail Page ke icons mein dikhayenge)
        highlights: [
          "Smart Climate Control Glass",
          "Invisible Column Structure",
          "Infinity Edge Terrace Pool",
          "Sun-Path Optimized Lighting",
        ],

        // Material Palette (Architecture vibes)
        materials: [
          { name: "Extra Clear Toughened Glass", origin: "Banglore" },
          { name: "Reclaimed Burmese Teak", origin: "Delhi, NCR" },
          { name: "Italian Travertine Marble", origin: "Noida" },
        ],

        // Testimonial specifically for this project
        clientVerdict: {
          name: "Mr. Kapoor",
          text: "The interplay of transparency and profound privacy is truly unmatched. A structural masterpiece.",
          avatar: "https://i.pravatar.cc/150?u=kapoor",
        },
      },
      {
        id: "minimalist-penthouse",
        projectName: "Minimalist Penthouse",
        tagline: "The Poetry of Concrete",
        description:
          "Concrete textures meet warm oak wood in this urban sanctuary. Ye project 'Less is More' philosophy par based hai, jahan har element ka ek maqsad hai.",

        stats: {
          rating: 4.8,
          location: "South Delhi",
          area: "3200 sqft",
          year: "2023",
          budgetRange: "High-End",
          timeline: "10 Months",
        },

        images: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200", // Entrance
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200", // Kitchen
          "https://images.unsplash.com/photo-1512918766775-d56a12275486?q=80&w=1200", // Master Bed
        ],

        highlights: [
          "Micro-Concrete Flooring",
          "Hidden Cabinetry System",
          "Automated Circadian Lighting",
          "Open Sky Courtyard",
        ],

        materials: [
          { name: "European White Oak", origin: "Germany" },
          { name: "Brushed Gunmetal Accents", origin: "Custom Made" },
          { name: "Micro-Topping Concrete", origin: "Italy" },
        ],

        clientVerdict: {
          name: "Sanjana Malik",
          text: "In the amidst of South Delhi’s urban chaos, my home feels like a serene island. The minimal aesthetic is truly soul-soothing—a masterpiece of tranquility.",
          avatar: "https://i.pravatar.cc/150?u=sanjana",
        },
      },
    ],
  },
  {
    id: "commercial-interiors",
    categoryName: "Commercial Interiors",
    heroTeaser: "Workspaces that breed innovation and brand identity.",
    mainImg:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",

    subProjects: [
      {
        id: "tech-hub-hq",
        projectName: "Tech-Hub HQ",
        tagline: "The Future of Fluid Work",
        description:
          "An expansive open-plan layout featuring integrated biophilic zones curated for cognitive wellness. We have replaced traditional cubicles with dynamic 'Collaboration Pods' designed to catalyze creative friction and innovation.",

        stats: {
          rating: 4.7,
          location: "Gurgaon, HR",
          area: "15,000 sqft",
          year: "2025",
          capacity: "250+ Employees",
          timeline: "18 Months",
        },

        images: [
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200", // Main Floor
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200", // Breakout Zone
          "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200", // Boardroom
        ],

        highlights: [
          "Acoustic Baffle Ceilings",
          "Vertical Hydroponic Walls",
          "IoT Based Desk Management",
          "Adaptive Lighting Scenes",
        ],

        materials: [
          { name: "Recycled Felt Panels", origin: "Scandinavia" },
          { name: "Polished Industrial Concrete", origin: "Custom Mix" },
          { name: "Tempered Black Steel", origin: "Local Foundry" },
        ],

        clientVerdict: {
          name: "Aryan Mehra (CEO)",
          text: "Our collective productivity surged by 30% following the transition to this new office layout. Spatial psychology is undeniably real.",
          avatar: "https://i.pravatar.cc/150?u=aryan",
        },
      },
      {
        id: "canvas-retail",
        projectName: "Canvas Retail Store",
        tagline: "Retail as Art",
        description:
          "A minimalist, gallery-inspired retail experience tailored for high-end fashion houses. The space is meticulously engineered to ensure the 'Product remains the Hero' through clean visual hierarchy.",
        stats: {
          rating: 4.9,
          location: "Colaba, Mumbai",
          area: "1200 sqft",
          year: "2024",
          footfall: "High Intensity",
          timeline: "6 Months",
        },

        images: [
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200", // Storefront
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200", // Product Display
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200", // Trail Rooms
        ],

        highlights: [
          "Floating Glass Shelving",
          "Concealed LED Tracks",
          "Magnetic Partition Walls",
          "Smart Mirror Integration",
        ],

        materials: [
          { name: "White Resin Flooring", origin: "Switzerland" },
          { name: "Satin Brass Fittings", origin: "Artisanal Crafted" },
          { name: "Dichroic Glass Panels", origin: "Germany" },
        ],

        clientVerdict: {
          name: "Riya Sen",
          text: "The lighting is magical. Customers feel like they are in an art museum, not just a store.",
          avatar: "https://i.pravatar.cc/150?u=riya",
        },
      },
    ],
  },
  {
    id: "furniture-curation",
    categoryName: "Furniture Curation",
    heroTeaser: "Bespoke artisanal pieces that tell a unique story.",
    mainImg:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200",

    subProjects: [
      {
        id: "heritage-sofa",
        projectName: "The Heritage Sofa Series",
        tagline: "Timeless Comfort, Carved by Hand",
        description:
          "Hand-carved teak integrated with premium Belgian velvet upholstery. This series represents a masterful balance of 'Royalty' and 'Modernity,' where every silhouette narrates a story of heritage.",
        stats: {
          rating: 5.0,
          location: "Global Shipping",
          area: "Custom Configurations",
          year: "2024",
          leadTime: "12-16 Weeks",
          style: "Neo-Classical",
        },

        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200", // Main Profile
          "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200", // Fabric Detail
          "https://images.unsplash.com/photo-1540518614846-7eba43376461?q=80&w=1200", // In-room view
        ],

        highlights: [
          "Double-Dowel Joinery",
          "High-Resilience Foam Core",
          "Hand-Tufted Detailing",
          "Stain-Resistant Coating",
        ],

        materials: [
          { name: "Burmese Grade-A Teak", origin: "Myanmar" },
          { name: "Signature Belgian Velvet", origin: "Antwerp" },
          { name: "Brass Stud Accents", origin: "Hand-Forged" },
        ],

        clientVerdict: {
          name: "Anita Deshmukh",
          text: "This piece is far more than just furniture; it has become the definitive 'Centerpiece' of our living room. The texture is exquisitely buttery—pure tactile perfection.",
          avatar: "https://i.pravatar.cc/150?u=anita",
        },
      },
      {
        id: "brutalist-dining",
        projectName: "Brutalist Dining Set",
        tagline: "Raw Power, Elegant Gathering",
        description:
          "A raw cast-iron foundation juxtaposed with a single-slab walnut surface. This project is a celebration of 'Imperfection,' where the wood’s natural fissures are meticulously preserved and harmonized with epoxy resin.",
        stats: {
          rating: 4.9,
          location: "Limited Edition (10 Pcs)",
          area: "10 Seater Giant",
          year: "2025",
          weight: "280 KG",
          style: "Industrial Brutalist",
        },

        images: [
          "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=1200",
          "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200",
          "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1200",
        ],

        highlights: [
          "Live-Edge Single Slab",
          "Rust-Proof Cast Iron",
          "Satin Polyurethane Finish",
          "Hand-Stamped Serial Number",
        ],

        materials: [
          { name: "Old-Growth Black Walnut", origin: "North America" },
          { name: "Recycled Industrial Iron", origin: "Local Foundry" },
          { name: "Food-Grade Resin", origin: "Japan" },
        ],

        clientVerdict: {
          name: "Vikram Malhotra",
          text: "Commanding, bold, and entirely unique. Every guest is captivated by this piece. It is a tank-like structure that presents itself as fine art.",
          avatar: "https://i.pravatar.cc/150?u=vikram",
        },
      },
    ],
  },
  {
    id: "landscape-artistry",
    categoryName: "Landscape Artistry",
    heroTeaser: "Blending nature with architectural precision.",
    mainImg:
      "https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=1200",

    subProjects: [
      {
        id: "zen-courtyard",
        projectName: "The Zen Courtyard",
        tagline: "Silence in Every Drop",
        description:
          "An indoor-outdoor aquatic sanctuary featuring automated micro-climate control. The project centers on 'Meditative Flow,' where the cadence of water and the interplay of natural light cultivate a profound sense of tranquility.",
        stats: {
          rating: 4.8,
          location: "Chandigarh",
          area: "1800 sqft",
          year: "2023",
          waterFeature: "Bio-Filtered Pond",
          maintenance: "Low (Automated)",
        },

        images: [
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200",
          "https://images.unsplash.com/photo-1596131397999-bb0159496991?q=80&w=1200",
          "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1200",
        ],

        highlights: [
          "Koi Fish Bio-Ecosystem",
          "Automated Mist Irrigation",
          "Acoustic Water-Wall",
          "Submerged Night Illumination",
        ],

        materials: [
          { name: "Basalt River Stones", origin: "Vietnam" },
          { name: "Siberian Larch Decking", origin: "Siberia" },
          { name: "Weathered Slate Tiles", origin: "Rajasthan" },
        ],

        clientVerdict: {
          name: "Sumeet Bansal",
          text: "Integrating this central courtyard was the defining decision of my life. Sitting here in the evening is more than just relaxation; it’s a form of therapy.",
          avatar: "https://i.pravatar.cc/150?u=sumeet",
        },
      },
      {
        id: "sky-garden",
        projectName: "Sky Garden Terrace",
        tagline: "Urban Oasis at 400 Feet",
        description:
          "High-altitude vertical greenery featuring drought-resistant native flora. Perched above the urban density, we have engineered an elevated forest—a sanctuary of thermal cooling and a concentrated oxygen reservoir.",

        stats: {
          rating: 4.7,
          location: "Bangalore",
          area: "800 sqft",
          year: "2024",
          soilType: "Engineered Lite-Weight",
          floraType: "Native Xeriscaping",
        },

        images: [
          "https://images.unsplash.com/photo-1590059392251-5f048866179b?q=80&w=1200",
          "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
          "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200",
        ],

        highlights: [
          "Hydroponic Living Wall",
          "Custom Fire-Pit Zone",
          "Wind-Resistant Glass Railing",
          "Smart Soil-Moisture Sensors",
        ],

        materials: [
          { name: "Polymer Root Barriers", origin: "Japan" },
          { name: "Lightweight Perlite Soil", origin: "Local Mix" },
          { name: "Oxidized Copper Planters", origin: "Hand-Crafted" },
        ],

        clientVerdict: {
          name: "Dr. Anjali Rao",
          text: "Even in the peak Bangalore heat, my penthouse remains naturally cool. The vertical garden has seamlessly integrated absolute privacy with a lush, immersive green escape.",
          avatar: "https://i.pravatar.cc/150?u=anjali",
        },
      },
    ],
  },
];
