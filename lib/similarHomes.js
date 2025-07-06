import axios from "axios";

export default async function getSimilarHomes(id) {
  const options = {
    method: "GET",
    url: "https://realty-in-us.p.rapidapi.com/properties/v3/list-similar-homes",
    params: {
      property_id: id,
      limit: "10",
      status: "for_sale",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data?.data?.home?.related_homes?.results;

  } catch (error) {
    console.error("Failed to fetch similar homes:", error);
    throw new Error("Failed to fetch similar homes");
  }
}
