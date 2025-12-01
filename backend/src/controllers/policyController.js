const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPolicy = async (req, res) => {
    try {
        const { customerId, policyType, premiumAmount, startDate, endDate, status } = req.body;
        const policy = await prisma.policy.create({
            data: {
                customerId: parseInt(customerId),
                policyType,
                premiumAmount: parseFloat(premiumAmount),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
            },
        });
        res.status(201).json(policy);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPoliciesByCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const policies = await prisma.policy.findMany({
            where: { customerId: parseInt(customerId) },
        });
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchPolicies = async (req, res) => {
    try {
        const { policy_type, status, city } = req.query;
        const where = {};

        if (policy_type) where.policyType = { contains: policy_type };
        if (status) where.status = status;
        if (city) {
            where.customer = {
                city: { contains: city }
            };
        }

        const policies = await prisma.policy.findMany({
            where,
            include: {
                customer: true,
            },
        });
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePolicy = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.policy.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
