export const createClient = jest.fn(() => ({
  auth: {
    getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
  },
  // Add other methods you use in your components
}));