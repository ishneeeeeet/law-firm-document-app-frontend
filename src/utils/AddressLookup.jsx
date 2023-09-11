import { useState } from 'react';
import axios from 'axios';

const AddressLookup = () => {
  const [inputAddress, setInputAddress] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const apiKey = 'AIzaSyArvkD9q7yt2KaU3-567Ga7Jf8w7-7J3Z4';

  const handleAddressLookup = () => {
    const encodedAddress = encodeURIComponent(inputAddress);
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.status === 'OK' && data.results.length > 0) {
          const result = data.results[0];
          setFormattedAddress(result.formatted_address);

          const cityComponent = result.address_components.find(
            (component) => component.types.includes('locality')
          );
          const stateComponent = result.address_components.find(
            (component) => component.types.includes('administrative_area_level_1')
          );
          const postalCodeComponent = result.address_components.find(
            (component) => component.types.includes('postal_code')
          );

          setCity(cityComponent ? cityComponent.long_name : 'N/A');
          setState(stateComponent ? stateComponent.long_name : 'N/A');
          setPostalCode(postalCodeComponent ? postalCodeComponent.long_name : 'N/A');
        } else {
          console.error('Geocoding API request failed.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Address Lookup</h1>
      <input
        type="text"
        placeholder="Enter an address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button onClick={handleAddressLookup}>Lookup Address</button>

      {formattedAddress && (
        <div>
          <h2>Formatted Address:</h2>
          <p>{formattedAddress}</p>
          <h2>City:</h2>
          <p>{city}</p>
          <h2>State:</h2>
          <p>{state}</p>
          <h2>Postal Code:</h2>
          <p>{postalCode}</p>
        </div>
      )}
    </div>
  );
};

export default AddressLookup;
