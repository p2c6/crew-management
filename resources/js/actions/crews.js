import client from "../api/client";

export const createCrew = async (payload) => {
    try {
        const response = await client.post("/api/crews", payload);
        return response
    } catch (error) {
        return error.response.data
    }
};

export const getCrews = async () => {
    try {
        const response = await client.get("/api/crews");
        return response
    } catch (error) {
        return error
        console.log(error.response);
    }
};

export const getCrew = async (crewId) => {
    try {
        const response = await client.get(`/api/crews/${crewId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const updateCrew = async (crewId, payload) => {
    try {
        const response = await client.put(`/api/crews/${crewId}`, payload);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const deleteCrew = async (crewId) => {
    try {
        const response = await client.delete(`/api/crew/${crewId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};


