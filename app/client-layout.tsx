'use client'

import React from 'react'

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="client-layout">
      {/* You can add a header, footer, or any other common components here */}
      <header className="header">
        <h1>Client Layout Header</h1>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <p>Footer Content</p>
      </footer>
    </div>
  )
}

export default ClientLayout
