import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Partnership.css';


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

   

    // Handle donation method change
    const handleDonationMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectMethod = e.target.value;
        setFormData((prev) => ({ ...prev, donationMethod: selectMethod }));

        // If "card" is selected, redirect to the donation page
        if (selectMethod === "card") {
            window.location.href = "https://members.faithpays.org/donate/FP8588921";
        }
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
                
                <button className="submit-button" type="submit">{isSubmitted ? "Submitted!" : "Submit"}</button>
            </form>
        </div>
    );
};

export default Partnership;
