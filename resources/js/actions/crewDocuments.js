import client from "../api/client";

export const getCrewDocuments = async (crewId) => {
    try {
        const response = await client.get(`/api/crew-documents/${crewId}`);
        return response
    } catch (error) {
        console.log(error.response);
    }
};

