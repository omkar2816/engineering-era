import { motion } from "framer-motion";
import "../styles/notes.css"; // Import the CSS file
import Footer from "../components/footer"; // Import the Footer component

const notes = [
  "Engineering Mechanics", "Basic Electrical Engineering (BEE)", "Engineering Mathematics-I", "Engineering Mathematics-II",
  "Engineering Mathematics-III", "Engineering Mathematics-IV", "Data Structures", "Artificial Intelligence",
  "Operating System", "Theoretical Computer Science", "Database Management System", "Software Engineering",
  "Engineering Physics", "Engineering Chemistry", "Internet Programming", "Microprocessor",
  "Big Data Analytics", "Computer Organization & Architecture", "Machine Learning", "SPCC Notes",
  "Discrete Structure & Graph Theory", "Data Warehouse & Mining", "Computer Network", "Computer Graphics"
];

export default function NotesGrid() {
  return (
    <div className="notes-container">
      <h1 className="notes-title">All Engineering Notes</h1>
      <div className="notes-grid">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="note-card"
          >
            <div className="note-name">{note}</div>
            <div className="note-footer">
              <span>Notes</span>
              <span className="arrow">&rarr;</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
