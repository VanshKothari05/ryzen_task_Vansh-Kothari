const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const customerController = require('./controllers/customerController');
const policyController = require('./controllers/policyController');

app.post('/api/customers', customerController.createCustomer);
app.get('/api/customers', customerController.getAllCustomers);

app.post('/api/policies', policyController.createPolicy);
app.get('/api/customers/:customerId/policies', policyController.getPoliciesByCustomer);
app.get('/api/policies/search', policyController.searchPolicies);
app.delete('/api/policies/:id', policyController.deletePolicy);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = prisma;
