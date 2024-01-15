export const getDocumentURL = (folder, filename) => {
    try {
        return `/storage/uploads/${folder}/${filename}`;
    } catch (error) {
        console.log(error);
        return null;
    }
};
