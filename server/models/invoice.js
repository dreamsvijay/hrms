var env = process.env.NODE_ENV || 'development'; /* Get current environment */
var config = require('../config/dbConfig')[env]; /* Get config based on environment */

var mongo = require("mongoose"), /* mongoose for mongodb */
	restful = require('node-restful');

const Schema = mongo.Schema; /* Assign schema object to private variable */
const ObjectId = Schema.Types.ObjectId; /* Assign ObjectId object to private variable */

module.exports = function(app) {
	/* --------------------- Invoice Model --------------------- starts */

	/* Definig schema for invoice */
	invoiceSchema = new mongo.Schema({
		estimate_uid: String,
		header_title: String,
		project_id: ObjectId,
		tax_id: ObjectId,
	    estimate_date: Date,
	    estimate_language_id: ObjectId,
	    estimate_currency_id: ObjectId,
	    invoice_date: Date,
	    payment_terms: String,
	    due_date: Date,
	    exchange_rate: String,
	    expiry_date: Date,
	    discount: String,
	    message: String,
	    foot_note: String,
	    status: String,
	    is_ready: Boolean,
	    created_by: ObjectId,
	    updated_by: ObjectId,
	    deleted_by: ObjectId,
	    deleted_on: Date
	}, {timestamps: true});

	/* Creating restful model for invoice with respective schema */
	var invoice = restful.model('estimates', invoiceSchema);

	/* Defining methods for the model */
	var invoiceResource = app.resource = invoice.methods(['get', 'post', 'put', 'delete']);

	/* Registering the invoice restful model */
	invoiceResource.register(app, '/invoice');

	/* --------------------- invoice Model --------------------- ends */
}