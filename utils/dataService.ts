export const fetchPreloadedData = async () => {
    const response = await fetch('/path/to/faq.json'); // Load from a static JSON file
    return response.json();
};