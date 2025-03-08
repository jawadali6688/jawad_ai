import { motion } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaYoutube, FaGithub } from "react-icons/fa";

const MyFooter = () => {
  return (
    <footer className="bg-gray-900 mt-10 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 flex justify-between gap-8">
        {/* Left Section - Logo & Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">Jawad Khan</h2>
          <p className="mt-2 text-gray-400">
            Full-Stack Developer & AI Engineer
          </p>
        </div>

        {/* Middle Section - Quick Links */}
       

        {/* Right Section - Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Follow Me</h3>
          <div className=" flex mt-4 gap-6">
                    <motion.a
                      href="https://linkedin.com/in/jawad-khan-a28505326"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 text-2xl hover:text-blue-600"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaLinkedin size={35} />
                    </motion.a>
          
                    <motion.a
                      href="https://wa.me/+923057573688?text=Hello%2C%20I%20am%20interested%20in%20your%20services.
          "           target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 text-2xl hover:text-green-500"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaWhatsapp size={35}  />
                    </motion.a>
          
                    <motion.a
                      href="https://www.youtube.com/@Jawad_khan6686"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 text-2xl hover:text-red-600"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaYoutube size={35}  />
                    </motion.a>
          
                    <motion.a
                      href="https://github.com/jawadali6688"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 text-2xl hover:text-gray-600"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaGithub size={35}  />
                    </motion.a>
                  </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Jawad Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default MyFooter;
