import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8">
  <div className="container mx-auto px-6">
    <div className="flex flex-wrap justify-between">
      <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-sm">
        FLP Ranting Unhas adalah komunitas kepenulisan yang mewadahi para penulis untuk berkarya, belajar, dan berbagi dalam dunia literasi.
        </p>
      </div>

      <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <ul className="text-sm space-y-2">
          <li>
            <a href="/" className="hover:text-blue-400">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-400">About Us</a>
          </li>
          <li>
            <a href="/services" className="hover:text-blue-400">Contact us</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-400">Login</a>
          </li>
        </ul>
      </div>

      <div className="w-full lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-facebook-f">Facebook</i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-twitter">Instagram</i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-instagram">Linkedin</i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="mt-8 border-t border-gray-600 pt-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Forum Lingkar Pena Ranting Unhas. All rights reserved.
      </p>
    </div>
  </div>
</footer>

  )
}

export default Footer