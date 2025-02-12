import React, { useState } from 'react';
import './CommunityOutreach.css';

// Importing images
import hangout1 from '/assets/2024/hangout1.jpg';
import hangout2 from '/assets/2024/hangout2.jpg';
import hangout3 from '/assets/2024/hangout3.jpg';
import hangout4 from '/assets/2024/hangout4.jpg';
import hangout5 from '/assets/2024/hangout5.jpg';
import hangout6 from '/assets/2024/hangout6.jpg';
import hangout7 from '/assets/2024/hangout7.jpg';
import hangout8 from '/assets/2024/hangout8.jpg';
import hangout9 from '/assets/2024/hangout9.jpg';
import hangout10 from '/assets/2024/hangout10.jpg';
import hangout11 from '/assets/2024/hangout11.jpg';
import hangout12 from '/assets/2024/hangout12.jpg';
import hangout13 from '/assets/2024/hangout13.jpg';
import hangout14 from '/assets/2024/hangout14.jpg';
import hangout15 from '/assets/2024/hangout15.jpg';
import hangout16 from '/assets/2024/hangout16.jpg';
import hangout17 from '/assets/2024/hangout17.jpg';
import hangout18 from '/assets/2024/hangout18.jpg';
import hangout19 from '/assets/2024/hangout19.jpg';
import hangout20 from '/assets/2024/hangout20.jpg';

const images2024 = [
  hangout1, hangout2, hangout3, hangout4, hangout5, hangout6, hangout7, hangout8, hangout9, hangout10,
  hangout11, hangout12, hangout13, hangout14, hangout15, hangout16, hangout17, hangout18, hangout19, hangout20
];

const CommunityOutreach: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState<number>(0); // Stores current photo index
  const [isOpen, setIsOpen] = useState<boolean>(false); //Determines if the lightbox is open or closed

  // Open lightbox when an image is clicked
  const openLightbox = (index: number): void => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  // Close lightbox when the close button is clicked
  const closeLightbox = (): void => {
    setIsOpen(false);
  }

  // Change photo index when the arrow buttons are clicked
  const moveSlide = (direction: number): void => {
    setPhotoIndex((prevIndex) => (prevIndex + direction + images2024.length) % images2024.length);
  };

  return (
    <div className='community-container'>
      <div className='community-outreach'>
        <h1 className='community-outreach h1'>Faith & Flames BBQ</h1>
        <p className='community-p'>
          Every year, from June to September, we host a community-wide Barbeque Hangout! The event is an
          opportunity for the people in our community to come together, enjoy some delicious food, and hear
          "The Word." During the event, we also offer free clothing items, shoes, and more to attendees. Lives
          are transformed, and the community is impacted through this outreach. We invite you to be a part of
          this impactful time!
        </p>

        {/* Yearly Section: 2024 */}
      <div className='community-wrapper'>
        <section className='image-gallery'>
          <h2 className='hangout-h2'>2024</h2>
          <div className='image-grid'>
            {/* Show only 5 images initially */}
            {images2024.slice(0, 8).map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`2024 BBQ Hangout ${index + 1}`}
                  className='image-hover-effect'
                  onClick={() => openLightbox(index)} // Open lightbox when clicked
                />
            ))}
          </div>
        </section>
      </div>

          {/* Lightbox Modal */}
          {isOpen && (
            <div className="lightbox">
              <span className='close' onClick={closeLightbox}>&times;</span>
              <img src={images2024[photoIndex]} alt={`Community Hangout ${photoIndex + 1}`} className='lightbox-img' />
              <button className='prev' onClick={() => moveSlide(-1)}>&#10094;</button>
              <button className='next' onClick={() => moveSlide(1)}>&#10095;</button>
              </div>
          )}
        </div>
    </div>
  );
};

export default CommunityOutreach;
