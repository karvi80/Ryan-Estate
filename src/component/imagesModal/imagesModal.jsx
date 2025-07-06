import React from "react";
import Image from "next/image";
import "./imagesModal.css"


const ImagesModal = ({ data }) => {
  return (
      <div className="modal-container">
        <div className="modal-images">
          {data?.map((photo) => (
            <Image
              key={photo.href}
              alt="pic"
              src={photo.href}
              width={1000}
              height={700}
              className="modal-image"
              
            />
          ))}
        </div>
      </div> 
  );
};

export default ImagesModal;
