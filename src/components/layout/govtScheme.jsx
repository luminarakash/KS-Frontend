import React, { useState } from "react";
import WImg from "../../assets/P1.png";
import Navbar from "./Header";

const schemes = [
  { id: 1, title: "Pradhan Mantri Fasal Bima Yojana" },
  { id: 2, title: "Soil Health Card Scheme" },
  { id: 3, title: "PM-Kisan Samman Nidhi" },
  { id: 4, title: "National Agriculture Market (e-NAM)" },
  { id: 5, title: "Rashtriya Krishi Vikas Yojana (RKVY)" },
  { id: 6, title: "Paramparagat Krishi Vikas Yojana (PKVY)" },
  { id: 7, title: "Micro Irrigation Fund (MIF)" },
  { id: 8, title: "Kisan Credit Card (KCC)" },
  { id: 9, title: "National Mission on Sustainable Agriculture (NMSA)" },
  { id: 10, title: "Gramin Bhandaran Yojana" },
  { id: 11, title: "Agricultural Technology Management Agency (ATMA)" },
  { id: 12, title: "Sub-Mission on Agricultural Mechanization (SMAM)" },
  { id: 13, title: "Mera Gaon Mera Gaurav" },
  { id: 14, title: "National Food Security Mission (NFSM)" },
  { id: 15, title: "Integrated Scheme for Agricultural Marketing (ISAM)" },
  { id: 16, title: "Livestock Health & Disease Control Scheme" },
  { id: 17, title: "Blue Revolution (Fisheries)" },
  { id: 18, title: "Agricultural Insurance Infrastructure Fund" },
  { id: 19, title: "PM Krishi Sinchayee Yojana (PMKSY)" },
  { id: 20, title: "Electronic National Agriculture Market (eNAM)" },
];

