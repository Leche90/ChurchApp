import React, { useState } from 'react';
import './CommunityOutreach.css';
import feast from '/home/lleche/ChurchApp/frontend/src/assets/optimized/feast.webp';

// Importing images for the 2024 BBQ Hangout
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

// Images for 2023 BBQ Hangout
const images2023 = [
  '/assets/2023/hangoutA.jpeg', '/assets/2023/hangoutB.jpeg',
  '/assets/2023/hangoutC.jpeg', '/assets/2023/hangoutD.jpeg',
  '/assets/2023/hangoutE.jpeg', '/assets/2023/hangoutF.jpeg',
  '/assets/2023/hangoutG.jpeg', '/assets/2023/hangoutH.jpeg',
  '/assets/2023/hangoutI.jpeg', '/assets/2023/hangoutJ.jpeg',
  '/assets/2023/hangoutK.jpeg', '/assets/2023/hangoutL.jpeg',
  '/assets/2023/hangoutM.jpeg', '/assets/2023/hangoutN.jpeg',
  '/assets/2023/hangoutO.jpeg', '/assets/2023/hangoutP.jpeg',
  '/assets/2023/hangoutQ.jpeg', '/assets/2023/hangoutR.jpeg',
  '/assets/2023/hangoutS.jpeg', '/assets/2023/hangoutT.jpeg',
  '/assets/2023/hangoutU.jpeg',
];

  // Images for 2024 BBQ Hangout
const images2024 = [
  hangout2, hangout3, hangout4, hangout5, hangout6, hangout7, hangout8, hangout9, hangout10,
  hangout11, hangout12, hangout13, hangout14, hangout15, hangout16, hangout17, hangout18, hangout19, hangout20
];

const CommunityOutreach: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState<number>(0); // Stores current photo index
  const [isOpen, setIsOpen] = useState<boolean>(false); //Determines if the lightbox is open or closed
  const [selectedYear, setSelectedYear] = useState<'2023' | '2024'>('2024'); 

  // Open lightbox when an image is clicked
  const openLightbox = (index: number, year: '2023' | '2024'): void => {
    setPhotoIndex(index);
    setSelectedYear(year);
    setIsOpen(true);
  };

  // Close lightbox when the close button is clicked
  const closeLightbox = (): void => {
    setIsOpen(false);
  }

  // Change photo index when the arrow buttons are clicked
  const moveSlide = (direction: number): void => {
    const images = selectedYear === '2023' ? images2023 : images2024;
    setPhotoIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
  };

  return (
    <div className='community-container'>
      <div className='community-header'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${feast})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <h1 className='community-outreach-h1'>Faith & Flames BBQ</h1>        
        <p className='community-p'>
          A summer hangout filled with wining and dining, giving to the needy and sharing the Word of God together.
        </p>
      </div>

        {/* Yearly Section: 2024 */}
      <div className='community-wrapper'>
        <section className='image-gallery'>

          {/* 2024 Section */}
        <div className="year-section">
          <div className='section-row'>
            <h3 className="year-intro">From June through August each year, we host our annual BBQ which brings people within our community togehter. It’s more than just feasting and wining; it's a time of sharing, connecting, and giving. Attendees enjoy free delicious barbecue, free clothing, shoes, and essentials, and experience uplifting moments through sharing the Word of God with them. Explore some of the beautiful moments captured during each of the yearly BBQ events.</h3>

            <h2 className='year-heading'>2024</h2>

            <div className='image-grid'>
            {/* Show only 3 images initially */}
            {images2024.slice(0, 3).map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`2024 BBQ Hangout ${index + 1}`}
                  className='image-hover-effect'
                  onClick={() => openLightbox(index, '2024')} // Open lightbox when clicked
                />
              ))}
            </div>
            <div className="view-more-container">
              <button className='view-more-btn' onClick={() => openLightbox(0, '2024')}>View More</button>
            </div>               
          </div>
        </div>

          {/* 2023 Section */}
          <div className='section-row'>
            <h2 className='year-heading'>2023</h2>
            <div className='image-grid'>
            {/* Show only 3 images initially */}
            {images2023.slice(0, 3).map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`2023 BBQ Hangout ${index + 1}`}
                  className='image-hover-effect'
                  onClick={() => openLightbox(index, '2023')} // Open lightbox when clicked
                />
                ))}
              </div>
              <div className="view-more-container">
                <button className='view-more-btn' onClick={() => openLightbox(0, '2024')}>View More</button> 
              </div>
          </div>
        </section>
      </div>

          {/* Lightbox Modal */}
          {isOpen && (
            <div className="lightbox">
              <span className='close' onClick={closeLightbox}>&times;</span>
              <img src={selectedYear === '2023' ? images2023[photoIndex] : images2024[photoIndex]} alt={`Community Hangout ${photoIndex + 1}`} className='lightbox-img' />
              <button className='prev' onClick={() => moveSlide(-1)}>&#10094;</button>
              <button className='next' onClick={() => moveSlide(1)}>&#10095;</button>
              </div>
          )}
        </div>
  );
};

export default CommunityOutreach;
