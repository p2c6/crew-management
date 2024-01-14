import client from "../api/client";

export const createDocument = async (payload) => {
    try {
        const response = await client.post("/api/document", payload);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const getDocuments = async () => {
    try {
        const response = await client.get("/api/documents");
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const getDocument = async (documentId) => {
    try {
        const response = await client.get(`/api/document/${documentId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const updateDocument = async (documentId, payload) => {
    try {
        const response = await client.put(`/api/document/${documentId}`, payload);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

export const deleteDocument = async (documentId) => {
    try {
        const response = await client.delete(`/api/document/${documentId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};


