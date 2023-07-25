/* eslint-disable react/prop-types */
import StyledTaskCard from "./TaskCard.styled";
import { motion } from "framer-motion";

const TaskCard = ({ children, complete }) => {
  const variants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
    >
      <StyledTaskCard complete={complete}>{children}</StyledTaskCard>
    </motion.div>
  );
};

export default TaskCard;
