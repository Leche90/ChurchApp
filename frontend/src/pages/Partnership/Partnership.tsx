import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Partnership.css';
// import ReCAPTCHA from 'react-google-recaptcha';

// Global object for grecaptcha
declare global {
    interface Window {
        grecaptcha: any;
    }
}

// Define the type for the country data returned from the API
interface Country {
    name: { common: string };
}

const Partnership: React.FC = (): JSX.Element => {
    // Initial form state - contains the fields for the form
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        supportTypes: [] as string[], // Store selected support types
        donationMethod: "",
        donationFrequency: "",
        confirmDonation: "",
        confirmCashDonation: false, // New state for Cash confirmation checkbox
        fileUpload: null as File | null, // File upload state
    });

    // Country list and loading state
    const [countries, setCountries] = useState<string[]>([]); // Set country list
    const [loading, setLoading] = useState<boolean>(true); // Loading state while fetching countries    
    const [emailError, setEmailError] = useState<string>(""); // Error state for email mismatch
    const [isSubmitted, setIsSubmitted] = useState(false); // State to handle form submission status
    const [captchaToken, setCaptchaToken] = useState<string | null>(null); // Store reCAPTCHA token
    const [captchaError, setCaptchaError] = useState<string | null>(null); // Store reCAPTCHA error

    // Fetch countries from the API
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

    // Handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        // Handle support type checkboxes
        if (type === "checkbox") {
            const updatedSupportTypes = checked ? [...formData.supportTypes, name] : formData.supportTypes.filter((item) => item !== name);
            setFormData((prev) => ({ ...prev, supportTypes: updatedSupportTypes }));
            return;
        }

        // Handle regular input changes
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Handle file upload
        if (name === 'fileUpload' && type === 'file') {
            const target = e.target as HTMLInputElement; // Narrow the type
                if (target.files && target.files[0]) {
                    setFormData((prev) => ({ ...prev, fileUpload: target.files[0] }));
                }
                return;
            }

        // Email verification using regular expression
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
            if (!emailRegex.test(value)) {
                setEmailError("Please enter a valid email address");
            } else {
                setEmailError("");
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        // Check if the CAPTCHA token is expired (you can add server-side verification)
        if (isCaptchaExpired(captchaToken)) {
            setCaptchaError("The reCAPTCHA token has expired. Please complete the CAPTCHA again.");
            // Optionally, you can reset the token and ask the user to complete the CAPTCHA again.
            setCaptchaToken(null); // Clear the old token
            return;
        }

        setIsSubmitted(true); // Start submitting the form

        try {
            // Submit reCAPTCHA token to backend for verification
            const response = await fetch('/verify-captcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: captchaToken })
            });

            const data = await response.json();
            if (data.success) {
                console.log('reCAPTCHA verified, proceed with form submission');

                // Proceed with form submission logic
                const formDataToSend = { ...formData, captchaToken: captchaToken };
                await axios.post('/api/submit', formDataToSend);
                setIsSubmitted(true); // Form successfully submitted
            } else {
                setCaptchaError("reCAPTCHA verification failed. Please try again.");
            }
        } catch (err) {
            console.error('Error during form submission', err);
            setCaptchaError("An error occurred while submitting the form. Please try again.");
        } finally {
            setIsSubmitted(false); // Stop submitting the form
        }
    };

     // Helper function to check if CAPTCHA token is expired (this logic can be enhanced)
     const isCaptchaExpired = (token: string): boolean => {
        // Typically, you will need to validate this server-side.
        // reCAPTCHA tokens have an expiration time (2 minutes by default)
        const tokenExpirationTime = 120; // Token expires after 2 minutes
        const tokenTime = Date.now() / 1000; // Current time in seconds

        // You would typically store the token's creation time when it's generated and check its expiration
        // Assuming `captchaTokenTime` is a timestamp when the token was first received
        const captchaTokenTime = localStorage.getItem("captchaTokenTime");

        if (captchaTokenTime) {
            const timePassed = tokenTime - Number(captchaTokenTime);
            return timePassed > tokenExpirationTime;
        }

        return false;
    };


    // Handle donation method change
    const handleDonationMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectMethod = e.target.value;
        setFormData((prev) => ({ ...prev, donationMethod: selectMethod }));

        // If "card" is selected, redirect to the donation page
        if (selectMethod === "card") {
            window.location.href = "https://members.faithpays.org/donate/FP8588921";
        }
    };
   
     // Handle captcha change
     const handleCaptchaChange = (value: string | null) => {
        setCaptchaToken(value); // Store the reCAPTCHA token
        localStorage.setItem("captchaTokenTime", (Date.now() / 1000).toString()); // Store token time
    };

    // Load reCAPTCHA v3 script and generate token on form submission
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LdqovQqAAAAALrtVgVzP3czr6ut5F9-PKXcuwrV'; // Your reCAPTCHA v3 site key
        script.async = true;
        document.body.appendChild(script);

        // Cleanup function to remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Generate reCAPTCHA token on form submission
    const generateRecaptchaToken = async () => {
        if (!window.grecaptcha) {
            console.error('reCAPTCHA not loaded');
            return;
        }

        const token = await window.grecaptcha.execute('6LdqovQqAAAAALrtVgVzP3czr6ut5F9-PKXcuwrV', { action: 'submit_form' });
        setCaptchaToken(token);
        localStorage.setItem("captchaTokenTime", (Date.now() / 1000).toString()); // Store token time
    };
        
    // Render the form data
    return (
        <div className="partnership-container">
            <h2 className="partnership-heading">Partnership Form</h2>
            <form className="partnership-form" onSubmit={handleSubmit}>
                <label className="partnership-label">First Name</label>
                <input className="partnership-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label className="partnership-label">Last Name</label>
                <input className="partnership-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label className="partnership-label">Email Address</label>
                <input className="partnership-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                {emailError && <span className="error">{emailError}</span>}

                <label className="partnership-label">Phone Number</label>
                <input className="partnership-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                <label className="partnership-label">Address</label>
                <input className="partnership-input" type="text" name="address" value={formData.address} onChange={handleChange} required />

                <label className="partnership-label">Country</label>
                <select className="partnership-select" name="country" value={formData.country} onChange={handleChange} required>
                    <option value="" disabled>Select Country</option>
                    {loading ? <option>Loading...</option> : countries.map((country) => <option key={country}>{country}</option>)}
                </select>

                {/* Support types (checkboxes) */}
                <label className="partnership-label">How would you like to support the church?</label>
                <div className="checkbox-group">
                    <input className="partnership-checkbox" type="checkbox" name="Financial donation" onChange={handleChange} /> Financial Donation
                    <input className="partnership-checkbox" type="checkbox" name="Volunteering" onChange={handleChange} /> Volunteering
                    <input className="partnership-checkbox" type="checkbox" name="Clothes/Shoes/Food" onChange={handleChange} /> Clothes/Shoes/Food
                    <input className="partnership-checkbox" type="checkbox" name="Other" onChange={handleChange} /> Other
                </div>

                {formData.supportTypes.includes("Other") && (
                    <input className="partnership-input" type="text" name="customDonation" placeholder="Please specify" onChange={handleChange} />
                )}

                {formData.supportTypes.includes("Financial donation") && (
                    <>
                        <label className="partnership-label">Donation Method</label>
                        <select className="partnership-select" name="donationMethod" value={formData.donationMethod} onChange={handleDonationMethodChange}>
                            <option value="" disabled>Select Method</option>
                            <option value="card">Credit/Debit Card</option>
                            <option value="wire">Bank/Wire Transfer</option>
                            <option value="cash">Cash</option>
                        </select>
                    </>
                )}

                {(formData.donationMethod === "wire" || formData.donationMethod === "cash") && (
                    <div className="contact-info">
                        <p>
                            Please contact the church at <b>431-123-4567</b> or email{" "}
                            <a href="mailto:kingmakersinternationalministries@gmail.com">kingmakersinternationalministries@gmail.com</a>
                        </p>
                        <input className="partnership-checkbox" type="checkbox" name="confirmCashDonation" onChange={handleChange} required />
                        <p className="partnership-p">I have read the advisory message and understand that I need to contact the church for delivery instructions</p>
                    </div>
                )}

                <label className="partnership-label">Donation Frequency:</label>
                <select className="partnership-select" name="donationFrequency" value={formData.donationFrequency} onChange={handleChange}>
                    <option value="" disabled>Select Frequency</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Bi-annually">Bi-annually</option>
                    <option value="Annually">Annually</option>
                </select>

                {/* File Upload */}
                <label className="partnership-label">Upload a document (optional)</label>
                <input type="file" name="fileUpload" onChange={handleChange} />

                <div className='privacy'><b>PRIVACY</b>
                    <p className='privacy-p'>
                    This message aims to inform you about how we collect, use, and protect your personal information. We are committed to protecting your privacy and ensuring the security of your data, as outlined in our comprehensive privacy policy. 
                    </p>
                </div>

                {/* Captcha */}
                <div id="captcha-container"></div>               

                <button className="submit-button" type="submit">{isSubmitted ? "Submitted!" : "Submit"}</button>
            </form>
        </div>
    );
};

export default Partnership;
