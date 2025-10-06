// App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Please fill the Username field.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please fill the Email field.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email. Please check your email address.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Please fill the Phone Number field.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
    }

    // DOB validation
    if (!formData.dob.trim()) {
      newErrors.dob = "Please fill the Date of Birth field.";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob =
        "Invalid date of birth. Please enter a valid past date.";
    }

    setErrors(newErrors);

    // Submit if no errors
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      setFormData({ username: "", email: "", phone: "", dob: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="app">
      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      )}

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>

              <div>
                <label>Email:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>

              <div>
                <label>Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className="error">{errors.phone}</span>
                )}
              </div>

              <div>
                <label>Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
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
