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