const schemeDetails = {
  1: {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: `
Launched in 2016, PMFBY provides insurance coverage and financial support to farmers in the event of crop failure due to natural calamities, pests, and diseases.

Key Features:
- Low premium rates: 2% for Kharif, 1.5% for Rabi, and 5% for horticultural/commercial crops.
- Technology use for yield estimation and claim settlement.
- Coverage from pre-sowing to post-harvest losses.

Objective:
To stabilize the income of farmers and encourage modern agricultural practices.
    `,
    infoLink: "https://pmfby.gov.in",
  },
  2: {
    title: "Soil Health Card Scheme",
    description: `
Introduced in 2015 to promote balanced use of fertilizers and improve soil fertility.

Key Features:
- Provides crop-wise nutrient recommendations to farmers.
- Soil testing every 2 years.
- Helps reduce overuse of fertilizers and increase productivity.

Objective:
To guide farmers in maintaining soil health and fertility for sustainable agriculture.
    `,
    infoLink: "https://soilhealth.dac.gov.in",
  },
  3: {
    title: "PM-Kisan Samman Nidhi",
    description: `
Launched in 2019, this scheme offers ₹6,000 per year to farmers in three equal installments.

Key Features:
- Direct bank transfers to landholding farmers.
- Simple online registration with land record verification.
- Benefit to over 12 crore farmer families.

Objective:
To support farmers in managing agricultural expenses and household needs.
    `,
    infoLink: "https://pmkisan.gov.in",
  },
  4: {
    title: "National Agriculture Market (e-NAM)",
    description: `
An online trading platform that links existing APMCs to create a unified national agricultural market.

Key Features:
- Online bidding and transparent price discovery.
- Farmers can sell their produce to buyers nationwide.
- Integration of 1,000+ mandis across India.

Objective:
To provide a better marketing platform and eliminate middlemen exploitation.
    `,
    infoLink: "https://enam.gov.in",
  },
  5: {
    title: "Rashtriya Krishi Vikas Yojana (RKVY)",
    description: `
Launched in 2007 to ensure holistic agricultural development.

Key Features:
- Provides financial support to states based on agricultural performance.
- Encourages innovation and infrastructure development.
- Promotes agripreneurship.

Objective:
To incentivize investment in agriculture and achieve 4% annual growth.
    `,
    infoLink: "https://rkvy.da.gov.in",
  },
  6: {
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description: `
PKVY promotes organic farming through cluster-based approaches.

Key Features:
- Clusters of 50 farmers and 50 acres.
- Certification under Participatory Guarantee System (PGS).
- Financial assistance for organic inputs and marketing.

Objective:
To promote sustainable farming without chemical inputs.
    `,
    infoLink: "https://www.myscheme.gov.in/schemes/pkvy",
  },
  7: {
    title: "Micro Irrigation Fund (MIF)",
    description: `
A scheme by NABARD to support micro-irrigation.

Key Features:
- Drip and sprinkler irrigation for water conservation.
- Subsidy and loan support to farmers.
- Promotes precision farming.

Objective:
To improve irrigation efficiency and boost productivity.
    `,
    infoLink: "https://www.nabard.org/content1.aspx?catid=8&id=1720&mid=8",
  },
  8: {
    title: "Kisan Credit Card (KCC)",
    description: `
Provides farmers access to affordable credit.

Key Features:
- Short-term loans at subsidized interest (up to 4%).
- Covers crop loan, post-harvest, and allied activities.
- Credit limit linked to landholding and crop pattern.

Objective:
To reduce dependency on informal loans and empower farmers.
    `,
    infoLink: "https://www.myscheme.gov.in/schemes/kcc",
  },
  9: {
    title: "National Mission on Sustainable Agriculture (NMSA)",
    description: `
Part of National Action Plan on Climate Change, NMSA promotes climate-resilient agriculture.

Key Features:
- Rainfed area development, soil health, and water-use efficiency.
- Integrated farming systems.
- Encourages conservation and adaptation techniques.

Objective:
To make Indian agriculture more sustainable and climate adaptive.
    `,
    infoLink: "https://nmsa.dac.gov.in",
  },
  10: {
    title: "Gramin Bhandaran Yojana",
    description: `
A scheme to build scientific storage facilities in rural areas.

Key Features:
- Financial assistance for rural godowns.
- Helps reduce post-harvest losses.
- Farmers can store and sell produce at better prices.

Objective:
To provide storage facilities close to farms and prevent distress sale.
    `,
    infoLink: "https://www.nabard.org/content1.aspx?catid=8&id=1720&mid=8",
  },
  11: {
    title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    description: `
PMKSY aims at providing assured irrigation to every field (Har Khet Ko Pani).

Key Features:
- Integration of water resources, distribution, and efficient use.
- Micro-irrigation and watershed development.
- Per drop more crop strategy.

Objective:
To increase water-use efficiency and expand irrigated areas.
    `,
    infoLink: "https://www.manage.gov.in/atma/atma.htm",
  },
  12: {
    title: "National Food Security Mission (NFSM)",
    description: `
Launched in 2007 to increase production of rice, wheat, pulses, coarse cereals, and commercial crops.

Key Features:
- Use of improved technology and seed varieties.
- Focus on low productivity districts.
- Nutrient and pest management.

Objective:
To ensure food security through productivity enhancement.
    `,
    infoLink: "https://agrimachinery.nic.in",
  },
  13: {
    title: "Mera Gaon Mera Gaurav",
    description: `
A scheme to connect agricultural scientists with farmers.

Key Features:
- Scientists adopt villages and guide farmers.
- Capacity building and problem-solving.
- Knowledge transfer via field visits and training.

Objective:
To empower farmers with scientific knowledge and practices.
    `,
    infoLink: "https://icar.org.in/content/mera-gaon-mera-gaurav",
  },
  14: {
    title: "Agri-Clinic and Agri-Business Centre (ACABC)",
    description: `
A scheme to provide self-employment to agri-graduates.

Key Features:
- Establish agri-clinics and agri-business centers.
- Financial and technical support.
- Advisory services to farmers.

Objective:
To strengthen agri-extension services and rural employment.
    `,
    infoLink: "https://nfsm.gov.in",
  },
  15: {
    title: "National Mission on Oilseeds and Oil Palm (NMOOP)",
    description: `
NMOOP enhances production of oilseeds and oil palm.

Key Features:
- Support for seed production and processing.
- Area expansion for oil palm.
- Farmer training and subsidy.

Objective:
To reduce import dependency on edible oils.
    `,
    infoLink: "https://agricoop.nic.in/en/Integrated-Scheme-Agricultural-Marketing",
  },
  16: {
    title: "Sub Mission on Agricultural Mechanization (SMAM)",
    description: `
Promotes mechanization to reduce drudgery and increase productivity.

Key Features:
- Subsidy on machinery to farmers and custom hiring centers.
- Support for small and marginal farmers.
- Technology demonstration and training.

Objective:
To make modern farm equipment accessible and affordable.
    `,
    infoLink: "https://dahd.nic.in",
  },
  17: {
    title: "National Horticulture Mission (NHM)",
    description: `
NHM supports horticulture development for higher income.

Key Features:
- Focus on fruits, vegetables, flowers, spices, and aromatic plants.
- Post-harvest and cold storage support.
- Nursery and planting material development.

Objective:
To improve nutritional security and boost farmer income.
    `,
    infoLink: "https://nfdb.gov.in",
  },
  18: {
    title: "Pradhan Mantri Kisan Maandhan Yojana (PMKMY)",
    description: `
A pension scheme for small and marginal farmers.

Key Features:
- Monthly pension of ₹3,000 after 60 years of age.
- Contribution-based enrollment (₹55–₹200/month).
- Govt co-contribution and LIC-managed fund.

Objective:
To ensure social security for aging farmers.
    `,
    infoLink: "https://www.nabard.org/content1.aspx?catid=8&id=1720&mid=8",
  },
  19: {
    title: "Livestock Health & Disease Control Scheme",
    description: `
Supports prevention, control, and eradication of livestock diseases.

Key Features:
- Vaccination programs and mobile veterinary services.
- Disease-free zone creation.
- Livestock health card system.

Objective:
To boost livestock productivity and reduce mortality losses.
    `,
    infoLink: "https://pmksy.gov.in",
  },
  20: {
    title: "Blue Revolution: Integrated Development of Fisheries",
    description: `
Promotes sustainable development of fisheries.

Key Features:
- Inland and marine fisheries development.
- Infrastructure and cold chain support.
- Focus on employment and export earnings.

Objective:
To double fish production and improve fishermen's livelihood.
    `,
    infoLink: "https://enam.gov.in",
  },
};

