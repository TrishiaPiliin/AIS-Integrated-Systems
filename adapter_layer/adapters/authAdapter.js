export const create = async (profile) => {
  const transformedProfile = {
    name: profile.firstName + ' ' + profile.lastName,
    birthdate: profile.dob,
    program: profile.course + ' ' + profile.major,
    address: profile.address || '',   
    studentStatus: profile.status
  };

  const response = await fetch(
    'https://ais-simulated-legacy.onrender.com/api/students',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transformedProfile)
    }
  );

  if (!response.ok) {                
    throw new Error(`Legacy API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};