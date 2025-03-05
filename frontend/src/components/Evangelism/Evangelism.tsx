import React from 'react';
import './Evangelism.css';
import evangelism1 from '../../assets/evangelism1.jpg';
import evangelism2 from '../../assets/evangelism2.jpg';
import evangelism3 from '../../assets/evangelism3.jpg';
import evangelism4 from '../../assets/evangelism4.jpg';
import evangelism5 from '../../assets/evangelism5.jpg';
import evangelism6 from '../../assets/evangelism6.jpg';
import evangelism7 from '../../assets/evangelism7.jpg';
import evangelism8 from '../../assets/evangelism8.jpg';

const images = [
    evangelism1,
    evangelism2,
    evangelism3,
    evangelism4,
    evangelism5,
    evangelism6,
    evangelism7,
    evangelism8,  // Add more images here as needed, but remember to update the array length in the useEffect hook.
];

const Evangelism: React.FC = () => {
    // State to track which image is clicked (for zoom and carousel)    
  return (
        <div className='evangelism-wrapper'>
            <h2 className='evangelism-h2'>WINNIPEG IN FOCUS</h2>
            <p className='evangelism-text'>We are actively answering the call to evangelize, reaching out to the lost and brokenhearted with the message of hope and salvation. Through personal connections, street outreach, and community events, we share the gospel with compassion, reflecting Christ’s love in every encounter.                    
            </p>

        {/* Image Grid Section */}
            <div className='evangelism-grid'>
                {images.map((src, index) => (
                    <div key={index} className='image-container'>
                        <img 
                        src={src}
                        alt={`Evangelism photo ${index + 1}`} className='evangelism-img'
                        loading='lazy'
                    />
                </div>
            ))}             
        </div>
      </div>
    );
};

export default Evangelism;