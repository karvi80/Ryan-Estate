import axios from "axios";


export default async function getProperties({ city, type, status, bed, maxprice, offset = 0 }) {

  // 1. Convert inputs to correct format
  const beds = bed ? { min: Number(bed), max: Number(bed) + 2 } : undefined;
  const list_price = maxprice ? { min: 0, max: Number(maxprice) } : undefined;

  // 2. Handle type filtering
  const propertyTypes = type && type !== "select Property type" ? [type.toLowerCase().replace(" ", "_")] : undefined;

  // 3. Convert UI status to API-expected status values
  let statusValues;
  if (status === "Buy") {
    statusValues = ["for_sale", "ready_to_build"];
  } else if (status === "Rent") {
    statusValues = ["for_rent"];
  }



  const options = {
    method: "POST",
    url: "https://realty-in-us.p.rapidapi.com/properties/v3/list",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
    'Content-Type': 'application/json'
    },
    data: {
      limit: 20,
      offset,
      city,
      type: propertyTypes,
      status: statusValues,
      sort: {
        direction: "desc",
        field: "list_date",
      },
      beds,
      list_price,
    },
  };

  try {
    const response = await axios.request(options);
    const properties = response.data?.data?.home_search?.results || [];

    //  Send the response to the client
    return properties;
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to fetch properties" );
  }
}
