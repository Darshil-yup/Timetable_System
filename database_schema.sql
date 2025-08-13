-- This SQL schema is a conceptual representation of the data structures used in the TimeTableSync application.
-- The actual application uses Firestore, a NoSQL database, but this schema is provided for
-- a clearer understanding of the entities and their relationships in a relational format.

-- =============================================
-- Table for Users (Authentication)
-- =============================================
-- Stores login credentials for all users of the application.
-- The 'role' column determines their access level (e.g., 'admin' or 'lecturer').

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,       -- Unique identifier for the user (e.g., from Firebase Auth)
    name VARCHAR(255) NOT NULL,        -- Full name of the user
    email VARCHAR(255) NOT NULL UNIQUE,-- Email address, used for login
    password_hash VARCHAR(255),        -- Hashed password for authentication
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'lecturer')) -- User role
);


-- =============================================
-- Table for Lecturers
-- =============================================
-- Stores information specific to lecturers. This could be linked to the users table.

CREATE TABLE lecturers (
    id VARCHAR(255) PRIMARY KEY,      -- Unique identifier for the lecturer
    name VARCHAR(255) NOT NULL,       -- Name of the lecturer
    user_id VARCHAR(255),             -- Optional: Foreign key linking to a user account
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- =============================================
-- Table for Timetables
-- =============================================
-- Represents a master timetable for a specific department and year.

CREATE TABLE timetables (
    id VARCHAR(255) PRIMARY KEY,      -- Unique identifier for the timetable (e.g., Firestore document ID)
    name VARCHAR(255) NOT NULL,       -- Descriptive name (e.g., "Computer Engineering (3rd Year)")
    academic_year VARCHAR(50)         -- e.g., "3rd Year"
);


-- =============================================
-- Table for Timetable Entries (Classes, Practicals, etc.)
-- =============================================
-- Represents an individual slot or entry within a timetable.

CREATE TABLE timetable_entries (
    id VARCHAR(255) PRIMARY KEY,           -- Unique identifier for the class entry
    timetable_id VARCHAR(255) NOT NULL,    -- Foreign key linking to the parent timetable
    subject VARCHAR(255) NOT NULL,         -- Subject name (e.g., "Data Structures")
    room VARCHAR(255),                     -- Classroom or Lab name
    day VARCHAR(10) NOT NULL,              -- Day of the week (e.g., "Monday")
    time_slot VARCHAR(20) NOT NULL,        -- Time slot (e.g., "09:00-10:00")
    type VARCHAR(20) NOT NULL CHECK (type IN ('Lecture', 'Practical', 'Recess', 'Library', 'Sports')), -- Type of the entry
    duration_hours INT DEFAULT 1,          -- Duration of the slot in hours
    color VARCHAR(20),                     -- Hex or HSL color code for the UI
    
    -- In a real relational model, lecturer assignment could be a many-to-many relationship,
    -- especially for practicals. For simplicity here, we assume a text field can hold names.
    -- A more robust solution would use a linking table (e.g., entry_lecturers).
    lecturers_text VARCHAR(255),           -- Comma-separated list of lecturer names

    FOREIGN KEY (timetable_id) REFERENCES timetables(id) ON DELETE CASCADE
);


-- =============================================
-- Linking Table for Practical Batches
-- =============================================
-- Handles the many-to-many relationship between a practical session and its batches.
-- A single practical can have multiple batches (e.g., A1, A2, A3).

CREATE TABLE entry_batches (
    entry_id VARCHAR(255) NOT NULL,      -- Foreign key linking to the timetable entry (must be a 'Practical')
    batch_name VARCHAR(50)   NOT NULL,     -- The name of the batch (e.g., "A1")
    
    PRIMARY KEY (entry_id, batch_name),
    FOREIGN KEY (entry_id) REFERENCES timetable_entries(id) ON DELETE CASCADE
);

-- Note: The relationships between lecturers and timetable entries could be further normalized
-- with a `entry_lecturers` linking table if a single class could be taught by multiple lecturers
-- and we needed to store more than just their names.
