const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
    getCustomers: async () => {
        const res = await fetch(`${API_BASE_URL}/customers`);
        return res.json();
    },
    createCustomer: async (data) => {
        const res = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },
    getPolicies: async (customerId) => {
        const res = await fetch(`${API_BASE_URL}/customers/${customerId}/policies`);
        return res.json();
    },
    createPolicy: async (data) => {
        const res = await fetch(`${API_BASE_URL}/policies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },
    searchPolicies: async (filters) => {
        const params = new URLSearchParams(filters).toString();
        const res = await fetch(`${API_BASE_URL}/policies/search?${params}`);
        return res.json();
    },
    deletePolicy: async (id) => {
        await fetch(`${API_BASE_URL}/policies/${id}`, {
            method: 'DELETE',
        });
    },
};
