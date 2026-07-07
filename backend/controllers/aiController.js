import axios from "axios";
import Trip from "../models/Trip.js";

// Helper to sanitize activities and coerce schema compliance
const sanitizeActivities = (activitiesArray) => {
  if (!Array.isArray(activitiesArray)) return [];
  const sanitized = [];
  for (const act of activitiesArray) {
    if (!act || typeof act !== "object") continue;

    const time = typeof act.time === "string" ? act.time : "09:00 AM";
    const title = typeof act.title === "string" ? act.title : "Explore Spot";
    const description = typeof act.description === "string" ? act.description : "";
    const duration = typeof act.duration === "string" ? act.duration : "2h";

    // Coerce cost safely
    let estimatedCost = 0;
    if (typeof act.estimatedCost === "number") {
      estimatedCost = act.estimatedCost;
    } else if (typeof act.estimatedCost === "string") {
      const parsed = parseFloat(act.estimatedCost.replace(/[^0-9.]/g, ""));
      estimatedCost = isNaN(parsed) ? 0 : parsed;
    }

    // Standardize category matching
    let category = "activity";
    const rawCat = typeof act.category === "string" ? act.category.toLowerCase().trim() : "";
    if (["stay", "lodging", "hotel", "accommodation", "resort"].includes(rawCat)) {
      category = "stay";
    } else if (["food", "dining", "meal", "restaurant", "cafe", "drinks", "lunch", "dinner", "breakfast"].includes(rawCat)) {
      category = "food";
    } else if (["transport", "transit", "flight", "taxi", "bus", "train", "drive", "car", "metro", "subway"].includes(rawCat)) {
      category = "transport";
    } else {
      category = "activity";
    }

    sanitized.push({
      time,
      title,
      description,
      estimatedCost,
      category,
      duration
    });
  }
  return sanitized;
};

// Helper function to sanitize, repair, and validate itinerary JSON structure
const sanitizeAndValidateItinerary = (data) => {
  if (!data || typeof data !== "object") return null;
  if (!Array.isArray(data.days)) return null;

  const sanitizedDays = [];
  for (const day of data.days) {
    if (!day || typeof day !== "object") continue;
    
    const date = typeof day.date === "string" ? day.date : "YYYY-MM-DD";
    const activities = sanitizeActivities(day.activities);
    
    sanitizedDays.push({ date, activities });
  }

  if (sanitizedDays.length === 0) return null;
  return { days: sanitizedDays };
};

