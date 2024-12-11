import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import {  Link } from 'react-router-dom'


const EMAILJS_USER_ID = 'RbnxvBNkLv2JZlm7o';
const EMAILJS_TEMPLATE_ID = 'template_bc1emau';
const EMAILJS_SERVICE_ID = 'service_06sz21y';

function EmailForm() {
  
  const [kasharInputs, setKasharInputs] = useState({
    shellKubili: '',
    shellKiraRoad: '',
    shellStretcher: '',
  });

  const [karagoInputs, setKaragoInputs] = useState({
    shellSonde: '',
    shellNangabo: '',
    shellKyengera: '',
    shellMunyonyo: '',
    shellBweyogerere: '',
    shellKyanja: '',
    shellTula: '',
  });

  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInputs, setFocusedInputs] = useState({});

  const handleInputChange = (e, sectionSetter) => {
    const { name, value } = e.target;

    const rawValue = value.replace(/,/g, '');
    if (!/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(rawValue) && rawValue !== '') {
      return;
    }

    const numericValue = rawValue.replace(/[^0-9.]/g, '');
    const formattedValue = numericValue
      ? parseFloat(numericValue).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })
      : '';

    sectionSetter((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFocus = (name) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (name) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};

    Object.entries(kasharInputs).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required.';
      }
    });

    Object.entries(karagoInputs).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   ////////////////////////////////////////// store data in the fire bess start//////////////////////////////////////////////////////////////
   async function handleStoreData() {
    try {
      const kasharSum = Object.values(kasharInputs)
        .map((value) => parseFloat(value.replace(/,/g, '')) || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const karagoSum = Object.values(karagoInputs)
        .map((value) => parseFloat(value.replace(/,/g, '')) || 0)
        .reduce((acc, curr) => acc + curr, 0);
      // Define the data structure
      const data = [
        {
          ...kasharInputs,
          ...karagoInputs,
          kasharSum: kasharSum.toLocaleString('en-US', { maximumFractionDigits: 2 }),
          karagoSum: karagoSum.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        
          comment,
          Date: Timestamp.now(), // Store the current timestamp,
        },
        // Add more objects for each row in the image
      ];
  
      // Store the data in Firestore
      for (const row of data) {
        await addDoc(collection(db, 'cardmoney'), row);
      }
  
      console.log('Data stored in Firestore successfully!');
    } catch (error) {
      console.error('Error storing data in Firestore:', error);
    }
  }
  ////////////////////////////////  store data in fire store  end///////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const kasharSum = Object.values(kasharInputs)
        .map((value) => parseFloat(value.replace(/,/g, '')) || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const karagoSum = Object.values(karagoInputs)
        .map((value) => parseFloat(value.replace(/,/g, '')) || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const templateParams = {
        ...kasharInputs,
        ...karagoInputs,
        kasharSum: kasharSum.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        karagoSum: karagoSum.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        comment,
        recipient: 'muyombadavid148@gmail.com',
      };
/////////////////send email//////////
     //await emailjs.send(
      //  EMAILJS_SERVICE_ID,
      //  EMAILJS_TEMPLATE_ID,
       // templateParams,
       // EMAILJS_USER_ID
     // );
      handleStoreData()

      setKasharInputs({
        shellKubili: '',
        shellKiraRoad: '',
        shellStretcher: '',
      });

      setKaragoInputs({
        shellSonde: '',
        shellNangabo: '',
        shellKyengera: '',
        shellMunyonyo: '',
        shellBweyogerere: '',
        shellKyanja: '',
        shellTula: '',
      });

      setComment('');

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
 

  const renderInputField = (value, name, sectionSetter) => {
    const formatLabel = (label) =>
      label.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    const isFocused = focusedInputs[name] || value !== '';
    

    return (
      
      <div className="input-wrapper">
        
        <div className={`floating-label-group ${isFocused ? 'focused' : ''}`}>
          <input
            type="text"
            name={name}
            value={value}
            onChange={(e) => handleInputChange(e, sectionSetter)}
            onFocus={() => handleFocus(name)}
            onBlur={() => handleBlur(name)}
            className="form-input"
          />
          <label className="floating-label">{formatLabel(name)}</label>
        </div>
        {errors[name] && <small className="error-text">{errors[name]}</small>}
      </div>
    );
  };

  return (
    <div className="email-form-container">
      <h1 className="main-title">Fuel Card for Kashar and Karago</h1>
      
             <div className="linktodata1" ><Link to="/data" className="linktodata">Check Data</Link></div> 
      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-section">
          <h2>Kashar Stations</h2>
          <div className="input-group">
            {Object.keys(kasharInputs).map((key) =>
              renderInputField(kasharInputs[key], key, setKasharInputs)
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Karago Stations</h2>
          <div className="input-group">
            {Object.keys(karagoInputs).map((key) =>
              renderInputField(karagoInputs[key], key, setKaragoInputs)
            )}
          </div>
        </div>

        <div className="input-wrapper">
          <div className={`floating-label-group ${comment ? 'focused' : ''}`}>
            <textarea
              name="comment"
              placeholder='Add Comment '
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => handleFocus('comment')}
              onBlur={() => handleBlur('comment')}
              className="form-input"
            />
            <label className="floating-label">Add Comment (Optional)</label>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Stations Data'}
        </button>
      </form>
      
    </div>
  );
}

export default EmailForm;
