var env = process.env.NODE_ENV || 'development'; /* Get current environment */
var config = require('../config/dbConfig')[env]; /* Get config based on environment */

var mongo = require("mongoose"), /* mongoose for mongodb */
	restful = require('node-restful');

const Schema = mongo.Schema; /* Assign schema object to private variable */
const ObjectId = Schema.Types.ObjectId; /* Assign ObjectId object to private variable */

module.exports = function(app) {
	/* --------------------- Customer Model --------------------- starts */

	/* Definig schema for customer */
	customersSchema = new mongo.Schema({
		name: String,
		first_name: String,
		last_name: String,
		title: String,
	    logo_id: String,
	    company_no:String,
		gst_no: String,
	    email: String,
	    addresses: Object,
	    contact_numbers: Object,
	    fax: String,
	    website_url: String,
	    invoice_language_id: String,
	    payment_terms: String,
	    tax_id: Boolean,
	    type: String,
	    is_active: Boolean,
	    created_by: ObjectId,
	    updated_by: ObjectId,
	    deleted_by: ObjectId,
	    deleted_on: Date
	}, {timestamps: true});

	/* Creating restful model for customer with respective schema */
	var customers = restful.model('companies', customersSchema);

	/* Defining methods for the model */
	var customersResource = app.resource = customers.methods(['get', 'post', 'put', 'delete']);

	/* Registering the customer restful model */
	customersResource.register(app, '/customers');

	/* --------------------- Customer Model --------------------- ends */
}