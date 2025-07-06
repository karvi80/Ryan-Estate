import axios from "axios";

export default async function getProperty(id) {
  const options = {
    method: "GET",
    url: "https://realty-in-us.p.rapidapi.com/properties/v3/detail",
    params: {
    property_id: id,
      },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
  }
};

try {
  const response = await axios.request(options);
  return response?.data?.data?.home || null;

} catch (error) {
  console.error("Failed to fetch property data:", error);
  throw new Error("Failed to fetch property")
}
};
