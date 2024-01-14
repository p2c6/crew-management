import client from "../api/client";

export const createRank = async (payload) => {
    try {
        const response = await client.post("/api/rank", payload);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const getRanks = async () => {
    try {
        const response = await client.get("/api/ranks");
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const getRank = async (rankId) => {
    try {
        const response = await client.get(`/api/rank/${rankId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const updateRank = async (rankId, payload) => {
    try {
        const response = await client.put(`/api/rank/${rankId}`, payload);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const deleteRank = async (rankId) => {
    try {
        const response = await client.delete(`/api/rank/${rankId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};