const govtScheme = () => {
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);

  const handleClick = (id) => {
    setSelectedSchemeId(id);
  };

  return (
    
    <div className="">
        <div className="">
        <Navbar/>
      </div>
        <div className="flex w-full h-screen bg-gray-100">
            {/* Left Section - Scheme List */}
            <div className="lg:col-span-1 w-[600px] bg-gradient-to-b from-[#50ff73] to-[#fafcfa] p-6 border-r border-gray-200 ">
              <h2 className="text-3xl font-semibold mb-6 text-green-800">🌾Agriculture Schemes</h2>
              <ul className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                {schemes.map((scheme) => (
                  <li
                    key={scheme.id}
                    onClick={() => handleClick(scheme.id)}
                    className={`flex items-start gap-4 p-3 rounded-md cursor-pointer transition-all duration-200 ${
                      selectedSchemeId === scheme.id
                        ? "bg-green-200 shadow-inner"
                        : "bg-white shadow-sm hover:bg-green-100"
                    }`}
                  >
                    {/* Optional icon or future image */}
                    {/* <img src={scheme.image} alt={scheme.title} className="w-14 h-14 object-cover rounded-md border border-gray-200" /> */}

                    <div>
                      <p className="font-[24px] text-base text-black">{scheme.title}</p>
                      {/* Optional description or category */}
                      {/* <span className="text-sm text-gray-500">{scheme.category}</span> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

        
            {/* Right side: Scheme details */}
            <div className="w-full p-6 overflow-y-auto bg-gradient-to-t from-[#50ff73] to-[#fafcfa]">
                {selectedSchemeId ? (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-green-700">
                    {schemeDetails[selectedSchemeId].title}
                    </h2>
                    <p className="text-lg whitespace-pre-line text-gray-700 leading-relaxed">
                    {schemeDetails[selectedSchemeId].description}
                    </p>
                    <a
                href={schemeDetails[selectedSchemeId].infoLink}
                className="inline-block bg-gradient-to-r from-[#6750ff] to-[#f64da2] hover:bg-green-700 text-white px-8 py-3 mt-6 text-lg rounded-md transition"
              >
                More information
              </a>
                </>
                ) : (
                    <div className="text-gray-600 text-2xl text-center">
                        <p>Please select a scheme</p>
                       
                        <div className="flex flex-col justify-center items-center ">
                             <h1 className="text-6xl">🙏</h1>
                            <img src={WImg} alt="Select Scheme" className="w-[600px] h-auto" />
                        </div>
                    </div>
                )}
                
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

export default govtScheme;

