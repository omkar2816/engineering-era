import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/notes.css";
import Footer from "../components/footer";

const notes = [
  "Engineering Mechanics", "Basic Electrical Engineering (BEE)", "Engineering Mathematics-I", "Engineering Mathematics-II",
  "Engineering Mathematics-III", "Engineering Mathematics-IV", "Data Structures", "Artificial Intelligence",
  "Operating System", "Theoretical Computer Science", "Database Management System", "Software Engineering",
  "Engineering Physics", "Engineering Chemistry", "Internet Programming", "Microprocessor",
  "Big Data Analytics", "Computer Organization & Architecture", "Machine Learning", "SPCC Notes",
  "Discrete Structure & Graph Theory", "Data Warehouse & Mining", "Computer Network", "Computer Graphics"
];

export default function NotesGrid() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <h1 className="notes-title">All Engineering Notes</h1>

      {/* Search Bar */}
      <div className="subject-search-bar-wrapper">
        <input
          type="text"
          placeholder="Search note..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="subject-search-input"
        />
      </div>

      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
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
          ))
        ) : (
          <div style={{ color: "#cbd5e1", textAlign: "center", marginTop: "2rem" }}>
            No notes match your search.
          </div>
        )}
      </div>
    </div>
  );
}
