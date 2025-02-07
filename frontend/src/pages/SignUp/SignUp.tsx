import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignUp.css';
    
    // Define the type for the country data returned from the API
    interface Country {
    name: {
        common: string; // We are only interested in the 'common' name of each country
    };
    }
    
    const SignUp: React.FC = () => {
    // Initial form state

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        supportTypes: [],
        donationAmount: '',
        contributionFrequency: '',
        donationMethod: '',
        receiveUpdates: false,
        receiveEvents: false,
        prayerRequest: '',
        confirmCashDonation: false, // New state for Cash confirmation checkbox
        cardNumber: '',
        expiryDate: '', // Combined expiry date field
        cvv: '',
        paypalEmail: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        wireTransferDetails: '',
    });
    
    // State to store the list of countries fetched from the API
    const [countries, setCountries] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state while fetching countries
    const [cardError, setCardError] = useState<string>(''); // Error message for card validation
    
    // useEffect to fetch countries when the component is mounted
    useEffect(() => {
        const fetchCountries = async () => {
        try {
            // Fetch country data from the API and type the response as an array of Country objects
            const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');    
            // Extract the 'common' name of each country and store them in the 'countries' state
            const countryNames = response.data.map((country) => country.name.common);    
            // Sort the country names alphabetically
            countryNames.sort((a, b) => a.localeCompare(b));    
            // Update the state with the sorted country names
            setCountries(countryNames);
            setLoading(false); // Set loading to false once data is fetched
        } catch (err) {
            console.error('Error fetching countries', err);
            setLoading(false); // In case of error, stop loading
        }
        };    
        fetchCountries(); // Call the fetchCountries function when component mounts
    }, []); // Empty dependency array ensures this runs once when the component mounts
    
    // Function to handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
    
        // If the input is a checkbox, update its checked status
        if (type === 'checkbox') {
        setFormData({
            ...formData,
            [name]: checked,
        });

        } else {
        // Bank Name validation: only alphabet characters
        if (name === 'bankName' && !/^[A-Za-z\s]*$/.test(value)) {
            return; // Revert the value if it contains anything other than letters or spaces
        }    
        // Account and Routing Number validation: only numbers allowed
        if ((name === 'accountNumber' || name === 'routingNumber') && /\D/.test(value)) {
            return; // Revert the value if it contains anything other than digits
        }    
        // Special validation for expiryDate input (MM/YY)
        if (name === 'expiryDate') {
            const [month, year] = value.split('/');
            const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year (e.g., 25 for 2025)
            const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)    
            // Validate month (01-12)
            if (month && (parseInt(month, 10) > 12 || parseInt(month, 10) < 1)) {
                return;
            }
    
            // Validate year (not less than current year)
            if (year && parseInt(year, 10) < currentYear) {
                return;
            }
    
            // Validate if the year is the current year, the month must not be in the past
            if (year && parseInt(year, 10) === currentYear && month && parseInt(month, 10) < currentMonth) {
                return;
            }
        }
    
        // For all other input types, update the value
        setFormData({
            ...formData,
            [name]: value,
        });
        }
    };    
    
    // Card validation using Luhn's algorithm
    const validateCard = (cardNumber: string) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };
    
    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior    
        // Perform card validation if the method is 'Debit/ Credit Card'
        if (formData.donationMethod === 'online' && !validateCard(formData.cardNumber)) {
        setCardError('Invalid card details'); // Set error message for invalid card
        return;
        } else {
        setCardError(''); // Clear error message if card is valid
        }    
        console.log('Form Submitted:', formData); // Log the form data to the console (You could replace this with an API call)
    };
    
    return (
    <div className='form-container'>
    <h2 className='form-title'>Partnership Form</h2>
    <form onSubmit={handleSubmit} className='partner-form'>

            {/* Personal Information Section */}
    <section className='section'>
    <h3>Personal Information</h3>    
            {/* First Name */}
    <label>

        First Name:
    <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder='First Name'
        required
        />
    </label>    
        {/* Last Name */}
    <label>

        Last Name:
    <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder='Last Name'
        required
        />
    </label>    
        {/* Email Address */}
    <label>

        Email Address:
    <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder='Your Email Address'
        required
        />
    </label>    
            {/* Phone Number */}
    <label>

        Phone Number:
    <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder='Phone Number'
        />
    </label>    
            {/* Street Address */}
    <label>

        Street Address:
    <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder='Street, City, State'
        required
        />
    </label>    
            {/* Country Selection */}
    <label>

        Country:
    <select
        name="country"
        value={formData.country}
        onChange={handleChange}
        disabled={loading}
        required
    >
    <option value=''>Select Country</option>
        {loading ? (
    <option>Loading countries...</option>
        ) : (
        countries.map((country, index) => (
    <option key={index} value={country}>
        {country}
    </option>
        ))
    )}
    </select>
    </label>
    </section>    
        {/* Partnership Details Section */}
    <section className='section'>
    <h3>Partnership Details</h3>    
        {/* Support Type Selection */}
    <label>

        How would you like to support the church?
    <select
        name="supportTypes"
        value={formData.supportTypes}
        onChange={handleChange}
        required
        >
        <option value='financial'>Financial Donation</option>
        <option value='volunteer'>Volunteering</option>
        <option value='event-sponsorship'>Clothes/shoes Donation</option>
        <option value='other'>Other</option>
        </select>
        </label>
    
     
          {/* Donation Amount */}
    <label>

        Donation Amount:
    <input
        type="number"
        name="donationAmount"
        value={formData.donationAmount}
        onChange={handleChange}
        placeholder='Enter Donation Amount'
        required
    />
    </label>

    {/* Contribution Frequency */}
    <label>

    Contribution Frequency:
    <select
        name="contributionFrequency"
        value={formData.contributionFrequency}
        onChange={handleChange}
        required
        >
        <option value='one-time'>One-time Donation</option>
        <option value='monthly'>Monthly</option>
        <option value='quarterly'>Quarterly</option>
        <option value='bi-annually'>Bi-Annually</option>
        <option value='annually'>Annually</option>
    </select>
    </label>

            {/* Donation Method */}
    <label>

        Donation Method:
    <select
        name="donationMethod"
        value={formData.donationMethod}
        onChange={handleChange}
        required
    >
        <option value='' disabled>Select Donation Method</option>
        <option value='online'>Debit/ Credit Card</option>
        <option value='bank-transfer'>Bank Transfer</option>
        <option value='wire-transfer'>Wire Transfer</option>
        <option value='paypal'>PayPal</option>
        <option value='cash'>Cash</option>
    </select>
    </label>

    {/* Conditional form for Debit/ Credit Card */}
        {formData.donationMethod === 'online' && (
        <div>
    <label>

        Card Number:
    <input
        type="text"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={(e) => {
            let value = e.target.value.replace(/\D/g, '');
        // Update the formatted value
        if (value.length <= 16) {
            setFormData({
               ...formData,
                cardNumber: value,
            });
        }
      }}
        maxLength={16}
        required
        />
    </label>

    <label>
        Expiry Date (MM/YY):
    <input
        type="text"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
            let formattedValue = value;

            // Automatically format the input MM/YY as the user types
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.slice(0,2)}/${formattedValue.slice(2, 4)}`;
            }

            // Validate the expiry date format and prevent invalid input
            if (formattedValue.length <=5) {
                const [month, year] = formattedValue.split ('/');
            }
            // Update expiryDate in formData only if the form is valid
            if (formattedValue.length <= 5) {
                setFormData({
                    ...formData,
                    expiryDate: formattedValue,
                });
            }
        }}
        placeholder='MM/YY'
        maxLength={5}
        required
        />
    </label>
    <label>

        CVV:
    <input
        type="text"
        name="cvv"
        value={formData.cvv}
        onChange={(e) => {
            // Get the input value
            let value = e.target.value;
            // Permit only numeric characters
            if (/^\d{0,3}$/.test(value)) {
                setFormData({
                   ...formData,
                    cvv: value,
                });    
            }
        }}
        maxLength={3}
        required
        />
    </label>

    {cardError && <p className="error">{cardError}</p>}
    </div>
    )}

    {/* Conditional form for Bank Transfer */}

    {formData.donationMethod === 'bank-transfer' && (
    <div>
    <label>
        Bank Name:
    <input
        type="text"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        required
        />
    </label>
    <label>

        Account Number:
    <input
        type="text"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        required
        />
    </label>
    <label>

        Routing Number:
    <input
        type="text"
        name="routingNumber"
        value={formData.routingNumber}
        onChange={handleChange}
        required
        />
    </label>
    </div>

    )}

    {/* Conditional form for Wire Transfer */}

    {formData.donationMethod === 'wire-transfer' && (
    <div>
    <label>

        Bank Name:
    <input
        type="text"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        required
        />
    </label>
    <label>

        Account Number:
    <input
        type="text"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        required
        />
    </label>
    <label>

        Routing Number:
    <input
        type="text"
        name="routingNumber"
        value={formData.routingNumber}
        onChange={handleChange}
        required
        />
    </label>
    </div>
    )}

    {/* Conditional form for PayPal */}

    {formData.donationMethod === 'paypal' && (
    <div>
    <label>

        PayPal Email:
    <input
        type="email"
        name="paypalEmail"
        value={formData.paypalEmail}
        onChange={handleChange}
        required
        />
    </label>
    </div>

    )}

    {/* Conditional form for Cash */}

    {formData.donationMethod === 'cash' && (
    <div>
    <label>

        Donation Amount:
    <input
        type="number"
        name="donationAmount"
        value={formData.donationAmount}
        onChange={handleChange}
        placeholder="Enter Cash Donation Amount"
        required
        />
    </label>
    <p>
    <strong>For Cash donations, please contact us to arrange the most convenient delivery method:</strong>
    </p>
    <p>Call us at: <a href="tel:4311234567">431-123-4567</a></p>
    <p>Or email us at: <a href="mailto:kingmakersinternationalministries@gmail.com">kingmakersinternationalministries@gmail.com</a></p>
    <label>
    <input
        type="checkbox"
        name="confirmCashDonation"
        checked={formData.confirmCashDonation}
        onChange={handleChange}
        required
        />

        I have read the advisory message and understand that I need to contact the church for delivery instructions.
    </label>
    </div>

    )}
    </section>

    {/* Prayer Request Section */}
    <section className='section'>
    <h3>Prayer Request</h3>
    <label>

    Prayer request (optional):
    <textarea
    name="prayerRequest"
    value={formData.prayerRequest}
    onChange={handleChange}
    placeholder='Prayer Request'
    />
    </label>
    </section>

    {/* Submit Button */}
    <button type='submit' className='submit-btn'>Become a Partner</button>
    </form>
    </div>

    );

    };

    export default SignUp;
