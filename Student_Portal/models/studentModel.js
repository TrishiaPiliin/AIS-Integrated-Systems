const ADAPTER_URL = process.env.ADAPTER_URL || 'http://localhost:4000';

export const createStudent = async (studentData) => {
    const response = await fetch(`${ADAPTER_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const error = new Error(err.error || 'Failed to create student record.');
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
};

export const getStudentProfile = async (studentId) => {
    const response = await fetch(`${ADAPTER_URL}/auth/students/${studentId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        const error = new Error('Student profile not found.');
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
};

export const getAllProfiles = async () => {
    const response = await fetch(`${ADAPTER_URL}/auth/students`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Could not retrieve student list.');
    }

    return await response.json();
};