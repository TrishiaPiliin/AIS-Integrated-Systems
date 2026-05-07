const LEGACY_API = 'https://ais-simulated-legacy.onrender.com/api';

export const create = async (profile) => {
    const transformedProfile = {
        name: profile.firstName + " " + profile.lastName,
        birthdate: profile.dob,
        program: profile.course + " " + profile.major,
        address: profile.address || "",
        studentStatus: profile.status
    };

    const response = await fetch(`${LEGACY_API}/students`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedProfile)
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const error = new Error(err.message || 'Failed to create student in legacy system');
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
};

export const getById = async (id) => {
    const response = await fetch(`${LEGACY_API}/students/${id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        const error = new Error('Student not found in legacy system');
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
};

export const getAll = async () => {
    const response = await fetch(`${LEGACY_API}/students`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        const error = new Error('Failed to fetch students from legacy system');
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
};