const addDays = (dateStr, days) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const getLocalizedActivities = (destination, dayIndex, dailyBudget) => {
  const destLower = destination.toLowerCase();
  const stayCost = Math.round(dailyBudget * 0.4);
  const foodCost1 = Math.round(dailyBudget * 0.15);
  const foodCost2 = Math.round(dailyBudget * 0.2);
  const actCost = Math.round(dailyBudget * 0.25);

  // Delhi Fallback
  if (destLower.includes("delhi")) {
    const list = [
      [
        { time: "09:00 AM", title: "Delhi Airport/Station Transit", description: "Checked in via pre-paid taxi to your hotel in Connaught Place.", estimatedCost: 15, category: "transport", duration: "1.5h" },
        { time: "12:30 PM", title: "Lunch at Karim's (Old Delhi)", description: "Feast on iconic Mughlai mutton korma and tandoori rotis.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "02:30 PM", title: "Red Fort Exploration", description: "Guided tour through the massive 17th-century sandstone fortress.", estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at The Connaught Hotel", description: "Premium boutique stay in central Delhi.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:00 AM", title: "Qutub Minar Complex", description: "Explore the tallest brick minaret in the world and iron pillar.", estimatedCost: actCost, category: "activity", duration: "2h" },
        { time: "01:00 PM", title: "Lunch at Saravana Bhavan", description: "Savor premium South Indian thali and filter coffee in CP.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Humayun's Tomb Heritage Walk", description: "Stroll around the magnificent precursor to the Taj Mahal.", estimatedCost: 10, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at The Connaught Hotel", description: "Premium boutique stay in central Delhi.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Lotus Temple Visit", description: "Experience serene meditation sessions at the Bahai temple.", estimatedCost: 0, category: "activity", duration: "2h" },
        { time: "12:30 PM", title: "Street Food Tour at Chandni Chowk", description: "Sample famous parathas at Paranthe Wali Gali and local sweets.", estimatedCost: foodCost1, category: "food", duration: "2h" },
        { time: "03:00 PM", title: "Shopping Walk at Dilli Haat", description: "Explore authentic Indian regional handicrafts and souvenirs.", estimatedCost: foodCost2, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at The Connaught Hotel", description: "Premium boutique stay in central Delhi.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Kedarnath Fallback
  if (destLower.includes("kedarnath")) {
    const list = [
      [
        { time: "06:00 AM", title: "Sonprayag to Gaurikund Transit", description: "Early morning local shared jeep to the trek starting point.", estimatedCost: 5, category: "transport", duration: "1h" },
        { time: "08:00 AM", title: "Kedarnath Trek Initiation", description: "Begin the 16km scenic mountain trail trek (walking/mule/palki).", estimatedCost: actCost, category: "activity", duration: "7h" },
        { time: "04:30 PM", title: "Arrival & GMVN Ashram Check-in", description: "Settle into your cozy mountain cottage near the temple.", estimatedCost: stayCost, category: "stay", duration: "14h" }
      ],
      [
        { time: "05:00 AM", title: "Kedarnath Temple Darshan", description: "Attend the morning Abhishek puja and explore the holy shrine.", estimatedCost: 10, category: "activity", duration: "3h" },
        { time: "09:00 AM", title: "Breakfast at Local Bhandara/Mess", description: "Enjoy hot parathas and tea with a view of the Himalayan peaks.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "11:00 AM", title: "Trek Down to Gaurikund", description: "Begin descending the mountain trail back to Sonprayag.", estimatedCost: 0, category: "activity", duration: "5h" },
        { time: "06:30 PM", title: "Stay at Sonprayag Lodge", description: "Relax at your base lodge after the divine pilgrimage.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:00 AM", title: "Bairon Temple Trek", description: "Short uphill hike to Bairon Baba Temple for panoramic valley views.", estimatedCost: 5, category: "activity", duration: "2h" },
        { time: "12:00 PM", title: "Lunch at Kedarnath Base Mess", description: "Simple hot vegetarian mountain meal.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "02:00 PM", title: "Spiritual Meditation Near Shrine", description: "Spend quiet time in the divine, tranquil atmosphere of the valley.", estimatedCost: 0, category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at GMVN Camp", description: "Cozy tented accommodation with Himalayan views.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Haridwar Fallback
  if (destLower.includes("haridwar")) {
    const list = [
      [
        { time: "09:00 AM", title: "Check-in at Haridwar Ashram", description: "Settle in at a quiet riverside ashram with Ganges views.", estimatedCost: stayCost, category: "stay", duration: "12h" },
        { time: "11:30 AM", title: "Mansa Devi Cable Car Ride", description: "Scenic ropeway ride to the hilltop temple overlooking Haridwar.", estimatedCost: 8, category: "activity", duration: "2h" },
        { time: "01:30 PM", title: "Lunch at Chotiwala", description: "Iconic traditional thali lunch near the Ganges.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "06:00 PM", title: "Ganga Aarti at Har Ki Pauri", description: "Attend the world-famous evening oil lamp floating prayer ceremony.", estimatedCost: 5, category: "activity", duration: "1.5h" }
      ],
      [
        { time: "09:00 AM", title: "Chandi Devi Hilltop Temple", description: "Take the cable car to Neel Parvat for spectacular panoramic views.", estimatedCost: 8, category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Street Food Crawl (Kachori & Lassi)", description: "Sample famous Haridwar style breakfast and creamy buttermilk.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Shanti Kunj Ashram Visit", description: "Peaceful walk through the spiritual and scientific research center.", estimatedCost: 0, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at Haridwar Heritage Hotel", description: "Premium riverside heritage boutique stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Sonprayag Fallback
  if (destLower.includes("sonprayag")) {
    const list = [
      [
        { time: "11:00 AM", title: "Transit to Sonprayag Base", description: "Scenic mountain drive from Rishikesh/Dehradun.", estimatedCost: 20, category: "transport", duration: "5h" },
        { time: "05:00 PM", title: "Explore Sonprayag Valley", description: "Acclimatize to the altitude, walk near the Mandakini river.", estimatedCost: 0, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Mandakini Valley Lodge", description: "Comfortable local guest house stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:30 AM", title: "Triyuginarayan Temple Excursion", description: "Visit the legendary temple where Lord Shiva and Goddess Parvati married.", estimatedCost: 15, category: "activity", duration: "4h" },
        { time: "01:30 PM", title: "Local Organic Farm Lunch", description: "Enjoy fresh mountain veggies and local millet breads.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "04:30 PM", title: "Mandakini River Confluence Walk", description: "Scenic nature stroll tracing the roaring rivers.", estimatedCost: 0, category: "activity", duration: "2.5h" },
        { time: "07:00 PM", title: "Stay at Mandakini Valley Lodge", description: "Acclimatization lodging with bonfire dinner.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Vizag Fallback
  if (destLower.includes("vizag") || destLower.includes("visakhapatnam")) {
    const list = [
      [
        { time: "09:00 AM", title: "Check-in at Beach Road Hotel", description: "Check in at a premium hotel overlooking the Bay of Bengal.", estimatedCost: stayCost, category: "stay", duration: "12h" },
        { time: "10:30 AM", title: "INS Kursura Submarine Museum", description: "Explore a real decommissioned submarine parked on the beach sand.", estimatedCost: 5, category: "activity", duration: "1.5h" },
        { time: "01:00 PM", title: "Seafood Lunch at Sea Inn", description: "Enjoy local spicy Andhra fish curry and crab roast.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "04:30 PM", title: "Kailasagiri Hilltop Park", description: "Ropeway ride to the giant Shiva Parvathi statues with panoramic ocean views.", estimatedCost: 10, category: "activity", duration: "2.5h" }
      ],
      [
        { time: "07:30 AM", title: "Araku Valley Scenic Train Trip", description: "Beautiful mountain rail journey crossing tunnels and waterfalls.", estimatedCost: 20, category: "transport", duration: "3.5h" },
        { time: "12:00 PM", title: "Borra Caves Exploration", description: "Explore the deep millions-years-old limestone structures.", estimatedCost: 10, category: "activity", duration: "2.5h" },
        { time: "02:30 PM", title: "Bamboo Chicken Lunch (Araku)", description: "Sample famous tribal style chicken slow-cooked inside bamboo stalks.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "07:30 PM", title: "Stay at Araku Hill Resort", description: "Stay at a cozy mountain eco-resort.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Simhachalam Hill Temple", description: "Visit the ancient 11th-century Lakshmi Narasimha temple.", estimatedCost: 5, category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Lunch at Local Andhra Mess", description: "Unlimited traditional vegetarian meals served on banana leaf.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:30 PM", title: "Rishikonda Beach Water Sports", description: "Try speed boating and jet skiing at Vizag's cleanest beach.", estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at Beach Road Hotel", description: "Premium hotel stay overlooking the ocean.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Odisha Fallback
  if (destLower.includes("odisha") || destLower.includes("odhisa") || destLower.includes("puri") || destLower.includes("bhubaneswar")) {
    const list = [
      [
        { time: "09:00 AM", title: "Konark Sun Temple", description: "Marvel at the UNESCO 13th-century chariot temple architecture.", estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Odia Thali Lunch", description: "Dalma, Pakhala, and Chhena Poda dessert at a local kitchen.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "04:00 PM", title: "Puri Golden Beach Stroll", description: "Walk along the clean beaches of Puri, tasting local snacks.", estimatedCost: 5, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Toshali Sands Beach Resort", description: "Eco-friendly premium resort stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:00 AM", title: "Jagannath Temple Darshan", description: "Divine morning temple visit in Puri, learning local legends.", estimatedCost: 0, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Chilika Lake Boat Cruise", description: "Dolphin-spotting tour on Asia's largest brackish lagoon.", estimatedCost: actCost, category: "activity", duration: "4h" },
        { time: "07:30 PM", title: "Stay at Toshali Sands Beach Resort", description: "Relax at your resort near the beach.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:00 AM", title: "Raghurajpur Heritage Craft Village", description: "See local painters making legendary Pattachitra folk art.", estimatedCost: 10, category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Odia Sweet Crawl Lunch", description: "Sample fresh hot Rasagola, Chhena Jhili, and local savories.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:30 PM", title: "Khandagiri Caves Guided Walk", description: "Explore the ancient rock-cut Jain caves in Bhubaneswar.", estimatedCost: 5, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Bhubaneswar Boutique Hotel", description: "Premium hotel stay in capital city.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Kerala Fallback
  if (destLower.includes("kerala") || destLower.includes("kochi") || destLower.includes("alleppey") || destLower.includes("munnar")) {
    const list = [
      [
        { time: "09:00 AM", title: "Munnar Tea Gardens", description: "Walk through lush green manicured tea estates and waterfalls.", estimatedCost: 10, category: "activity", duration: "3.5h" },
        { time: "01:00 PM", title: "Traditional Kerala Sadhya Lunch", description: "Feast served on a fresh banana leaf with over 15 local curries.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:00 PM", title: "Alleppey Houseboat Check-in", description: "Board your private luxury houseboat tracing the scenic backwaters.", estimatedCost: stayCost, category: "stay", duration: "18h" }
      ],
      [
        { time: "09:00 AM", title: "Kochi Fort Walkway", description: "View the iconic Chinese Fishing Nets and historic Dutch palace.", estimatedCost: 5, category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Lunch at Kashi Art Cafe", description: "Quaint art gallery cafe serving local healthy recipes.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:30 PM", title: "Kathakali Dance Show", description: "Traditional stylized classical Indian dance performance.", estimatedCost: 15, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Fort Kochi Heritage Hotel", description: "Colonial-style boutique stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:00 AM", title: "Periyar Wildlife Boating", description: "Scenic boat safari in Thekkady to spot wild elephants and birds.", estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Spice Plantation Tour & Lunch", description: "Guided farm walk learning cardamom, pepper, and cinnamon harvests.", estimatedCost: foodCost1, category: "food", duration: "2h" },
        { time: "04:30 PM", title: "Kalaripayattu Martial Art Show", description: "Watch a dynamic, ancient traditional combat show.", estimatedCost: 10, category: "activity", duration: "1.5h" },
        { time: "07:30 PM", title: "Stay at Munnar Mountain Resort", description: "Cozy rooms nestled in foggy valleys.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Tamil Nadu Fallback
  if (destLower.includes("tamil nadu") || destLower.includes("chennai") || destLower.includes("madurai") || destLower.includes("ooty")) {
    const list = [
      [
        { time: "09:00 AM", title: "Madurai Meenakshi Temple", description: "Guided tour through the historic gopuram towers of the temple.", estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Murugan Idli Shop", description: "Taste soft fluffy idlis, vada, and authentic ghee roast dosa.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Marina Beach Sunset Walk", description: "Second longest beach in the world, trying local hot snacks.", estimatedCost: 5, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at ITC Grand Chola Chennai", description: "Premium imperial South Indian architecture stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:00 AM", title: "Mahabalipuram Shore Temples", description: "Explore the ancient rock-cut cave temples and monolithic structures.", estimatedCost: 10, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Seafood Feast Lunch", description: "Taste spicy local fried fish and prawns right on the beach.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:00 PM", title: "Matrimandir Meditation Walk", description: "Quiet stroll through the beautiful gardens of Auroville.", estimatedCost: 0, category: "activity", duration: "3.5h" },
        { time: "07:30 PM", title: "Stay at Pondicherry Beach Villa", description: "Heritage French-quarter boutique stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:30 AM", title: "Ooty Nilgiri Toy Train", description: "Beautiful historic steam rail transit ascending lush green valleys.", estimatedCost: 15, category: "transport", duration: "2h" },
        { time: "11:00 AM", title: "Ooty Lake & Botanical Gardens", description: "Walk through rare plants, greenhouse structures, and boating.", estimatedCost: 10, category: "activity", duration: "3h" },
        { time: "02:00 PM", title: "Lunch at Savoy Club", description: "Premium Anglo-Indian lunch set in a historic clubhouse.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "07:30 PM", title: "Stay at Ooty Tea Estate Cottage", description: "Relax at a private cottage surrounded by tea plantations.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Hyderabad Fallback
  if (destLower.includes("hyderabad")) {
    const list = [
      [
        { time: "09:30 AM", title: "Golconda Fort Guided Trek", description: "Explore the historic ruins and acoustic wonders of the fortress.", estimatedCost: 12, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Paradise Biryani", description: "Feast on world-famous Hyderabadi mutton dum biryani.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:30 PM", title: "Charminar & Laad Bazaar Stroll", description: "Iconic 16th-century monument and market famous for glass bangles.", estimatedCost: 5, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at Taj Falaknuma Palace", description: "Luxury palace hotel stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:30 AM", title: "Ramoji Film City Studio Tour", description: "Complete guided day trip through the largest film studio complex in the world.", estimatedCost: actCost, category: "activity", duration: "6h" },
        { time: "04:30 PM", title: "Hussain Sagar Lake Yachting", description: "Watch sunset next to the massive monolith Buddha statue in the lake.", estimatedCost: 10, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Taj Falaknuma Palace", description: "Luxury palace hotel stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Chowmahalla Palace Heritage Walk", description: "Explore the grand court halls, vintage cars, and gardens of the Nizams.", estimatedCost: 10, category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Jewel of Nizam", description: "Fine dining Mughlai experience inside a high tower.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:30 PM", title: "Jubilee Hills Shopping", description: "Stroll down premium designer boutiques and organic cafes.", estimatedCost: foodCost2, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at Taj Falaknuma Palace", description: "Luxury palace hotel stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Foreign Fallbacks (Kyoto, Paris, etc. or generic)
  if (destLower.includes("paris")) {
    const list = [
      [
        { time: "09:00 AM", title: "Eiffel Tower Summit", description: "Pre-booked lift tickets to the highest panoramic view of Paris.", estimatedCost: actCost, category: "activity", duration: "2h" },
        { time: "12:30 PM", title: "Lunch at French Bistro", description: "Indulge in delicious steak frites and warm chocolate souffles.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:00 PM", title: "Louvre Museum Art Tour", description: "See the Mona Lisa, Winged Victory, and glass pyramids.", estimatedCost: 20, category: "activity", duration: "3h" },
        { time: "07:35 PM", title: "Stay at Hotel de Seine", description: "Charming rooms in Saint-Germain-des-Pres.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Champs-Elysees & Arc de Triomphe", description: "Stroll down the grand avenue and visit the rooftop war memorial.", estimatedCost: 12, category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Seine River Cruise Lunch", description: "Delicious gourmet dining on a glass-topped boat cruising the river.", estimatedCost: actCost, category: "food", duration: "2h" },
        { time: "03:30 PM", title: "Montmartre & Sacre-Coeur Walk", description: "Visit the artists' square (Place du Tertre) and the white dome church.", estimatedCost: 5, category: "activity", duration: "3h" },
        { time: "07:35 PM", title: "Stay at Hotel de Seine", description: "Charming rooms in Saint-Germain-des-Pres.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ];
    return list[dayIndex % list.length];
  }

  // Default Generic Premium Fallback
  const list = [
    [
      { time: "09:00 AM", title: `Explore Central ${destination}`, description: `A comprehensive guided tour of iconic city centers and sights in ${destination}.`, estimatedCost: actCost, category: "activity", duration: "3h" },
      { time: "12:30 PM", title: "Local Culinary Secrets", description: "Taste-testing regional gourmet specialties at a top-rated restaurant.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
      { time: "03:00 PM", title: "Art & Culture Shopping Walk", description: "Visit boutique stores, local art galleries, and craft workshops.", estimatedCost: foodCost2, category: "activity", duration: "2.5h" },
      { time: "07:30 PM", title: "Premium Boutique Resort", description: "Relax and rejuvenate in style with full spa and dinner amenities.", estimatedCost: stayCost, category: "stay", duration: "12h" }
    ],
    [
      { time: "09:30 AM", title: "Scenic Nature & Panoramic Points", description: "Guided walk through scenic valleys, forests, or high points of interest.", estimatedCost: actCost, category: "activity", duration: "2.5h" },
      { time: "01:00 PM", title: "Lunch at Riverside/Hill Café", description: "Fine bistro dining with beautiful panoramic views.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
      { time: "03:30 PM", title: "Historic Landmark Exploration", description: "Learn about the heritage, history, and ancient stories of the city.", estimatedCost: 10, category: "activity", duration: "3h" },
      { time: "07:30 PM", title: "Premium Boutique Resort", description: "Relax and rejuvenate in style with full spa and dinner amenities.", estimatedCost: stayCost, category: "stay", duration: "12h" }
    ]
  ];
  return list[dayIndex % list.length];
};

const generateMockItinerary = (destination, startDate, endDate, travelers, interests, budget) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive

  const dailyBudget = Math.round(budget / Math.max(1, diffDays));
  const days = [];

  for (let i = 0; i < diffDays; i++) {
    const currentDate = addDays(startDate, i);
    const dayActivities = getLocalizedActivities(destination, i, dailyBudget);
    days.push({
      date: currentDate,
      activities: dayActivities
    });
  }

  return { days };
};

const generateMockDayActivities = (destination, dayIndex, interests, dailyBudget) => {
  return getLocalizedActivities(destination, dayIndex, dailyBudget);
};

// Call OpenAI helper
const getItineraryFromAI = async (prompt, isSingleDay = false) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing in environment variables.");
  }

  const systemContent = isSingleDay
    ? `You are an expert travel assistant. Generate activities for a single day of a trip.
Return ONLY a valid JSON object matching this schema. Do not write any markdown code blocks, HTML, or conversational text.
Schema:
{
  "activities": [
    {
      "time": "09:00 AM",
      "title": "Activity name",
      "description": "Short engaging description",
      "estimatedCost": 25,
      "category": "stay|food|activity|transport",
      "duration": "2h"
    }
  ]
}`
    : `You are a premium travel planner. Generate a highly detailed day-by-day itinerary.
Return ONLY a valid JSON object matching this schema. Do not write any markdown formatting, code blocks, or explanations.
Schema:
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "time": "09:00 AM",
          "title": "Activity name",
          "description": "Short premium description",
          "estimatedCost": 45,
          "category": "stay|food|activity|transport",
          "duration": "3h"
        }
      ]
    }
  ]
}`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content = response.data.choices[0].message.content.trim();
  return JSON.parse(content);
};

// @desc    Generate full itinerary for a trip
// @route   POST /api/trips/:id/generate-itinerary
// @access  Private
export const generateItinerary = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to modify this trip"));
    }

    const prompt = `Generate a day-by-day travel itinerary for a trip to: "${trip.destination}".
Start date: ${trip.startDate}
End date: ${trip.endDate}
Budget: $${trip.budget} USD (ensure all activities, lodging, and dining costs fit this budget limit)
Travelers: ${trip.travelers}
Interests: ${trip.interests.join(", ")}

The destination might be in India (e.g. Delhi, Kedarnath, Haridwar, Sonprayag, Vizag, Odisha, Kerala, Tamil Nadu, Hyderabad, Goa, Ladakh, Rajasthan, etc.) or any foreign country (e.g. Kyoto, Paris, Switzerland, New York, Bali, etc.).
Make sure to generate highly localized, authentic travel itineraries:
- For Indian destinations: include specific heritage spots/temples (e.g., Kedarnath Temple, Har Ki Pauri in Haridwar, Charminar in Hyderabad, beaches in Vizag, temples/beaches in Odisha, backwaters in Kerala), local stays (ashrams, base camps in Sonprayag, heritage houses, local luxury stays), authentic regional cuisines (like South Indian meals in Tamil Nadu/Kerala, Biryani in Hyderabad, street foods in Delhi), and transit modes (shared mountain jeeps, auto-rickshaws, local trains/metro, taxis).
- For Foreign locations: include local transit (metro, subways, shinkansen, cabs), regional culinary specialties, and iconic sights.
Provide activities for each day from start date to end date. Make it premium and tailored.`;

    let itineraryData = null;
    let attempts = 0;
    let useFallback = false;

    while (attempts < 2) {
      try {
        console.log(`AI Itinerary Generation Attempt ${attempts + 1}...`);
        const rawData = await getItineraryFromAI(prompt, false);
        const sanitized = sanitizeAndValidateItinerary(rawData);
        if (sanitized) {
          itineraryData = sanitized;
          break;
        }
        console.warn("Invalid itinerary schema returned, retrying...");
      } catch (err) {
        console.error(`Attempt ${attempts + 1} failed:`, err.message);
        if (
          err.response?.status === 429 ||
          err.response?.status === 401 ||
          err.message.includes("429") ||
          err.message.includes("quota")
        ) {
          useFallback = true;
          break;
        }
      }
      attempts++;
    }

    if (useFallback || !itineraryData) {
      console.log("Generating premium localized mock itinerary fallback...");
      itineraryData = generateMockItinerary(
        trip.destination,
        trip.startDate,
        trip.endDate,
        trip.travelers,
        trip.interests,
        trip.budget
      );
    }

    // Save itinerary to trip
    trip.days = itineraryData.days;
    trip.status = "generated";
    const updatedTrip = await trip.save();

    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

// @desc    Regenerate a single day in a trip
// @route   POST /api/trips/:id/regenerate-day/:dayIndex
// @access  Private
export const regenerateDay = async (req, res, next) => {
  try {
    const { id, dayIndex } = req.params;
    const idx = parseInt(dayIndex, 10);

    const trip = await Trip.findById(id);
    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to modify this trip"));
    }

    if (isNaN(idx) || idx < 0 || idx >= trip.days.length) {
      res.status(400);
      return next(new Error("Invalid day index"));
    }

    const targetDay = trip.days[idx];

    const prompt = `Regenerate the activities for Day ${idx + 1} of a trip to ${trip.destination}.
Date: ${targetDay.date}
Interests: ${trip.interests.join(", ")}
Budget segment: Daily share is around $${Math.round(trip.budget / trip.days.length)}.
Provide 3-4 premium, engaging travel activities tailored for this day.`;

    let activities = null;
    let attempts = 0;
    let useFallback = false;
    while (attempts < 2) {
      try {
        console.log(`AI Day Regeneration Attempt ${attempts + 1}...`);
        const rawData = await getItineraryFromAI(prompt, true);
        if (rawData && Array.isArray(rawData.activities)) {
          activities = sanitizeActivities(rawData.activities);
          break;
        }
      } catch (err) {
        console.error(`Attempt ${attempts + 1} failed:`, err.message);
        if (
          err.response?.status === 429 ||
          err.response?.status === 401 ||
          err.message.includes("429") ||
          err.message.includes("quota")
        ) {
          useFallback = true;
          break;
        }
      }
      attempts++;
    }

    if (useFallback || !activities || activities.length === 0) {
      console.log("Generating mock fallback activities for day...");
      const dailyBudget = Math.round(trip.budget / trip.days.length);
      activities = generateMockDayActivities(trip.destination, idx, trip.interests, dailyBudget);
    }

    // Replace the activities for that day
    trip.days[idx].activities = activities;
    const updatedTrip = await trip.save();

    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};