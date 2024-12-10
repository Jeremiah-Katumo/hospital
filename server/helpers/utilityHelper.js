export const hashDecode = (hash) => parseInt(hash, 10); // Example decode logic
export const singular = (word) => word.replace(/s$/, '');
export const plural = (word) => `${word}s`;
export const getEnumOptions = (tableName, columnName) => {
    // Logic to retrieve ENUM options
    return ['Option1', 'Option2'];
};
