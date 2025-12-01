const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCustomer = async (req, res) => {
    try {
        const { name, phone, email, city } = req.body;
        const customer = await prisma.customer.create({
            data: { name, phone, email, city },
        });
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await prisma.customer.findMany();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
