"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import { ImagesModal } from "@/component";
import PropertyCard from "@/component/propertyCard/PropertyCard";
import Loader from "@/component/loader/Loader"

import millify from "millify";

import "../propertyDetails.css";
import getProperty from "lib/property";
import getSimilarHomes from "lib/similarHomes";


const PropertyDetails = () => {
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(null);
  const [similarHomes, setSimilarHomes] = useState([]);
  
  const [index, setIndex] = useState(0);
  const [openSections, setOpenSections] = useState({
    modale: false,
    homeDetails: false,
    mortgage: false,
    tax: false,
    schools: false,
    contact: false,
  });

  useEffect(() => {
    const fetchDetails = async () => {
    
      const data = await getProperty(id);
      setProperty(data);
      console.log(data)


      const similar = await getSimilarHomes(id);
      setSimilarHomes(similar);
     
    };


    if (id) fetchDetails()
  }, [id])

 

  const handletoggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleError = () => {
    setImageSrc(Alternative);
  };

  return (
    <div className="propertyDetails">
      {openSections.modale ? (
        <div>
          <Image
            src="/icons/close.svg"
            alt="close icon"
            width={20}
            height={20}
            onClick={() => handletoggleSection("modale")}
            className="closingIcon"
          />
          <ImagesModal data={property?.photos} />
        </div>
      ) : (
        <div>
        {loading ? (
          <Loader />
        ) : (
          <div
            onClick={() => handletoggleSection("modale")}
            className="image-container"
          >
            <div className="big-image">
              <Image
                src={property?.photos && property?.photos[index].href || "/assets/no-image.png"}
                alt="property-detail-image"
                className="property-detail-image"
                width={600}
                height={400}
              />
            </div>
            <div className="small-images-container">
              {property?.photos.slice(0, 3)?.map((photo, i) => (
                <Image
                  key={i}
                  alt="pic"
                  src={photo.href}
                  unoptimized
                  width={130}
                  height={85}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
              <div className="see-more">
                <span className="title">
                  See More
                  <Image
                    src="/icons/arrowdown.svg"
                    alt="arrowdown"
                    width={30}
                    height={30}
                  />
                </span>
              </div>
            </div>
          </div>

        )}

          <section className="body">
            <div className="details-container">
              <div className="details-heighlight">
                <div className="details-heighlight-header">
                  <div className="price-payment">
                    <h2>${property?.list_price.toLocaleString()}</h2>
                    <h4>
                      EST. ${property?.mortgage?.estimate?.monthly_payment.toLocaleString()} /MO
                    </h4>
                  </div>

                  <div className="rooms-size">
                    <h3>{property?.description?.beds} bed</h3>
                    <h3>{property?.description?.baths} bath</h3>
                    {property?.description?.lot_size ? (
                      <h3>lot: {property?.description?.lot_size.size} sqft</h3>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="address">
                    <h4>
                      {property?.location?.address?.line},{" "}
                      {property?.location?.address?.city},{" "}
                      {property?.location?.address?.state_code}{" "}
                      {property?.location?.address?.postal_code}
                    </h4>
                  </div>
                </div>

                <div className="group-tag">
                  <div className="tag">
                    <Image
                      src="/icons/house.svg"
                      alt="home"
                      width={20}
                      height={20}
                    />
                    <div>
                      <h3>Property Type: </h3>
                      <h3>{property?.description?.type}</h3>
                    </div>
                  </div>

                  <div className="tag">
                    <Image
                      src="/icons/calendar.svg"
                      alt="calendar"
                      width={20}
                      height={20}
                    />
                    <div>
                      <h3>
                        {property?.list_date.length > 10
                          ? property?.list_date.substring(0, 10) + " "
                          : property?.list_date}
                      </h3>
                      <h5>Date Listed</h5>
                    </div>
                  </div>

                  <div className="tag">
                    <Image
                      src="/icons/measurement.svg"
                      alt="measurement"
                      width={20}
                      height={20}
                      className="icon"
                    />
                    <div>
                      <h3>{property?.description?.sqft}</h3>
                      <h5>Building Size</h5>
                    </div>
                  </div>

                  <div className="tag">
                    <Image
                      src="/icons/tools.svg"
                      alt="year built"
                      width={20}
                      height={20}
                      className="icon"
                    />
                    <div>
                      {property?.description?.year_built !== null ? (
                        <h3>{property?.description?.year_built}</h3>
                      ) : (
                        <h3>N/A</h3>
                      )}
                      <h5>Year Built</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="propertyDetails-details">
                <div className="home-description">
                  <div className="section-header">
                    <h3>About This Home</h3>

                    <button
                      className="icon"
                      onClick={() => handletoggleSection("homeDetails")}
                    >
                      <Image
                        src={
                          openSections.homeDetails
                            ? "/icons/arrowup.svg"
                            : "/icons/arrowdown.svg"
                        }
                        alt="arrowdown"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>

                  <div className="section-detail">
                    {openSections.homeDetails ? (
                      <div>
                        <h3>Property Features</h3>
                        {property?.details?.map((feature, featureIndex) => (
                          <div key={featureIndex}>
                            <h3>{feature?.category}</h3>
                            {feature?.text?.map((item, itemIndex) => (
                              <li key={itemIndex}>{...item}</li>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="propertyDetails-details">
                <div className="section-header">
                  <h3>Monthly Payment</h3>
                  <div className="open-close">
                    <button
                      className="icon"
                      onClick={() => handletoggleSection("mortgage")}
                    >
                      <Image
                        src={
                          openSections.mortgage
                            ? "/icons/arrowup.svg"
                            : "/icons/arrowdown.svg"
                        }
                        alt="arrowdown"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
                {openSections.mortgage ? (
                  <div className="mortgage-section">
                    <div className="mortgage-option">
                      <h4>Loan Amount</h4>{" "}
                      <h4 className="heilighted-text">
                        ${property?.mortgage?.estimate.loan_amount.toLocaleString()}
                      </h4>
                    </div>

                    <div className="mortgage-option">
                      <h4>Loan</h4>{" "}
                      <h4>
                        {
                          property?.mortgage?.estimate?.average_rate?.loan_type
                            ?.term
                        }{" "}
                        Year Fixed loan at{" "}
                        <span className="heilighted-text">
                          {(
                            property?.mortgage?.estimate?.average_rate?.rate * 100
                          ).toFixed(3)}
                          %
                        </span>
                      </h4>
                    </div>
                    <div className="mortgage-option">
                      <h4>Monthly Payment</h4>{" "}
                      <h4 className="heilighted-text">
                        ${property?.mortgage?.estimate?.monthly_payment.toLocaleString()}
                      </h4>
                    </div>
                    <div className="mortgage-option">
                      {property?.morgage?.monthly_payment_details?.map(
                        (paymentDetail, paymentDetailIndex) => (
                          <div
                            key={paymentDetailIndex}
                            className="monthly_payment_detail"
                          >
                            <h3>
                              {paymentDetail.display_name}: $
                              {paymentDetail.amount.toLocaleString()}
                            </h3>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="propertyDetails-details">
                <div className="section-header">
                  <h3>Property Tax History</h3>
                  <div className="open-close">
                    <button
                      className="icon"
                      onClick={() => handletoggleSection("tax")}
                    >
                      <Image
                        src={
                          openSections.tax
                            ? "/icons/arrowup.svg"
                            : "/icons/arrowdown.svg"
                        }
                        alt="arrowdown"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
                <div>
                  {openSections.tax ? (
                    property?.tax_history?.length > 0 ? (
                      <div>
                        {property?.tax_history.map((tax, taxIndex) => (
                          <div key={taxIndex} className="tax-history-body">
                            <h4>{tax.year}</h4>
                            <h2>----</h2>
                            <h4>${tax.tax.toLocaleString()}</h4>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Tax History Data is not Available for this Property</p>
                    )
                  ) : null}
                </div>
              </div>

              <div className="propertyDetails-details">
                <div className="section-header">
                  <h3>Schools</h3>
                  <div className="open-close">
                    <button
                      className="icon"
                      onClick={() => handletoggleSection("schools")}
                    >
                      <Image
                        src={
                          openSections.schools
                            ? "/icons/arrowup.svg"
                            : "/icons/arrowdown.svg"
                        }
                        alt="arrow"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>

                <div className="schools-body">
                  {openSections.schools ? (
                    <table className="schools-table">
                      <thead className="school-options">
                        <tr>
                          <th>School Name</th>
                          <th>Rating</th>
                          <th>Grades</th>
                          <th>Type</th>
                          <th>Students</th>
                          <th>Parent Rating</th>
                          <th>Diatance</th>
                        </tr>
                      </thead>

                      <tbody>
                        {property?.nearby_schools?.schools?.length > 0 ? (
                          property?.nearby_schools?.schools?.map((school, schoolIndex) => (
                            <tr key={schoolIndex} className="school-options">
                              <td>{school.name}</td>

                              {school.rating !== null ? (
                                <td>{school?.rating}/10</td>
                              ) : (
                                <td>N/A</td>
                              )}

                              <td>
                                <div className="schools-grade">
                                  {school?.grades ? (
                                    school?.grades?.map((grad) => (
                                      <h4 key={grad}>{grad}</h4>
                                    ))
                                  ) : (
                                    <td>N/A</td>
                                  )}
                                </div>
                              </td>

                              {school?.education_levels !== null ? (
                                <td>
                                  {school?.education_levels?.map(
                                    (education_level) => (
                                      <h4 key={education_level}>
                                        {education_level}
                                      </h4>
                                    )
                                  )}
                                </td>
                              ) : (
                                <td>N/A</td>
                              )}

                              {school?.student_count !== null ? (
                                <td>{school?.student_count}</td>
                              ) : (
                                <td>N/A</td>
                              )}

                              {school?.parent_rating !== null ? (
                                <td>{school?.parent_rating}</td>
                              ) : (
                                <td>N/A</td>
                              )}

                              {school?.distance_in_miles !== null ? (
                                <td>{school?.distance_in_miles}</td>
                              ) : (
                                <td>N/A</td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <h3>No Data About Schools for this Property</h3>
                        )}
                      </tbody>
                    </table>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="brooker">
              <h2>Presented By:</h2>
              <div>
                {property?.consumer_advertisers?.map(
                  (advertiser, advertiserIndex) => (
                    <div key={advertiserIndex} className="advertiser">
                      {advertiser.name}
                    </div>
                  )
                )}
              </div>

              <div className="section-header">
                <h3>Contact Agent</h3>
                <div className="open-close">
                  <button
                    className="icon"
                    onClick={() => handletoggleSection("contact")}
                  >
                    <Image
                      src={
                        openSections.contact
                          ? "/icons/arrowup.svg"
                          : "/icons/arrowdown.svg"
                      }
                      alt="arrow"
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
              </div>
              {openSections.contact ? (
                property?.advertisers.length > 0 ? (
                  <div className="contact-container">
                    {property?.advertisers?.map((advertiser) => (
                      <div key={advertiser?.fulfillment_id} className="contact">
                        <>
                          <a href={`mailto:${advertiser?.email}`}>
                            {advertiser?.email}
                          </a>
                          <a
                            href={advertiser?.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {advertiser?.href}
                          </a>

                          <div className="contact-photo-phone">
                            <div className="contact-photo">
                              <Image
                                src={
                                  advertiser.photo?.href || "/icons/noImage.svg"
                                }
                                alt="advertiser image"
                                width={120}
                                height={120}
                              />
                            </div>

                            <div className="contact-phone">
                              {advertiser?.phones?.map((phone) => (
                                <div key={phone.type}>
                                  <p>
                                    {phone.type}: {phone.number}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h4>Contact Agent is not available at the moment</h4>
                )
              ) : null}
            </div>
          </section>
        </div>
      )}

      {similarHomes && (
        <div className="similarHomes">
        <div className="similarHomes-header">
          <Image src="/icons/houses.svg" alt="houses" width={30} height={30} />
          <h2>Similar homes</h2>
        </div>
          {similarHomes.length > 0 ? (
            <section className="similarHomes-container">
              {similarHomes.map((similarHome) => (
                <div
                className="similarHomes-container-unit"
                key={similarHome.property_id}
                property={similarHome}
                >
                  <Link
                    target="_blank"
                    href={`/propertyDetails/${similarHome.property_id}`}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <PropertyCard
                      property_id={similarHome.property_id}
                      property={similarHome}
                      onError={handleError}
                      thumbnail={
                        similarHome.primary_photo?.href || "/icons/noImage.svg"
                      }
                      price={similarHome.list_price}
                      beds={similarHome.description?.beds}
                      baths={similarHome.description?.baths}
                      address={similarHome.location?.address?.line}
                      city={similarHome.location?.address?.city}
                      state_code={similarHome.location?.address?.state_code}
                      postal_code={similarHome.location?.address?.postal_code}
                    />
                  </Link>
                </div>
              ))}
            </section>
          ) : (
            <h4>No similar homes found</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
