
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const Compliance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100"
      >
        <Check className="w-12 h-12 text-green-600" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-semibold text-white text-center"
      >
        Looking Good!
      </motion.h1>
    </div>
  );
};

export default Compliance;
