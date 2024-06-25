import React, { useState, useEffect } from 'react';

const fetchPackageDetails = async (npmPackageName) => {
    const url = `https://registry.npmjs.org/${npmPackageName}/latest`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching package details for ${npmPackageName}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch package details:', error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  };

const NpmPackageDetails = ({ packageName }) => {
    const [packageDetails, setPackageDetails] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getPackageDetails = async () => {
        try {
          const data = await fetchPackageDetails(packageName);
          setPackageDetails(data);
        } catch (err) {
          setError(err.message);
        }
      };
  
      getPackageDetails();
    }, [packageName]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!packageDetails) {
      return <div>Loading...</div>;
    }
  
    return (
    <div>
      <h3>Package Details: {packageName}</h3>
      <p><strong>Version:</strong> {packageDetails.version}</p>
      <p><strong>Description:</strong> {packageDetails.description}</p>
      <p><strong>Author:</strong> {packageDetails.author?.name}</p>
      <p><strong>HomeUrl:</strong> {packageDetails.homepage}</p>
      <p><strong>License:</strong> {packageDetails.license}</p>
    </div>
  );
};

export default NpmPackageDetails;