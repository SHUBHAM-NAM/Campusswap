import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-white mt-auto">

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Column 1 - About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-bold">CampusSwap</h2>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              A college platform connecting seniors and juniors
              to exchange books, share notes, and collaborate
              academically. Save money. Share knowledge.
            </p>
            <div className="mt-4">
              <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                🎓 For Students, By Students
              </span>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-400 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/books"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  📚 Browse Books
                </Link>
              </li>
              <li>
                <Link to="/notes"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  📝 Notes & PYQs
                </Link>
              </li>
              <li>
                <Link to="/add-book"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  ➕ List a Book
                </Link>
              </li>
              <li>
                <Link to="/upload-note"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  📤 Upload Notes
                </Link>
              </li>
              <li>
                <Link to="/my-chats"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  💬 My Chats
                </Link>
              </li>
              <li>
                <Link to="/profile"
                  className="text-blue-100 hover:text-white text-sm transition flex items-center gap-2">
                  👤 My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Features */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-400 pb-2">
              Features
            </h3>
            <ul className="space-y-2">
              <li className="text-blue-100 text-sm flex items-center gap-2">
                💰 Buy & Sell Used Books
              </li>
              <li className="text-blue-100 text-sm flex items-center gap-2">
                📄 Share Notes & PYQs
              </li>
              <li className="text-blue-100 text-sm flex items-center gap-2">
                💬 Real-Time Chat
              </li>
              <li className="text-blue-100 text-sm flex items-center gap-2">
                🔍 Search & Filter
              </li>
              <li className="text-blue-100 text-sm flex items-center gap-2">
                🔐 Secure Authentication
              </li>
              <li className="text-blue-100 text-sm flex items-center gap-2">
                ☁️ Cloud File Storage
              </li>
              <li className="text-blue-100 text-sm flex items-center gap-2">
                📱 Mobile Responsive
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-400 pb-2">
              Contact & Social
            </h3>

            {/* Developer Info */}
            <div className="bg-[#869B7E]  rounded-xl p-4 mb-4">
              <p className="text-sm font-bold text-white">👨‍💻 Developer</p>
              <p className="text-blue-100 text-sm mt-1">Shubham Choudhary</p>
              <p className="text-blue-100 text-xs">BCA 2023-2026</p>
              <p className="text-blue-100 text-xs">Govt. College Jawalamukhi</p>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit GitHub profile"
                className="flex items-center gap-2 text-blue-100 hover:text-white text-sm transition">
                <div className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs">
                  GH
                </div>
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit LinkedIn profile"
                className="flex items-center gap-2 text-blue-100 hover:text-white text-sm transition">
                <div className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs">
                  IN
                </div>
                LinkedIn
              </a>
              <a
                href="mailto:shubham@college.com"
                aria-label="Send an email"
                className="flex items-center gap-2 text-blue-100 hover:text-white text-sm transition">
                <div className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs">
                  ✉️
                </div>
                Email Us
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t border-blue-500 border-opacity-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-white">500+</p>
              <p className="text-blue-200 text-xs">Books Listed</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">200+</p>
              <p className="text-blue-200 text-xs">Notes Uploaded</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">1000+</p>
              <p className="text-blue-200 text-xs">Students Helped</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">₹50K+</p>
              <p className="text-blue-200 text-xs">Money Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-500 border-opacity-50 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-blue-200 text-xs text-center md:text-left">
            © 2026 CampusSwap. All rights reserved. |
            Made with ❤️ by <span className="text-white font-semibold">Shubham Choudhary</span>
          </p>
          <div className="flex gap-4">
            <span className="text-blue-200 text-xs hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="text-blue-200 text-xs hover:text-white cursor-pointer transition">
              Terms of Use
            </span>
            <span className="text-blue-200 text-xs hover:text-white cursor-pointer transition">
              Contact
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;