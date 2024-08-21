import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="border-t-2 border-[#d6c8a6] rounded-t-3xl pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#d6c8a6]">DELTA CO</h3>
              <p className="text-sm text-[#a09274]">
                Empowering gamers with top-tier hosting and innovative mods
                since 2023.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#d6c8a6] mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-[#a09274]">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#d6c8a6] mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-[#a09274]">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Game Hosting
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Custom Mods
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Partnerships
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#f0e6ce] transition-colors"
                  >
                    Community Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#d6c8a6] mb-4">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-[#a09274] hover:text-[#f0e6ce] transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-[#a09274] hover:text-[#f0e6ce] transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-[#a09274] hover:text-[#f0e6ce] transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-[#a09274] hover:text-[#f0e6ce] transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#d6c8a6]">
            <p className="text-center text-xs text-[#a09274]">
              © 2024 DELTA CO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
