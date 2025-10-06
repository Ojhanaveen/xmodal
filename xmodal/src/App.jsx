// App.jsx
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Check for empty fields
    if (!username.trim()) {
      alert("Please fill the Username field.");
      return;
    }
    if (!email.trim()) {
      alert("Please fill the Email field.");
      return;
    }
    if (!phone.trim()) {
      alert("Please fill the Phone Number field.");
      return;
    }
    if (!dob.trim()) {
      alert("Please fill the Date of Birth field.");
      return;
    }

    // Email validation
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB validation (no future dates)
    const today = new Date();
    const enteredDate = new Date(dob);
    if (enteredDate > today) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return;
    }

    // If all validations pass
    alert("Form submitted successfully!");
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
