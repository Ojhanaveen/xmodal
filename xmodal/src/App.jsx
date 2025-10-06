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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      alert("Please fill the Username field.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please fill the Email field.");
      return;
    } else if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please fill the Phone Number field.");
      return;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (!formData.dob.trim()) {
      alert("Please fill the Date of Birth field.");
      return;
    } else if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return;
    }

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
        <div
          className="modal"
          onClick={() => setIsModalOpen(false)} // click outside closes modal
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // click inside does NOT close
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
