import React, { useState } from "react";
import Navbar from "./Header";

const AgriStore = () => {
  const products = [
    {
      name: "Hybrid Sweet Corn Seeds",
      type: "Seeds",
      description:
        "High-quality hybrid sweet corn seeds offering better yield and disease resistance. Suitable for all soil types with early harvesting advantage.",
      price: "₹250 / 100g pack",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/rudraksh-sweet-corn-sweet-100-file-9768.jpg?v=1737442467&width=1080",
      buyLink: "https://www.bighaat.com/products/rudraksh-sweet-corn-sweet-100?pf=search",
    },
    {
      name: "Balwaan Bs-20 Krishi Single Motor Battery Sprayer",
      type: "Farm Machinery",
      description:
        "This sprayer has multiple applications and is widely used in agriculture, horticulture, sericulture, plantations, forestry, gardens, institutions, universities, etc. Suitable for spraying weedicides, Insecticides, and water-soluble medicines on crops, sanitizing infected objects, etc.",
      price: "₹3400",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/balwaan-shakti-battery-sprayer-12x8-file-7234.jpg?v=1737436843&width=1080",
      buyLink: "https://www.bighaat.com/products/balwaan-shakti-battery-sprayer-12x8?pf=agriImplements",
    },
    {
      name: "Katyayani Activated Neem Oil Bio Pesticide",
      type: "Pesticides",
      description:
        "Natural neem oil-based pesticide. Safe for crops, pets, and environment. Helps eliminate aphids, mites, and fungal infections.",
      price: "₹329 / ML",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/katyayani-activated-neem-oil-bio-pesticide-file-9952.jpg?v=1737441767&width=640",
      buyLink: "https://www.bighaat.com/products/katyayani-activated-neem-oil-bio-pesticide?pf=search",
    },
    {
      name: "NEPTUNE GARDEN MINI POWER CULTIVATOR",
      type: "Farm Machinery",
      description:
        "Tiller/Cultivator/Rotary/Weeder quickly breaks up the dirt & hard clay soil to prepare it for planting. It has dual rotary tines that digs in large or narrow spaces to flip soil thoroughly. An innovative transmission design and powerful 2 stroke petrol engine makes this small tiller deliver heavy-duty performance. A multipurpose machine to make digging, rototilling & weeding fast, easy & fun.",
      price: "₹20,099",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/nc-52-top-file-6343.jpg?v=1737434181&width=1080",
      buyLink: "https://www.bighaat.com/products/nc-52-top?pf=agriImplements",
    },
    {
      name: "IRIS HYBRID F1 MALLIKA WATERMELON",
      type: "Seeds",
      description:
        "Certified watermelon seeds with high germination rate and better drought tolerance. Suitable for all Indian regions.",
      price: "₹515 / 50g",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/iris-hybrid-f1-mallika-watermelon-file-13072.webp?v=1737475663&width=1080",
      buyLink: "https://www.bighaat.com/products/iris-hybrid-f1-mallika-watermelon?pf=search",
    },
    {
      name: "POWER WEEDER (BP-700 7HP)",
      type: "Farm Machinery",
      description:
        "Balwaan Power Weeder BP-700 machine is basically used to do tillering /weeding operations in the field. It is basically used for soil preparation, Inter-cultivation, turning the soil, loosening the soil for better aeration and weeding. Heavy-duty rotavator for efficient soil preparation. Helps in mixing residues and improving soil health.",
      price: "₹58,000",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/balwaan-7-hp-agricultural-power-weeder-bp-700-implements-file-11380.jpg?v=1737446322&width=1080",
      buyLink: "https://www.bighaat.com/products/balwaan-7-hp-agricultural-power-weeder-bp-700-implements?pf=agriImplements",
    },
    {
      name: "Caldan 50 SP Insecticide",
      type: "Insecticide",
      description:
        "Caldan 50 sp Insecticide is an insecticide of Nereistoxin analogue group, which gives effective control on insects' pests. It has remarkable capacity to control biting, chewing and sucking types of insects.",
      price: "₹1,721",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/caldan-50-sp-insecticide-file-2776.png?v=1737436023&width=1080",
      buyLink: "https://www.bighaat.com/products/caldan-50-sp-insecticide?pf=insecticides",
    },
    {
      name: "EBS AZOSPIRILLUM FERTILIZER",
      type: "Fertilizers",
      description:
        "Azospirillum spp. i s a bio-fertilizer-based strain of Nitrogen-fixing bacteria. It is a free-living nitrogen-fixing bacteria, that lives freely in the soil, and multiplies by using organic matter, as the source of carbon (energy) for its growth and existence. The process of biological nitrogen fixation makes it available to plants in an easily utilizable form.",
      price: "₹482 / 1 L",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/ebs-azospirillum-nitrogen-fixing-bio-fertilizer-file-16959.png?v=1737479287&width=1080",
      buyLink: "https://www.bighaat.com/products/ebs-azospirillum-nitrogen-fixing-bio-fertilizer?pf=search",
    },
    {
      name: "WAVAR MANUAL SEEDER",
      type: "Farm Tools",
      description:
        "Introducing the Wavar 12 Agricultural Hand Push Plant Seeder, designed for efficient and precise seed planting. This manual seeder is ideal for sowing a variety of seeds including soybean, cotton, maize, peanut, and chickpea. With its user-friendly design and adjustable spacing, it simplifies the seeding process, making it faster and more accurate compared to manual methods. The 12-row seed box ensures uniform seed distribution, while the ergonomic handle provides comfortable operation, enhancing productivity for small to medium-sized agricultural operations.",
      price: "₹6,400",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/wavar-manual-seeder-file-16417.png?v=1737453691&width=1080",
      buyLink: "https://www.bighaat.com/products/wavar-manual-seeder?pf=search",
    },
    {
      name: "BHUMI TRIDEV",
      type: "Pesticides",
      description:
        "Bhumi Tridev is an organic plant growth promoter containing plant hormones like Cytokinin, Auxins, Enzymes, Gibberellins, and many more Micronutrients. It is a mixture that serves all types of crops and other vegetables necessary.",
      price: "₹880 / Litre",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/bhumi-tridev-file-16065.webp?v=1737478699&width=1080",
      buyLink: "https://www.bighaat.com/products/bhumi-tridev?pf=plantNutrition",
    },
    {
      name: "SIDDHI 7HP TILLER",
      type: "Farm Machinery",
      description:
        "This heavy-duty petrol-powered tiller (7 HP power) is ideal for use in wet, dry, and muddy soil. Its tilling width is adjustable from 18 to 40 inches ((45.72~101.6 cm) Approx), and it can till up to 3 to 9 inches ((7.62~22.86 cm) Approx) deep. Its speed is 3600 rpm, and it has three gears: one for forward and one for reverse. Fuel consumption ranges from 550 to 650 ml per hour, depending on usage.",
      price: "₹34,000",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/siddhi-7hp-powertiller-file-21321.png?v=1747136351&width=1080",
      buyLink: "https://www.bighaat.com/products/siddhi-powertiller-7-hp?pf=search",
    },
    {
      name: "ECOWEALTH VIRAJ 35 CHAFF CUTTER",
      type: "Farm Machinery",
      description:
        "Fodder plays an important role in animal rearing. Animal husbandry is always facing scarcity of fodder due to uncertain environmental conditions and reduced availability of land for cultivation. This needs to utilize the available fodder meticulously. Chopping of fodder by Chaff cutter reduces about 30% wastage. It also increases the digestion of animals which helps to improve health. Ultimately increases production capacity viz. milk, draught and meat of animals.",
      price: "₹40,625",
      image: "https://cdn.shopify.com/s/files/1/0722/2059/files/viraj-35-chaff-cutter-3-hp-3ph-motor-file-9236.jpg?v=1737441122&width=1080",
      buyLink: "https://www.bighaat.com/products/viraj-35-chaff-cutter-3-hp-3ph-motor?pf=agriImplements",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <div className="min-h-screen overflow-y-hidden sticky bg-gradient-to-b from-[#50ff73] to-[#fafcfa] ">
      <div className="">
        <Navbar/>
      </div>
      <div className="min-h-screen bg-gradient-to-t from-[#50ff73] to-[#fafcfa] shadow-xl grid grid-cols-1 lg:grid-cols-3 overflow-hidden border border-gray-200">
        
        {/* Left Section - Product List */}
        <div className="lg:col-span-1 bg-gradient-to-b from-[#50ff73] to-[#fafcfa] p-6 border-r border-gray-200 w-full">
          <h2 className="text-3xl font-semibold mb-6 text-green-800">🌾Agri Products</h2>
          <ul className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
            {products.map((product, index) => (
              <li
                key={index}
                onClick={() => setSelectedProduct(product)}
                className={`flex items-center gap-4 p-2 rounded-md cursor-pointer transition-all duration-200 ${
                  selectedProduct.name === product.name
                    ? "bg-green-200 shadow-inner"
                    : "bg-white shadow-sm hover:bg-green-100"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-md border border-gray-200"
                />
                <div>
                  <p className="font-medium text-base">{product.name}</p>
                  <span className="text-sm text-gray-500">{product.type}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Product Details */}
        <div className="lg:col-span-2 p-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full lg:w-80 h-auto rounded-2xl shadow-md border"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>
              <div className="text-2xl font-bold text-green-700 mb-8">
                {selectedProduct.price}
              </div>
              <a
                href={selectedProduct.buyLink}
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl transition"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5f4e3;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9fc99d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6aaa6a;
        }
      `}</style>
    </div>
  );
};

export default AgriStore;
