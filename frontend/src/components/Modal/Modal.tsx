import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
      <div className='flex justify-center items-center h-full'>
        <div className='bg-white p-8 rounded-lg'>
          <button onClick={onClose} className='absolute top-2 right-2'>
            <X />
          </button>
          <div className='register-section'>
            <h3 className='register-h3'>Become a Partner</h3>
            <p className='register-p'>
              Are you passionate about helping people through giving? Your generosity helps us make a bigger impact!
            </p>
            <a href='/partnership' className='registration-link'>
              Partner with us through your giving
            </a>
            <form className='register-form'>
              <input type='text' placeholder='Name' className='register-input' />
              <input type='email' placeholder='Email' className='register-input' />
              <input type='tel' placeholder='Phone' className='register-input' />
              <input type='text' placeholder='Location' className='register-input' />
              <button type='submit' className='register-button'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
