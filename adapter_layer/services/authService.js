import * as AuthAdapter from '../adapters/authAdapter.js';

export const registerStudent = async (studentProfile) => {
    const { firstName, lastName, dob, course, major, status } = studentProfile;

    if (!firstName || !lastName || !dob || !course || !major || !status) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
    }

    return await AuthAdapter.create(studentProfile);
};

export const getStudentById = async (id) => {
    return await AuthAdapter.getById(id);
};

export const getAllStudents = async () => {
    return await AuthAdapter.getAll();
};