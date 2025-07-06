"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import Image from "next/image";

import getProperties from "lib/properties";

import PropertyCard from "@/component/propertyCard/PropertyCard";
import Hero from "@/component/hero/Hero";
import Qr from "@/component/qr/Qr";
import Openhouse from "@/component/openhouse/Openhouse";
import Locations from "@/component/locations/Locations";
import Slogan from "@/component/slogan/Slogan";
import Loader from "@/component/loader/Loader";

import "./search.css";

const Search = () => {
  const [city, setCity] = useState(null);
  const [status, setStatus] = useState(null);
  const [bed, setBed] = useState(null);
  const [type, setType] = useState(null);
  const [maxprice, setMaxprice] = useState();
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("/defaultImage");
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [prevLength, setPrevLength] = useState(0);

  const searchParams = useSearchParams();

  const filters = useMemo(() => ({
  city,
  status,
  bed,
  type,
  maxprice,
}), [city, status, bed, type, maxprice]);

const firstNewItemRef = useRef(null);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(city);
    }, 1000); // wait 600ms after user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  // Fire the API when debouncedKeyword changes

  const fetchData = async ({ newOffset = 0, append = false, ...filters }) => {
    
    try {
      setLoading(true);
      const results = await getProperties({
          ...filters,
          offset: newOffset,
      });

      if (results.length < 20) setHasMore(false);

      if (append) {
        const previousLength = properties?.length || 0;
        const combinedResults = [...(properties || []), ...results];

        setPrevLength(previousLength);
         setProperties(combinedResults);

        setTimeout(() => {
         if (firstNewItemRef.current) {
           firstNewItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
         }
         }, 100);
          
      } else {
          setProperties(results);
          setPrevLength(0);
          
      }

      console.log(results);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) {
      setCity(cityParam);
      setProperties(null); //reset old data
      fetchData({
        ...filters,
        searchCity: cityParam,
        newOffset: 0,
      }); //trigger fetch
    }
  }, [searchParams])

   useEffect(() => {
    if (city) {
      fetchData({ ...filters, newOffset: 0});
    }
  }, [debouncedKeyword]);

  const handleError = () => {
    setImageSrc("/assets/no-image.png");
  };

  return (
    <div className="home">
      <div className="search-container">
        <Image src="/assets/bg.jpg" alt="bg" className="bg-image" fill />
        <div className="search-slogan">
          <h1>Search By Area</h1>
          <h2>Find it - Tour it - Own it</h2>
        </div>

        <form
          onSubmit={(e) => {
            fetchData();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="search-criteria">
            <select
              className="buy-rent"
              onChange={(e) => setStatus(e.target.value)}
              value={status || ""}
            >
              {["Buy", "Rent"].map((value) => {
                return (
                  <option value={value} key={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <input
              type="number"
              placeholder="Beds"
              onChange={(e) => setBed(e.target.value)}
              value={bed || ""}
            />

            <select
              className="property-type"
              onChange={(e) => setType(e.target.value)}
              value={type || ""}
            >
              {[
                "select Property type",
                "Single Family",
                "Multi Family",
                "Condo",
                "Land",
                "Farm",
                "Other",
              ].map((value) => {
                return (
                  <option value={value} key={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Enter Max-Price"
              onChange={(e) => setMaxprice(e.target.value)}
              value={maxprice || ""}
            />
          </div>

          <div className="search-input">
            <input
              type="text"
              placeholder="Search by City, Zip, Neighborhood"
              onChange={(e) => {
                setCity(e.target.value);
                setProperties(null);
              }}
              value={city || ""}
            />
            <button
              className="search-input-btn"
              onClick={(e) => {
                e.preventDefault();
                fetchData({ ...filters, newOffset: 0 });
              }}
            >
              <Image
                src="/icons/search.svg"
                alt="search"
                height={25}
                width={25}
              />
            </button>
          </div>
        </form>
      </div>

{properties ? (
      <div className="search-display-container">
        <div className="search-display-container-header">
          <h1 className="search-display-container-header-title">Search result: homes to <span className="search-display-container-header-title-span">{status}</span> , in <span className="search-display-container-header-title-span">{city}</span></h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="search-display">
            {properties?.map((property, propertyIndex) => {
                const isFirstNewItem = propertyIndex === prevLength;
                return (
                <div key={propertyIndex} property={property} ref={isFirstNewItem ? firstNewItemRef : null}>
                <Link
                  target="_blank"
                  href={`/propertyDetails/${property.property_id}`}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <PropertyCard
                    property_id={property.property_id}
                    property={property}
                    onError={handleError}
                    office={property.branding[0]?.name}
                    thumbnail={
                      property.primary_photo?.href || "/icons/noImage.svg"
                    }
                    price={property.list_price}
                    beds={property.description?.beds}
                    baths={property.description?.baths}
                    address={property.location?.address?.line}
                    city={property.location?.address?.city}
                    state_code={property.location?.address?.state_code}
                    postal_code={property.location?.address?.postal_code}
                  />
                </Link>
              </div>
                )
            })}

            
          </div>
        )}

        {loading && hasMore && (
            <Loader />
        )}

        {!loading && hasMore && (
            <div className="load-more">
              <button className="load-more-btn"
              disabled={loading}
               onClick={(e) => {
                e.preventDefault();
                const nextOffset = offset + 20;
                setOffset(nextOffset);
                fetchData({ ...filters, newOffset:nextOffset, append:true })
               }}
              >
              {loading ? "Loading" : "Load More"}
              </button>
            </div>
        )}
      </div>

  ) : (
    <div>
      <Slogan />
        <Hero />
        <Qr />
        <Openhouse />
        <Locations />
    </div>
  )}
    </div>
  );
};

export default Search;
