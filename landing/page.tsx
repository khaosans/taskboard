import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
      </header>
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Discover Our Services</h2>
          <p className="mb-6">
            We offer a range of services to help you achieve your goals. Our team is dedicated to providing the best solutions tailored to your needs.
          </p>
          <a href="/signup" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Get Started
          </a>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
