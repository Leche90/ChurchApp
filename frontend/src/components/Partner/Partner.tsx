import React, { useState, useEffect, useRef } from 'react';
import './Partner.css';
import axios from 'axios';

// Define TypeScript interfaces
interface Country {
  name: { common: string };
}

interface PrayerFormData {
  name: string;
  request: string;
  email?: string;
}

interface PartnershipFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  supportTypes: string[];
  donationMethod: string;
  donationFrequency: string;
  confirmCashDonation: boolean;
  otherSupport: string;
  privacyConsent: boolean;
}

interface SubmitStatus {
  loading: boolean;
  error: string;
  success: boolean;
}

const Partner: React.FC = () => {
  // State for modal visibility
  const [isPrayerModalOpen, setPrayerModalOpen] = useState(false);
  const [isPartnershipModalOpen, setPartnershipModalOpen] = useState(false);

  // State for prayer form data
  const [prayerData, setPrayerData] = useState<PrayerFormData>({
    name: '',
    request: ''
  });

  // State for partnership form data
  const [partnershipData, setPartnershipData] = useState<PartnershipFormData>({ 
    firstName: '', 
    lastName: '',
    email: '', 
    phone: '',
    address: '',
    country: '',
    supportTypes: [],
    donationMethod: '',
    donationFrequency: '',
    confirmCashDonation: false,
    otherSupport: '',
    privacyConsent: false
  });

  // State for countries list
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>('');

  // State for form validation errors
  const [formErrors, setFormErrors] = useState({
    privacyConsent: false
  });

  // State for submission status
  const [submitStatus, setSubmitStatus] = useState<{
    prayer: SubmitStatus;
    partnership: SubmitStatus;
  }>({
    prayer: { loading: false, error: '', success: false },
    partnership: { loading: false, error: '', success: false }
  });

  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const prayerFormRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch countries data when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => country.name.common);
        countryNames.sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (err) {
        console.error("Error fetching countries", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Manage body scroll when modals are open/closed
  useEffect(() => {
    if (isPartnershipModalOpen || isPrayerModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isPartnershipModalOpen, isPrayerModalOpen]);

  // Handle partnership form field changes
  const handlePartnershipChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      if (name === "confirmCashDonation") {
        setPartnershipData(prev => ({ ...prev, confirmCashDonation: checked }));
      } else if (name === "privacyConsent") {
        setPartnershipData(prev => ({ ...prev, privacyConsent: checked }));
        if (checked) {
          setFormErrors(prev => ({...prev, privacyConsent: false }));
        }
      } else {
        const updatedSupportTypes = checked 
          ? [...partnershipData.supportTypes, name] 
          : partnershipData.supportTypes.filter(item => item !== name);
        setPartnershipData(prev => ({ ...prev, supportTypes: updatedSupportTypes }));
      }
      return;
    }

    setPartnershipData(prev => ({ ...prev, [name]: value }));

    // Validate email format
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? "" : "Please enter a valid email address");
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPartnershipData(prev => ({ ...prev, fileUpload: e.target.files![0] }));
    }
  };

  // Handle prayer request submission with Mailgun
  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(prev => ({
      ...prev,
      prayer: { ...prev.prayer, loading: true, error: '' }
    }));

    try {
      const response = await axios.post('/api/prayerRequest', {
        name: prayerData.name,
        request: prayerData.request,
        email: prayerData.email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSubmitStatus(prev => ({
        ...prev,
        prayer: { loading: false, error: '', success: true }
      }));

      setPrayerData({ name: '', request: '' });
      setPrayerModalOpen(false);
      alert("Thank you for your prayer request! We'll pray for you.");
    } catch (error) {
      console.error('Prayer submission error:', error);
      setSubmitStatus(prev => ({
        ...prev,
        prayer: { loading: false, error: 'Failed to submit prayer request', success: false }
      }));
    }
  };

  // Handle partnership form submission with Mailgun
  const handlePartnershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate privacy consent
    if (!partnershipData.privacyConsent) {
      setFormErrors({ ...formErrors, privacyConsent: true });
      
      const consentElement = document.querySelector('.privacy-consent');
      if (consentElement) {
        consentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        consentElement.classList.add('validation-error');
        
        setTimeout(() => {
          consentElement.classList.remove('validation-error');
        }, 2000);
      }
      return;
    }

    setSubmitStatus(prev => ({
      ...prev,
      partnership: { ...prev.partnership, loading: true, error: '' }
    }));

    try {
      const response = await axios.post('/api/partnership', partnershipData);

      setSubmitStatus(prev => ({
        ...prev,
        partnership: { loading: false, error: '', success: true }
      }));

      // Reset form
      setPartnershipData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        supportTypes: [],
        donationMethod: '',
        donationFrequency: '',
        confirmCashDonation: false,
        otherSupport: '',
        privacyConsent: false
      });

      setPartnershipModalOpen(false);
      alert("Thank you for your partnership request! We'll be in touch soon.");
    } catch (error) {
      console.error('Partnership submission error:', error);
      setSubmitStatus(prev => ({
        ...prev,
        partnership: { loading: false, error: 'Failed to submit partnership form', success: false }
      }));
    }
  };

  return (
    <div className='partner-container'>
      {/* Prayer Request Card */}
      <div className='partner-card'>
        <div className="partner-right">
          <h4 className='partner-right-title'>Prayer Request</h4>
          <p className='partner-right-text'>
            Have a prayer request? Share it with us, and let's stand in faith together.
          </p>
          <button 
            onClick={() => setPrayerModalOpen(true)} 
            className='partner-right-button'
          >
            Submit
          </button>
        </div>
      </div>

      {/* Partnership Form Card */}
      <div className='partner-card'>
        <div className="partner-right">
          <h4 className='partner-right-title'>Become a Partner</h4>
          <p className='partner-right-text'>
            Are you passionate about helping people through giving? Your generosity helps us make a bigger impact!
          </p>
          <button 
            onClick={() => setPartnershipModalOpen(true)} 
            className='partner-right-button'
          >
            Partner
          </button>
        </div>
      </div>

      {/* Prayer Request Modal */}
      {isPrayerModalOpen && (
        <div className="modal-overlay" ref={modalRef}>
          <div className="modal">
            <h3 className='modal-h3'>Submit Prayer Request</h3>
            <form 
              ref={prayerFormRef}
              onSubmit={handlePrayerSubmit}
            >
              <input 
                type="text"
                name="name"
                placeholder="Your Name (Optional)"
                value={prayerData.name}
                onChange={(e) => setPrayerData({...prayerData, name: e.target.value})}
              />
              <textarea
                name="request"
                placeholder="Your Prayer Request"
                value={prayerData.request}
                onChange={(e) => setPrayerData({...prayerData, request: e.target.value})}
                required
              />
              
              <div className='modal-buttons'>
                <button 
                  type="submit" 
                  disabled={submitStatus.prayer.loading}
                >
                  {submitStatus.prayer.loading ? 'Submitting...' : 'Submit'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setPrayerModalOpen(false);
                    setPrayerData({ name: '', request: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
              {submitStatus.prayer.error && (
                <p className="error-message">{submitStatus.prayer.error}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Partnership Modal */}
      {isPartnershipModalOpen && (
        <div className="modal-overlay" ref={modalRef}>
          <div className="modal">
            <h3>Partnership Form</h3>
            <form 
              ref={formRef}
              onSubmit={handlePartnershipSubmit}
            >         
              {/* Personal Information Section */}
              <div className='partnership-form'>
                <div className='form-group'>
                  <label>First Name*</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name"
                    value={partnershipData.firstName}
                    onChange={handlePartnershipChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Last Name*</label>
                  <input 
                    type="text"
                    name="lastName" 
                    placeholder="Last Name"
                    value={partnershipData.lastName}
                    onChange={handlePartnershipChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Email*</label>
                  <input 
                    type="email"
                    name="email" 
                    placeholder="Email"
                    value={partnershipData.email}
                    onChange={handlePartnershipChange}
                    required
                  />
                  {emailError && <span className="error">{emailError}</span>}
                </div>
                <div className='form-group'>
                  <label>Phone Number</label>
                  <input 
                    type="tel"
                    name="phone" 
                    placeholder="Phone Number"
                    value={partnershipData.phone}
                    onChange={handlePartnershipChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Address*</label>
                  <input 
                    type="text"  
                    name="address" 
                    placeholder="Address"
                    value={partnershipData.address}
                    onChange={handlePartnershipChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Country</label>
                  <select 
                    name="country" 
                    value={partnershipData.country} 
                    onChange={handlePartnershipChange}
                  >
                    <option value="">Select Country</option>
                    {loading ? (
                      <option>Loading countries...</option>
                    ) : (
                      countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* Support Information Section */}
              <div className='partnership-section'>
                <h4 className='support-h4'>Support Information</h4>
                <div className='form-group'>
                  <label>How would you like to support the church?</label>
                  <div className='checkbox-container'>
                    {['Financial donation', 'Volunteering', 'Clothes/Shoes/Food', 'Other'].map(type => (
                      <label key={type} className='checkbox-label'>
                        <input
                          type="checkbox"
                          name={type}
                          checked={partnershipData.supportTypes.includes(type)}
                          onChange={handlePartnershipChange}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {partnershipData.supportTypes.includes("Other") && (
                  <div className='form-group'>
                    <label>Please specify</label>
                    <input 
                      type="text" 
                      name="otherSupport"
                      value={partnershipData.otherSupport}
                      onChange={handlePartnershipChange}
                    />
                  </div>
                )}

                {partnershipData.supportTypes.includes("Financial donation") && (
                  <>
                    <div className='form-group'>
                      <label>Donation Method*</label>
                      <select 
                        name="donationMethod" 
                        value={partnershipData.donationMethod}
                        onChange={handlePartnershipChange} 
                        required
                      >
                        <option value="" disabled>Select Method</option>
                        <option value="cash">Cash</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="wire">Bank/Wire Transfer</option>                 
                      </select>
                    </div>

                    {(partnershipData.donationMethod === "wire" || partnershipData.donationMethod === "cash") && (
                      <div className='form-group advisory'>
                        <p className='instructions-p'> 
                          Please, contact the church at <b>431-123-4567</b> or email <b>kingmakerswebapp@gmail.com</b> for futher instructions.
                        </p>                    
                      </div>
                    )}

                    <div className='form-group'>
                      <label>Donation Frequency</label>
                      <select 
                        name="donationFrequency"
                        value={partnershipData.donationFrequency}
                        onChange={handlePartnershipChange}
                        required
                      >
                        <option value="" disabled>Select Frequency</option>
                        <option value="one-off">One-Off</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="bi-annually">Bi-Annualy</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </>
                )}
              </div>            
                
              {/* File Upload Section */}
              <div className="form-section">
                <div className="form-group">
                  <label>Upload Supporting Document (Optional)</label>
                  <input type="file" name="fileUpload" />
                </div>
              </div>

              {/* Privacy Notice Section */}
              <div className={`privacy-consent ${formErrors.privacyConsent ? 'required-field' : ''}`}>
                <h4 className="privacy-notice-h4">Privacy</h4>
                <p className='privacy-notice-p'>
                  We collect your details for the purpose of maintaining accurate partnership records.
                  Your information is protected with strict confidentiality and will never be shared with third parties.                
                </p>
              </div>

              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  required
                  checked={partnershipData.privacyConsent}
                  onChange={handlePartnershipChange}
                />              
                <span className="checkmark"></span>
                <span className="consent-text">
                  I acknowledge that my information will be processed in accordance with this privacy notice. 
                  <span className="required-asterisk">*</span>
                </span>
                {formErrors.privacyConsent && (
                  <span className="error-message">You must accept the privacy policy to continue</span>
                )}
              </label>

              {/* Form Buttons */}
              <div className="modal-buttons">
                <button 
                  type="submit" 
                  disabled={submitStatus.partnership.loading}
                >
                  {submitStatus.partnership.loading ? 'Submitting...' : 'Partner'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setPartnershipModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
              {submitStatus.partnership.error && (
                <p className="error-message">{submitStatus.partnership.error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partner;