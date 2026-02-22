import React from 'react'

const Navbar = () => {
  return (
      <nav className="bg-[#080808] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand */}
          <div className="shrink-0">
            <a href="#home" className="text-xl font-bold">
              ITask
            </a>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Pricing
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar