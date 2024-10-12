const mockClient = {
  auth: {
    getUser: async () => ({ user: { id: 'mock-user-id', email: 'mock@example.com' } }),
  },
  // Add other methods as needed
};

export default mockClient;