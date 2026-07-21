export const destinations = {
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    currency: { code: "EUR", symbol: "€", name: "Euro" },
    timezone: "CET",
    language: "Dutch",
    attractions: [
      { name: "Rijksmuseum", rating: 4.7, description: "World-famous museum housing Dutch Golden Age masterpieces including Rembrandt's Night Watch.", duration: "3-4h", entryFee: "€20", image: "https://images.unsplash.com/photo-1566858852277-49d3d317c16c?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Rijksmuseum+Amsterdam" },
      { name: "Anne Frank House", rating: 4.6, description: "Historic house where Anne Frank wrote her diary during WWII.", duration: "1-2h", entryFee: "€16", image: "https://images.unsplash.com/photo-1574594586541-0e9894f98d2a?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Anne+Frank+House+Amsterdam" },
      { name: "Van Gogh Museum", rating: 4.7, description: "Largest collection of Van Gogh paintings and drawings in the world.", duration: "2-3h", entryFee: "€19", image: "https://images.unsplash.com/photo-1565122547688-3265c1bdc9ec?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Van+Gogh+Museum+Amsterdam" },
      { name: "Vondelpark", rating: 4.5, description: "Amsterdam's largest and most famous urban park, perfect for relaxation.", duration: "1-2h", entryFee: "Free", image: "https://images.unsplash.com/photo-1580211469056-f7a5c09d8782?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Vondelpark+Amsterdam" },
      { name: "Canal Cruise", rating: 4.6, description: "Scenic boat tour through Amsterdam's iconic UNESCO canal ring.", duration: "1-1.5h", entryFee: "€15-25", image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Canal+Cruise" },
      { name: "Dam Square & Royal Palace", rating: 4.4, description: "Historic central square with the Royal Palace and National Monument.", duration: "1-2h", entryFee: "€12.50 (Palace)", image: "https://images.unsplash.com/photo-1565118534354-504456a84493?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Dam+Square+Amsterdam" },
    ],
    hotels: {
      budget: [
        { name: "Stayokay Amsterdam Vondelpark", rating: 4.2, pricePerNight: "€30-50", distance: "1.5km", amenities: ["Free WiFi", "Breakfast", "Lockers", "Common Room"], image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
        { name: "ClinkNOORD Hostel", rating: 4.3, pricePerNight: "€25-45", distance: "2km", amenities: ["Free WiFi", "Bar", "Restaurant", "Games Room"], image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
      ],
      standard: [
        { name: "Hotel Ibis Amsterdam Centre", rating: 4.1, pricePerNight: "€100-150", distance: "0.8km", amenities: ["Free WiFi", "Airport Shuttle", "Bar", "Business Center", "24hr Front Desk"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
        { name: "Novotel Amsterdam City", rating: 4.3, pricePerNight: "€120-180", distance: "2.5km", amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Family Rooms"], image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
      ],
      premium: [
        { name: "Hotel V Nesplein", rating: 4.5, pricePerNight: "€200-350", distance: "0.3km", amenities: ["Free WiFi", "Spa", "Restaurant", "Room Service", "Concierge", "Mini Bar"], image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
        { name: "Conservatorium Hotel", rating: 4.6, pricePerNight: "€350-600", distance: "0.5km", amenities: ["Free WiFi", "Indoor Pool", "Spa", "Gym", "Michelin Restaurant", "Butler Service"], image: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
      ],
      luxury: [
        { name: "Waldorf Astoria Amsterdam", rating: 4.8, pricePerNight: "€600-1200", distance: "0.2km", amenities: ["Free WiFi", "Spa", "Pool", "Michelin Star Restaurant", "Butler", "Private Canal View"], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
        { name: "Hotel De L'Europe", rating: 4.7, pricePerNight: "€500-900", distance: "0.4km", amenities: ["Free WiFi", "Spa", "Pool", "2 Restaurants", "Private Boat Tours", "Concierge"], image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Amsterdam" },
      ],
    },
    transport: {
      flights: [
        { airline: "KLM Royal Dutch Airlines", duration: "9h 15m", price: "₹45,000-65,000", type: "Direct", baggage: "30kg check-in, 12kg cabin" },
        { airline: "Air India", duration: "10h 30m", price: "₹40,000-55,000", type: "Direct", baggage: "25kg check-in, 8kg cabin" },
        { airline: "Emirates", duration: "11h 45m", price: "₹50,000-80,000", type: "1 stop (Dubai)", baggage: "30kg check-in, 7kg cabin" },
        { airline: "Qatar Airways", duration: "12h 30m", price: "₹48,000-75,000", type: "1 stop (Doha)", baggage: "30kg check-in, 7kg cabin" },
        { airline: "Etihad Airways", duration: "13h", price: "₹52,000-78,000", type: "1 stop (Abu Dhabi)", baggage: "30kg check-in, 7kg cabin" },
      ],
      departureAirports: ["Delhi (DEL)", "Mumbai (BOM)", "Bengaluru (BLR)", "Hyderabad (HYD)", "Chennai (MAA)", "Kolkata (CCU)"],
      arrivalAirport: "Amsterdam Schiphol Airport (AMS)",
      localTransport: [
        { type: "Train", details: "Direct from Schiphol to Amsterdam Central in 15-20 mins. €5.60 one-way.", icon: "Train" },
        { type: "Metro", details: "Metro line 52 connects airport to city center. €3.20 one-way.", icon: "Train" },
        { type: "Taxi", details: "24/7 taxi rank at airport. €45-60 to city center. 25-35 mins.", icon: "Car" },
        { type: "Bus", details: "Bus 397 runs every 10 mins to Museumplein. €6.50 one-way.", icon: "Bus" },
        { type: "Bike Rental", details: "OV-fiets bikes at station. €4.45 per 24h. Must have OV-chipkaart.", icon: "Bike" },
      ],
    },
    visa: {
      required: true,
      type: "Schengen Visa",
      documents: ["Valid passport (6+ months validity)", "Visa application form", "Passport-size photos", "Travel insurance (€30,000 min)", "Flight itinerary", "Hotel booking confirmation", "Bank statements (last 6 months)", "Employment letter / NOC", "Cover letter explaining trip purpose"],
      processingTime: "15-30 calendar days",
      fee: "€80 (adult), €40 (child 6-12)",
      officialWebsite: "https://www.netherlandsandyou.nl/visa-for-the-netherlands",
      tips: ["Apply at least 3-4 weeks before travel", "Biometrics required at VFS center", "Interview may be required", "Visa is valid for 90 days within 180-day period", "Travel insurance mandatory with €30,000 minimum coverage"],
    },
    weather: {
      bestSeason: "April to October (spring/summer)",
      spring: { temp: "8-15°C", conditions: "Tulips bloom, mild temperatures, occasional rain" },
      summer: { temp: "17-25°C", conditions: "Warm and sunny, perfect for outdoor activities and canal cruises" },
      autumn: { temp: "10-18°C", conditions: "Mild with colorful foliage, occasional rain" },
      winter: { temp: "0-7°C", conditions: "Cold, possible snow, beautiful Christmas markets" },
      whatToWear: { summer: "Light clothing, sunglasses, comfortable walking shoes, light jacket for evenings", winter: "Warm coat, scarf, gloves, waterproof boots, umbrella", spring: "Layers, light jacket, umbrella, comfortable walking shoes" },
    },
    tips: [
      { icon: "Shield", title: "Avoid Scams", description: "Beware of pickpockets in crowded areas like Dam Square and on trams. Keep valuables secure." },
      { icon: "Train", title: "Best Transport", description: "Get an OV-chipkaart for all public transport. Trams and bikes are the best ways to explore the city." },
      { icon: "Phone", title: "Emergency Numbers", description: "Police: 112 (emergency), 0900-8844 (non-emergency). Tourist Help: +31 20 702 6000." },
      { icon: "MessageSquare", title: "Local Language", description: "Dutch. Key phrases: Hallo (Hello), Dank u (Thank you), Spreekt u Engels? (Do you speak English?)" },
      { icon: "Globe", title: "Cultural Etiquette", description: "Dutch are direct. Always greet with handshake. Tipping 5-10% in restaurants is appreciated." },
      { icon: "Zap", title: "Power Plugs", description: "Type C and F outlets. 230V/50Hz. Same as most of Europe. Bring a universal adapter." },
      { icon: "Wifi", title: "Internet", description: "Free WiFi widely available in cafes, hotels, and public areas. 5G coverage excellent." },
      { icon: "Smartphone", title: "Best Apps", description: "9292 (public transport), Buienalarm (weather), Uber, Thuisbezorgd (food delivery), Google Maps" },
      { icon: "CreditCard", title: "Cash vs Card", description: "Cards widely accepted. Contactless preferred. Some small cafes cash-only. ATMs widely available." },
    ],
  },
  paris: {
    name: "Paris",
    country: "France",
    currency: { code: "EUR", symbol: "€", name: "Euro" },
    timezone: "CET",
    language: "French",
    attractions: [
      { name: "Eiffel Tower", rating: 4.6, description: "Iconic iron lattice tower offering panoramic views of Paris from its three levels.", duration: "2-3h", entryFee: "€11-29", image: "https://images.unsplash.com/photo-1511739001486-6bfe10cef5a3?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Eiffel+Tower+Paris" },
      { name: "Louvre Museum", rating: 4.7, description: "World's largest art museum housing the Mona Lisa, Venus de Milo, and thousands of masterpieces.", duration: "3-5h", entryFee: "€17", image: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Louvre+Museum+Paris" },
      { name: "Sacré-Cœur Basilica", rating: 4.6, description: "Stunning white-domed basilica atop Montmartre hill with breathtaking city views.", duration: "1-2h", entryFee: "Free", image: "https://images.unsplash.com/photo-1590137872588-feb6fffd8cd2?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Sacre+Coeur+Paris" },
      { name: "Musée d'Orsay", rating: 4.7, description: "World's largest collection of Impressionist art housed in a former railway station.", duration: "2-3h", entryFee: "€16", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Musee+d+Orsay+Paris" },
      { name: "Champs-Élysées & Arc de Triomphe", rating: 4.5, description: "Famous avenue lined with shops and cafes leading to Napoleon's triumphal arch.", duration: "2-3h", entryFee: "€13 (Arc rooftop)", image: "https://images.unsplash.com/photo-1567103189669-2b0515e1ba34?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Arc+de+Triomphe+Paris" },
      { name: "Seine River Cruise", rating: 4.5, description: "Romantic boat ride along the Seine passing Notre-Dame, Louvre, and Eiffel Tower.", duration: "1h", entryFee: "€15", image: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Seine+River+Cruise+Paris" },
    ],
    hotels: {
      budget: [{ name: "Generator Paris", rating: 4.3, pricePerNight: "€35-60", distance: "3km", amenities: ["Free WiFi", "Bar", "Co-working", "Restaurant"], image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Paris" }],
      standard: [{ name: "Hotel du Cadran", rating: 4.2, pricePerNight: "€120-200", distance: "1km", amenities: ["Free WiFi", "Airport Shuttle", "Concierge", "Bar"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Paris" }],
      premium: [{ name: "Hotel Regina Louvre", rating: 4.6, pricePerNight: "€300-500", distance: "0.3km", amenities: ["Free WiFi", "Spa", "Restaurant", "Room Service", "Fitness Center"], image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Paris" }],
      luxury: [{ name: "Four Seasons George V", rating: 4.9, pricePerNight: "€800-2000", distance: "1km", amenities: ["Free WiFi", "Spa", "Pool", "Michelin Star Restaurant", "Butler", "Private Courtyard"], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Paris" }],
    },
    visa: {
      required: true, type: "Schengen Visa", documents: ["Valid passport (6+ months)", "Visa application form", "Photos", "Travel insurance (€30,000 min)", "Flight itinerary", "Accommodation proof", "Bank statements (6 months)", "Employment letter", "Cover letter"],
      processingTime: "15-30 days", fee: "€80", officialWebsite: "https://france-visas.gouv.fr",
      tips: ["Apply 4-6 weeks before travel", "Biometrics required", "Visa valid 90 days within 180-day period"],
    },
    weather: { bestSeason: "April-June & September-October", summer: { temp: "20-30°C", conditions: "Warm and sunny, perfect for outdoor cafes" }, winter: { temp: "0-7°C", conditions: "Cold, occasional snow, cozy indoor activities" }, whatToWear: { summer: "Light clothing, comfortable shoes", winter: "Warm coat, scarf, gloves" } },
    tips: [
      { icon: "Shield", title: "Avoid Scams", description: "Beware of petition scams near tourist attractions and pickpockets on metro." },
      { icon: "MessageSquare", title: "Local Language", description: "French. Always say 'Bonjour' before asking anything. 'Parlez-vous anglais?'" },
      { icon: "Zap", title: "Power Plugs", description: "Type E outlets. 230V/50Hz. Bring adapter." },
      { icon: "CreditCard", title: "Cash vs Card", description: "Cards widely accepted. Some small cafes cash-only." },
    ],
  },
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    currency: { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    timezone: "JST",
    language: "Japanese",
    attractions: [
      { name: "Senso-ji Temple", rating: 4.6, description: "Tokyo's oldest temple in Asakusa, famous for its giant red lantern and bustling market street.", duration: "1-2h", entryFee: "Free", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Senso-ji+Temple+Tokyo" },
      { name: "Shibuya Crossing", rating: 4.5, description: "World's busiest pedestrian crossing, a symbol of Tokyo's energy and neon-lit urban culture.", duration: "30min", entryFee: "Free", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Shibuya+Crossing+Tokyo" },
      { name: "Meiji Shrine", rating: 4.6, description: "Peaceful Shinto shrine surrounded by a vast forest in the heart of Tokyo.", duration: "1-2h", entryFee: "Free", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Meiji+Shrine+Tokyo" },
      { name: "Tsukiji Outer Market", rating: 4.4, description: "Famous seafood and street food market with fresh sushi and Japanese delicacies.", duration: "2-3h", entryFee: "Free (food extra)", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Tsukiji+Outer+Market+Tokyo" },
      { name: "Akihabara Electric Town", rating: 4.4, description: "Neon-lit district packed with electronics, anime, manga, and gaming culture.", duration: "2-3h", entryFee: "Free", image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1db?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Akihabara+Tokyo" },
      { name: "Shinjuku Gyoen National Garden", rating: 4.6, description: "Beautiful traditional Japanese garden perfect for cherry blossom viewing and peaceful walks.", duration: "1-2h", entryFee: "¥500", image: "https://images.unsplash.com/photo-1585314614250-d2138bb8b6f5?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Shinjuku+Gyoen+Tokyo" },
    ],
    hotels: {
      budget: [{ name: "Khaosan Tokyo Origami", rating: 4.1, pricePerNight: "¥3,000-5,000", distance: "2km", amenities: ["Free WiFi", "Shared Kitchen", "Common Room", "Lockers"], image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Tokyo" }],
      standard: [{ name: "APA Hotel Shinjuku", rating: 4.0, pricePerNight: "¥8,000-15,000", distance: "0.5km", amenities: ["Free WiFi", "Onsen", "Restaurant", "Laundry"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Tokyo" }],
      premium: [{ name: "Hotel Ryumeikan Tokyo", rating: 4.5, pricePerNight: "¥25,000-40,000", distance: "0.3km", amenities: ["Free WiFi", "Restaurant", "Concierge", "Gym", "Spa"], image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Tokyo" }],
      luxury: [{ name: "The Peninsula Tokyo", rating: 4.8, pricePerNight: "¥80,000-200,000", distance: "1km", amenities: ["Free WiFi", "Spa", "Pool", "Michelin Restaurant", "Butler", "Helipad"], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Tokyo" }],
    },
    visa: {
      required: false, type: "Visa-free (many nationalities)", documents: ["Valid passport (6+ months)", "Return flight ticket"], processingTime: "N/A", fee: "Free",
      officialWebsite: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
      tips: ["Most nationalities get 90 days visa-free", "Must have return ticket", "Register address at hotel (automatic)"],
    },
    weather: { bestSeason: "March-May & October-November", summer: { temp: "25-35°C", conditions: "Hot and humid, rainy season June-July" }, winter: { temp: "0-10°C", conditions: "Cold, clear, dry, occasional snow" }, whatToWear: { summer: "Light breathable clothing, hat, sunscreen", winter: "Warm coat, thermal layers" } },
    tips: [
      { icon: "Shield", title: "Safety", description: "Tokyo is extremely safe. Lost items are usually returned. Night walking is safe." },
      { icon: "Train", title: "Best Transport", description: "Get a Suica or Pasmo IC card for trains, buses, and convenience stores." },
      { icon: "MessageSquare", title: "Local Language", description: "Japanese. Learn: Arigato (Thank you), Sumimasen (Excuse me), Hai (Yes)" },
      { icon: "Zap", title: "Power Plugs", description: "Type A and B outlets. 100V/50Hz. No adapter needed for US devices." },
      { icon: "CreditCard", title: "Cash is King", description: "Many places cash-only. Always carry enough yen. Convenience stores have ATMs." },
      { icon: "Globe", title: "Cultural Etiquette", description: "No tipping. Bow when greeting. Remove shoes before entering homes." },
    ],
  },
  london: {
    name: "London",
    country: "United Kingdom",
    currency: { code: "GBP", symbol: "£", name: "British Pound" },
    attractions: [
      { name: "Tower of London", rating: 4.6, description: "Historic castle on the Thames housing the Crown Jewels.", duration: "2-3h", entryFee: "£33", image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Tower+of+London" },
      { name: "British Museum", rating: 4.7, description: "World's oldest national public museum with 8 million works spanning human history.", duration: "3-5h", entryFee: "Free", image: "https://images.unsplash.com/photo-1582550932936-2291102b0abd?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=British+Museum+London" },
    ],
    hotels: {
      budget: [{ name: "YHA London St Pancras", rating: 4.2, pricePerNight: "£25-45", distance: "1km", amenities: ["Free WiFi", "Breakfast", "Common Room", "Kitchen"], image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=London" }],
      standard: [{ name: "Point A Hotel London Kings Cross", rating: 4.0, pricePerNight: "£80-130", distance: "1km", amenities: ["Free WiFi", "Air Conditioning", "24hr Reception"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=London" }],
      premium: [{ name: "The Hoxton, Holborn", rating: 4.5, pricePerNight: "£200-350", distance: "0.5km", amenities: ["Free WiFi", "Restaurant", "Gym", "Co-working", "Room Service"], image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=London" }],
      luxury: [{ name: "The Ritz London", rating: 4.8, pricePerNight: "£500-1200", distance: "0.3km", amenities: ["Free WiFi", "Spa", "Michelin Restaurant", "Butler", "Afternoon Tea"], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=London" }],
    },
    visa: { required: true, type: "UK Standard Visitor Visa", documents: ["Valid passport", "Application form", "Photos", "Travel insurance", "Flight itinerary", "Accommodation proof", "Bank statements", "Employment letter"], processingTime: "3-6 weeks", fee: "£115", officialWebsite: "https://www.gov.uk/standard-visitor-visa", tips: ["Apply 8-12 weeks before travel", "Biometrics at Visa Application Centre", "May need interview"] },
    weather: { bestSeason: "May-September", summer: { temp: "15-25°C", conditions: "Mild and pleasant, occasional rain" }, winter: { temp: "0-8°C", conditions: "Cold, damp, occasional snow" }, whatToWear: { summer: "Layers, light jacket, umbrella", winter: "Warm coat, scarf, waterproof shoes" } },
    tips: [
      { icon: "Train", title: "Best Transport", description: "Get an Oyster card or contactless card for Tube, buses, trains." },
      { icon: "MessageSquare", title: "Language", description: "English. London is very multicultural." },
      { icon: "CreditCard", title: "Cards Everywhere", description: "Contactless cards widely accepted. Some places no longer take cash." },
    ],
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    currency: { code: "AED", symbol: "AED", name: "UAE Dirham" },
    attractions: [
      { name: "Burj Khalifa", rating: 4.7, description: "World's tallest building at 828m, with observation decks and luxury experiences.", duration: "2-3h", entryFee: "AED 169+", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Burj+Khalifa+Dubai" },
      { name: "Dubai Mall", rating: 4.6, description: "World's largest shopping mall with aquarium, ice rink, and endless retail.", duration: "3-5h", entryFee: "Free", image: "https://images.unsplash.com/photo-1518684079-8435424f2b38?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Dubai+Mall" },
      { name: "Palm Jumeirah Beach", rating: 4.5, description: "Iconic artificial archipelago with luxury resorts, beaches, and Atlantis Hotel.", duration: "3-4h", entryFee: "Free (beach access varies)", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Palm+Jumeirah+Dubai" },
      { name: "Gold Souk", rating: 4.3, description: "Traditional gold market with dazzling displays of jewelry and precious metals.", duration: "1h", entryFee: "Free", image: "https://images.unsplash.com/photo-1582672060674-b3aae2b9c2b5?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Gold+Souk+Dubai" },
    ],
    hotels: {
      budget: [{ name: "Ibis Al Rigga Dubai", rating: 4.0, pricePerNight: "AED 150-250", distance: "3km", amenities: ["Free WiFi", "Pool", "Gym", "Restaurant"], image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Dubai" }],
      standard: [{ name: "Rove City Walk", rating: 4.4, pricePerNight: "AED 300-500", distance: "2km", amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Self-Laundry"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Dubai" }],
      premium: [{ name: "Address Dubai Mall", rating: 4.7, pricePerNight: "AED 800-1500", distance: "0.5km", amenities: ["Free WiFi", "Spa", "Pool", "Gym", "Restaurant", "Burj View"], image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Dubai" }],
      luxury: [{ name: "Burj Al Arab", rating: 4.8, pricePerNight: "AED 5,000-15,000", distance: "5km", amenities: ["Free WiFi", "Private Beach", "Spa", "Pool", "Michelin Restaurant", "Butler", "Helipad"], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Dubai" }],
    },
    visa: { required: true, type: "UAE Tourist Visa", documents: ["Valid passport (6+ months)", "Visa application", "Photos", "Flight itinerary", "Hotel booking", "Bank statement"], processingTime: "3-5 working days", fee: "AED 350-450", officialWebsite: "https://smartservices.icp.gov.ae", tips: ["Indians get visa on arrival in some cases", "Visa valid for 30 days", "Can extend for 30 more days"] },
    weather: { bestSeason: "November-March", summer: { temp: "40-50°C", conditions: "Extremely hot, indoor activities recommended" }, winter: { temp: "20-30°C", conditions: "Pleasant and sunny, perfect for outdoor activities" }, whatToWear: { summer: "Light, loose clothing, sunscreen, sunglasses", winter: "Light layers, comfortable shoes" } },
    tips: [
      { icon: "Shield", title: "Safety", description: "Dubai is extremely safe. Low crime rate. Strict laws enforced." },
      { icon: "CreditCard", title: "Cards Accepted", description: "Cards widely accepted. ATMs everywhere. Tipping 10-15% customary." },
      { icon: "Globe", title: "Cultural Etiquette", description: "Dress modestly in public. No public displays of affection. Ramadan rules apply." },
    ],
  },
  bali: {
    name: "Bali",
    country: "Indonesia",
    currency: { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
    attractions: [
      { name: "Ubud Monkey Forest", rating: 4.4, description: "Sacred monkey sanctuary in lush jungle with temples and playful macaques.", duration: "1-2h", entryFee: "Rp 80,000", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Ubud+Monkey+Forest+Bali" },
      { name: "Tanah Lot Temple", rating: 4.6, description: "Iconic sea temple perched on a rocky outcrop, stunning at sunset.", duration: "1-2h", entryFee: "Rp 60,000", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", mapsLink: "https://www.google.com/maps/search/?api=1&query=Tanah+Lot+Temple+Bali" },
    ],
    hotels: {
      budget: [{ name: "Kuta Bed and Breakfast", rating: 4.0, pricePerNight: "Rp 150,000-300,000", distance: "1km", amenities: ["Free WiFi", "Pool", "Breakfast"], image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Bali" }],
      standard: [{ name: "Alaya Resort Ubud", rating: 4.5, pricePerNight: "Rp 800,000-1,500,000", distance: "1km", amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Yoga"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Bali" }],
      luxury: [{ name: "Amandari Ubud", rating: 4.8, pricePerNight: "Rp 15,000,000-30,000,000", distance: "0.5km", amenities: ["Free WiFi", "Spa", "Pool", "Michelin Dining", "Private Villas", "Yoga"], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", bookingLink: "https://www.booking.com/searchresults.html?ss=Bali" }],
    },
    visa: { required: false, type: "Visa-free (many nationalities) / Visa on Arrival", documents: ["Valid passport (6+ months)", "Return ticket", "Hotel booking"], processingTime: "On arrival", fee: "Free / $35 (VOA)", officialWebsite: "https://www.imigrasi.go.id", tips: ["Many nationalities get 30 days visa-free", "Can extend 30 days", "Must have return ticket"] },
    weather: { bestSeason: "April-October (dry season)", summer: { temp: "25-33°C", conditions: "Humid, sunny" }, winter: { temp: "24-30°C", conditions: "Rainy season Nov-Mar" }, whatToWear: { summer: "Light clothing, swimwear, sunscreen" } },
    tips: [
      { icon: "MessageSquare", title: "Language", description: "Indonesian/Balinese. Learn: 'Terima kasih' (Thank you)" },
      { icon: "Shield", title: "Stay Safe", description: "Beware of monkeys stealing items. Use reputable tour guides." },
      { icon: "CreditCard", title: "Cash Preferred", description: "Cash is king in Bali. Cards at major hotels only." },
    ],
  },
};

export const countryCurrencyMap = {
  "india": { code: "INR", symbol: "₹", name: "Indian Rupee" },
  "japan": { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  "united kingdom": { code: "GBP", symbol: "£", name: "British Pound" },
  "united states": { code: "USD", symbol: "$", name: "US Dollar" },
  "netherlands": { code: "EUR", symbol: "€", name: "Euro" },
  "france": { code: "EUR", symbol: "€", name: "Euro" },
  "germany": { code: "EUR", symbol: "€", name: "Euro" },
  "italy": { code: "EUR", symbol: "€", name: "Euro" },
  "spain": { code: "EUR", symbol: "€", name: "Euro" },
  "uae": { code: "AED", symbol: "AED", name: "UAE Dirham" },
  "dubai": { code: "AED", symbol: "AED", name: "UAE Dirham" },
  "australia": { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  "canada": { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  "thailand": { code: "THB", symbol: "฿", name: "Thai Baht" },
  "indonesia": { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  "bali": { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  "singapore": { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  "switzerland": { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  "turkey": { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  "south korea": { code: "KRW", symbol: "₩", name: "South Korean Won" },
  "vietnam": { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
  "malaysia": { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  "egypt": { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
  "brazil": { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  "mexico": { code: "MXN", symbol: "$", name: "Mexican Peso" },
  "new zealand": { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  "south africa": { code: "ZAR", symbol: "R", name: "South African Rand" },
};

export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  JPY: 1.8,
  AED: 0.044,
  IDR: 186,
  THB: 0.44,
  SGD: 0.016,
  CHF: 0.011,
  TRY: 0.39,
  KRW: 16,
  VND: 305,
  MYR: 0.056,
  EGP: 0.37,
  BRL: 0.072,
  MXN: 0.24,
  NZD: 0.020,
  ZAR: 0.23,
  AUD: 0.018,
  CAD: 0.016,
};

export const getDestData = (destination) => {
  const dest = destination?.toLowerCase().trim() || "";
  if (!dest) return null;
  const keys = Object.keys(destinations);
  for (const key of keys) {
    if (dest.includes(key)) return { ...destinations[key], key };
  }

  // Worldwide Dynamic Fallback Generator for any destination on Earth
  const titleName = destination.charAt(0).toUpperCase() + destination.slice(1);
  const currencyInfo = getCurrencyInfo(destination);

  return {
    name: titleName,
    country: titleName + " Region",
    currency: currencyInfo,
    timezone: "UTC",
    language: "Local & English",
    attractions: [
      {
        name: `${titleName} City Center & Main Square`,
        rating: 4.7,
        description: `Explore the vibrant heart of ${titleName}, featuring historic architecture, local markets, and cultural landmarks.`,
        duration: "2-3h",
        entryFee: "Free",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(titleName)}+City+Center`
      },
      {
        name: `${titleName} Heritage Museum & Gallery`,
        rating: 4.6,
        description: `Immerse yourself in ${titleName}'s local history, ancient artifacts, and traditional art collections.`,
        duration: "2-3h",
        entryFee: `${currencyInfo.symbol}15`,
        image: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=400&q=80",
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(titleName)}+Museum`
      },
      {
        name: `${titleName} National Botanical Gardens & Park`,
        rating: 4.8,
        description: `Relax in scenic green parks, botanical gardens, and scenic walking trails around ${titleName}.`,
        duration: "1-2h",
        entryFee: "Free",
        image: "https://images.unsplash.com/photo-1580211469056-f7a5c09d8782?w=400&q=80",
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(titleName)}+Park`
      },
      {
        name: `${titleName} Central Night Market & Shopping District`,
        rating: 4.5,
        description: `Bustling local market famous for authentic street food, local handicrafts, souvenirs, and nightlife.`,
        duration: "2-4h",
        entryFee: "Free",
        image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=400&q=80",
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(titleName)}+Market`
      },
      {
        name: `${titleName} Scenic Viewpoint & Observation Deck`,
        rating: 4.7,
        description: `Panoramic rooftop and mountain viewpoint offering breathtaking skyline views of ${titleName}.`,
        duration: "1-2h",
        entryFee: `${currencyInfo.symbol}10`,
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10cef5a3?w=400&q=80",
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(titleName)}+Viewpoint`
      },
      {
        name: `${titleName} Waterfront & Harbor Promenade`,
        rating: 4.6,
        description: `Beautiful waterside promenade ideal for sunset walks, boat tours, and dining by the water.`,
        duration: "2h",
        entryFee: "Free",
        image: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=400&q=80",
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(titleName)}+Waterfront`
      }
    ],
    hotels: {
      budget: [
        {
          name: `${titleName} Central Hostel & Inn`,
          rating: 4.3,
          pricePerNight: `${currencyInfo.symbol}25-45`,
          distance: "1.2km",
          amenities: ["Free WiFi", "Breakfast", "Lockers", "Common Room"],
          image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80",
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(titleName)}`
        },
        {
          name: `Backpackers Haven ${titleName}`,
          rating: 4.2,
          pricePerNight: `${currencyInfo.symbol}20-35`,
          distance: "1.8km",
          amenities: ["Free WiFi", "Bar", "Laundry"],
          image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(titleName)}`
        }
      ],
      standard: [
        {
          name: `${titleName} Grand City Hotel`,
          rating: 4.4,
          pricePerNight: `${currencyInfo.symbol}80-130`,
          distance: "0.8km",
          amenities: ["Free WiFi", "Airport Shuttle", "Restaurant", "24hr Front Desk"],
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(titleName)}`
        },
        {
          name: `Comfort Suites ${titleName}`,
          rating: 4.3,
          pricePerNight: `${currencyInfo.symbol}90-140`,
          distance: "1.5km",
          amenities: ["Free WiFi", "Gym", "Breakfast", "Bar"],
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(titleName)}`
        }
      ],
      premium: [
        {
          name: `Royal ${titleName} Resort & Spa`,
          rating: 4.7,
          pricePerNight: `${currencyInfo.symbol}180-280`,
          distance: "0.5km",
          amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Room Service"],
          image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80",
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(titleName)}`
        }
      ],
      luxury: [
        {
          name: `The Ritz-Carlton ${titleName}`,
          rating: 4.9,
          pricePerNight: `${currencyInfo.symbol}350-700`,
          distance: "0.2km",
          amenities: ["Free WiFi", "Infinity Pool", "Michelin Restaurant", "Butler Service", "Spa"],
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80",
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(titleName)}`
        }
      ]
    },
    transport: {
      flights: [
        {
          airline: "International Airways",
          duration: "7h 30m",
          price: "₹38,000-55,000",
          type: "Direct",
          baggage: "30kg check-in, 8kg cabin"
        },
        {
          airline: "Emirates / Qatar Airways",
          duration: "10h 15m",
          price: "₹45,000-65,000",
          type: "1 stop",
          baggage: "30kg check-in, 7kg cabin"
        }
      ],
      departureAirports: ["Delhi (DEL)", "Mumbai (BOM)", "Bengaluru (BLR)"],
      arrivalAirport: `${titleName} International Airport`,
      localTransport: [
        { type: "Train", details: `Direct Airport Express to ${titleName} station. Fast & affordable.`, icon: "Train" },
        { type: "Metro", details: "City metro line connects airport to central hotels.", icon: "Train" },
        { type: "Taxi", details: `24/7 official taxi stand at ${titleName} airport arrival terminal.`, icon: "Car" },
        { type: "Bus", details: "Express shuttle buses run every 15 minutes to city center.", icon: "Bus" }
      ]
    },
    visa: {
      required: true,
      type: "Tourist Entry Visa / E-Visa",
      documents: [
        "Valid passport (6+ months validity)",
        "Completed online application",
        "Passport photos",
        "Return flight ticket",
        "Hotel booking confirmation",
        "Travel insurance policy"
      ],
      processingTime: "5-15 working days",
      fee: "$50-100",
      officialWebsite: "https://www.google.com/search?q=" + encodeURIComponent(titleName + " official visa portal"),
      tips: [
        "Apply at least 2-3 weeks before departure",
        "Keep digital and printed copies of all documents",
        "Ensure passport has at least 2 blank pages"
      ]
    },
    weather: {
      bestSeason: "October to April (Mild & Pleasant)",
      spring: { temp: "15-22°C", conditions: "Mild and sunny, great for sightseeing" },
      summer: { temp: "25-32°C", conditions: "Warm and bright, perfect for outdoor excursions" },
      autumn: { temp: "16-24°C", conditions: "Pleasant temperatures with low rain" },
      winter: { temp: "5-14°C", conditions: "Cooler weather, lightweight jacket recommended" },
      whatToWear: {
        summer: "Light breathable clothing, sunglasses, comfortable walking shoes",
        winter: "Warm layers, jacket, comfortable boots",
        spring: "Casual layers, light jacket, umbrella"
      }
    },
    tips: [
      { icon: "Shield", title: "Safety Advice", description: `Keep valuables secure in crowded tourist spots around ${titleName}.` },
      { icon: "Train", title: "Public Transport Pass", description: "Buy a local reloadable transit card for cheaper metro and bus fares." },
      { icon: "Phone", title: "Emergency SOS", description: "Universal emergency number 112 / 911 for police and medical help." },
      { icon: "CreditCard", title: "Payment Norms", description: "Credit cards widely accepted. Keep small local cash for street markets." },
      { icon: "Smartphone", title: "Useful Apps", description: "Google Maps, Google Translate, local ride-hailing apps (Uber/Grab/Bolt)." }
    ]
  };
};

export const getCurrencyInfo = (destination) => {
  const dest = destination?.toLowerCase().trim() || "";
  for (const key of Object.keys(countryCurrencyMap)) {
    if (dest.includes(key)) return countryCurrencyMap[key];
  }
  return { code: "USD", symbol: "$", name: "US Dollar" };
};

export const visaGuidance = {
  schengen: {
    required: true,
    name: "Schengen Visa",
    documents: [
      "Valid passport with 6+ months validity",
      "Completed visa application form",
      "2 recent passport-size photographs",
      "Travel medical insurance (€30,000 min coverage)",
      "Round-trip flight itinerary",
      "Hotel/accommodation booking confirmation",
      "Bank statements for last 6 months",
      "Employment letter / No Objection Certificate",
      "Income Tax Returns (last 2 years)",
      "Cover letter explaining trip purpose",
      "Proof of sufficient funds (€50-100 per day)",
    ],
    processingTime: "15-30 calendar days",
    fee: "€80 (adult) / €40 (child 6-12)",
    officialWebsite: "https://travel-europe.europa.eu/visa-policy_en",
    tips: [
      "Apply at least 4-6 weeks before your planned travel date",
      "Biometric data (fingerprints + photo) required at VFS center",
      "Appointment booking is mandatory - slots fill up fast",
      "Valid for maximum 90 days in any 180-day period",
      "Insurance must cover repatriation and emergency medical",
      "Submit authenticated copies of all documents",
      "Some countries may require personal interview",
    ],
  },
  uk: {
    required: true,
    name: "UK Standard Visitor Visa",
    documents: [
      "Valid passport with 6+ months validity",
      "Online visa application printout",
      "Passport-size photographs",
      "Travel history (previous visas, stamps)",
      "Flight itinerary (paid or on-hold)",
      "Hotel booking confirmations",
      "Bank statements for last 6 months",
      "Pay slips for last 3 months",
      "Employment letter with leave approval",
      "ITR / Form 16 for income proof",
    ],
    processingTime: "3-6 weeks",
    fee: "£115",
    officialWebsite: "https://www.gov.uk/standard-visitor-visa",
    tips: [
      "Apply 8-12 weeks before travel",
      "Biometrics at UK Visa Application Centre",
      "May require interview at embassy",
      "Visa typically valid for 6 months",
      "Long-term visas available (2, 5, 10 years)",
      "Provide complete travel itinerary",
    ],
  },
  japan: {
    required: false,
    name: "Visa-free / E-Visa (subject to nationality)",
    documents: ["Valid passport with 6+ months validity", "Return flight ticket", "Hotel booking confirmation"],
    processingTime: "Varies by nationality",
    fee: "Free (visa-free) / Varies (e-visa)",
    officialWebsite: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    tips: ["Many nationalities get 90 days visa-free", "Must have onward/return ticket", "Hotel registration done automatically"],
  },
  uae: {
    required: true,
    name: "UAE Tourist Visa",
    documents: ["Valid passport with 6+ months validity", "Passport-size photo", "Flight itinerary", "Hotel booking", "Bank statement"],
    processingTime: "3-5 working days",
    fee: "AED 350-450",
    officialWebsite: "https://smartservices.icp.gov.ae",
    tips: ["Indians with US/UK visas can get visa on arrival", "Visa valid for 30 or 60 days", "Visa extension possible for 30 days"],
  },
  thailand: {
    required: false,
    name: "Visa on Arrival / Visa-free",
    documents: ["Valid passport with 6+ months validity", "Return flight ticket", "Hotel booking", "2 photos", "Proof of funds"],
    processingTime: "On arrival",
    fee: "Free (visa-free) / ฿2,000 (VOA)",
    officialWebsite: "https://www.immigration.go.th",
    tips: ["Many nationalities get 30-45 days visa-free", "VOA queue can be long at peak times", "Fast-track available at extra cost"],
  },
  turkey: {
    required: false,
    name: "E-Visa / Visa-free",
    documents: ["Valid passport with 6+ months validity", "E-visa printout"],
    processingTime: "Instant (e-visa)",
    fee: "$35 (e-visa)",
    officialWebsite: "https://www.evisa.gov.tr",
    tips: ["Many nationalities get e-visa online", "Visa-free for select countries", "E-visa valid for 90 days"],
  },
  australia: {
    required: true,
    name: "Australia ETA (Subclass 601) / Visitor Visa",
    documents: ["Valid passport with 6+ months validity", "Online application", "Passport photo", "Employment details"],
    processingTime: "1-14 days",
    fee: "AUD 20 (ETA) / AUD 190 (Visitor)",
    officialWebsite: "https://immi.homeaffairs.gov.au",
    tips: ["ETA available for select passport holders", "Visitor visa for longer stays", "Biometrics may be required"],
  },
};

export const generalTravelTips = [
  { icon: "Shield", title: "Avoid Tourist Scams", description: "Use official taxis, verify tour operators, beware of 'free' walking tours that charge at the end." },
  { icon: "Train", title: "Best Public Transport", description: "Research city passes (Oyster, Suica, Navigo) for unlimited travel savings. Always validate tickets." },
  { icon: "Phone", title: "Emergency Numbers", description: "SOS: 112 (Europe), 911 (US), 100 (India), 110 (Japan/China). Save local embassy number." },
  { icon: "MessageSquare", title: "Language Basics", description: "Learn key phrases: Hello, Thank you, How much?, Where is?, Do you speak English? in local language." },
  { icon: "Globe", title: "Cultural Etiquette", description: "Research local customs: tipping norms, dress codes, greetings, photography rules at religious sites." },
  { icon: "Zap", title: "Power Plugs", description: "Carry a universal adapter. Check voltage (110V vs 230V) for electronics. Use surge protector." },
  { icon: "Wifi", title: "Internet Access", description: "Get eSIM (Airalo, Holafly) for instant data. Portable WiFi devices available at airports." },
  { icon: "Smartphone", title: "Best Travel Apps", description: "Google Maps, Google Translate, Uber/Bolt, XE Currency, TripIt, Rome2Rio, Hostelworld." },
  { icon: "CreditCard", title: "Cash vs Card", description: "Carry local currency. Notify bank of travel. Keep backup card separate. Cards preferred in cities." },
  { icon: "Umbrella", title: "Packing Essentials", description: "Universal adapter, portable charger, reusable water bottle, packing cubes, first-aid kit, travel pillow." },
  { icon: "Thermometer", title: "Health & Safety", description: "Check required vaccinations. Travel insurance mandatory for Schengen. Carry basic medicines." },
  { icon: "CheckCircle", title: "Pre-Departure Checklist", description: "Passport valid 6+ months, visa obtained, travel insurance, copies of documents, inform bank." },
  { icon: "Clock", title: "Time Management", description: "Arrive 3h before international flights. Account for jet lag. Don't overpack your daily itinerary." },
  { icon: "DollarSign", title: "Budget Tips", description: "Eat where locals eat. Use public transport. Free walking tours. City cards for attraction discounts." },
];

export const bestSeasons = {
  "netherlands": { season: "April-October", description: "Spring tulips (Apr-May) and mild summers (Jun-Aug) are ideal. Autumn has beautiful foliage." },
  "france": { season: "April-June & September-October", description: "Spring and fall offer mild weather, fewer crowds, and beautiful scenery." },
  "japan": { season: "March-May & October-November", description: "Cherry blossoms in spring and autumn colors. Avoid summer heat and humidity." },
  "india": { season: "October-March", description: "Cool, dry season ideal for most regions. Avoid monsoon (Jul-Sep) and summer heat (Apr-Jun)." },
  "uae": { season: "November-March", description: "Pleasant temperatures for outdoor activities. Summer (Jun-Sep) extremely hot (40-50°C)." },
  "united kingdom": { season: "May-September", description: "Mild and pleasant summer. Spring has blooming gardens. Winter is cold and damp." },
  "thailand": { season: "November-February", description: "Cool and dry season. March-May is hot. June-October is rainy season." },
  "indonesia": { season: "April-October", description: "Dry season with sunny days and lower humidity. November-March is rainy season." },
  "turkey": { season: "April-June & September-November", description: "Spring and fall offer comfortable temperatures. Summer can be very hot in coastal areas." },
  "australia": { season: "March-May & September-November", description: "Spring and fall offer mild weather. Avoid extreme summer (Dec-Feb) heat." },
};
