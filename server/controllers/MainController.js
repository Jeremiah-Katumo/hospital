const mysql = require('mysql2'); // Import mysql2 package
const pluralize = require('pluralize'); // Pluralize package
const FeatureLibrary = require('./libs/FeatureLibrary'); // Custom class for navigation
import db, { conn } from '../database/dbConnection.js';

// Function to fetch field names from a table
const getFieldNames = async (tableName) => {
    return new Promise((resolve, reject) => {
        const query = `DESCRIBE ${tableName}`; // This MySQL query gives the column names
        conn.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const fields = results.map(row => row.Field); // Extract column names
                resolve(fields);
            }
        });
    });
};

// Main function to get page data and render the view
export const getPageData = async (req, res) => {
    const { data, id } = req.body; // Assuming data comes from a POST request

    let pageData = {
        result: Array.isArray(data) || typeof data === 'object' ? data : {},
        feature: req.feature, // Feature dynamically set in Express route (example: req.feature = 'dashboard')
        action: req.action,   // Action dynamically set in Express route
        id: req.id,           // ID dynamically set in Express route
        parent_id: req.parent_id, // Parent ID dynamically set in Express route
        tableName: req.tableName, // Table name dynamically set in Express route
    };

    // Determine the view to render
    let viewPath = `${req.feature}/${req.action}.ejs`; // Assuming this folder structure for views
    if (!fs.existsSync(`views/${viewPath}`)) {
        viewPath = `templates/${req.action}.ejs`; // Fallback to default templates folder
    }

    // If errors are present in the data, override the view with an error page
    if (data && data.errors) {
        viewPath = 'errors/html/error_403.ejs';
    }

    pageData.view = viewPath;

    // Handling fields (similar to $this->listQueryFields in PHP)
    if (req.listQueryFields && req.listQueryFields.length > 0) {
        pageData.fields = req.listQueryFields;
    } else {
        try {
            const tableFields = await getFieldNames(pluralize(req.feature)); // Fetch fields from MySQL table
            const filteredFields = tableFields.filter(field => !req.history_fields.includes(field));
            pageData.fields = filteredFields;
        } catch (err) {
            console.error('Error fetching field names:', err);
            pageData.fields = []; // In case of error, set an empty fields array
        }
    }

    // Fetch navigation items using your feature library
    const featureLibrary = new FeatureLibrary();
    pageData.navigationItems = featureLibrary.navigationItems();

    // Render the view with the prepared data
    res.render(viewPath, pageData); // EJS rendering
};
