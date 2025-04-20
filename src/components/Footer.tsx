const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 md:px-16 pt-16 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Swasthya Darpan</h2>
          <p className="text-sm text-gray-600 max-w-sm">
            Empowering better healthcare with AI-driven insights and accessible
            medicine data.
          </p>
        </div>

        {/* Link Sections */}
        <div>
          <h3 className="text-md font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                API
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-blue-600 hover:underline transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Swasthya Darpan AI Technologies, Inc. All rights reserved.
        </p>

        <div className="flex space-x-4 text-gray-600">
          <a href="https://github.com/harshitduggal1" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <i className="fab fa-github text-lg" />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fab fa-linkedin text-lg" />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fab fa-twitter text-lg" />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fab fa-facebook text-lg" />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fab fa-instagram text-lg" />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fab fa-youtube text-lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
