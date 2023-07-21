import React from "react";
import { useState } from "react";
import db from "./firebase";
function Feedback() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      db.collection("feedback").add({
        message: message,
        name: name,
      });
      setMessage("");
      setName("");
      //  go to /
      window.location.href = "/";
    }

    setMessage("");
    setName("");
  };
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    body {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      margin: 0;\n      background-color: #f0f0f0;\n      font-family: Arial, sans-serif;\n    }\n\n    .container {\n      background-color: #fff;\n      border-radius: 10px;\n      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n      padding: 20px;\n      width: 350px;\n    }\n\n    .form-group {\n      margin-bottom: 20px;\n    }\n\n    .form-group label {\n      display: block;\n      font-weight: bold;\n      margin-bottom: 5px;\n    }\n\n    .form-group input,\n    .form-group textarea {\n      width: 100%;\n      padding: 10px;\n      font-size: 16px;\n      border: 1px solid #ccc;\n      border-radius: 5px;\n    }\n\n    .form-group textarea {\n      resize: vertical;\n    }\n\n    .form-submit {\n      text-align: center;\n    }\n\n    .form-submit button {\n      padding: 10px 20px;\n      font-size: 16px;\n      background-color: #007BFF;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n    }\n  ",
        }}
      />
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name (optional)</label>
            <input
              value={name}
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              value={message}
              id="message"
              name="message"
              rows={4}
              placeholder="Your Message"
              required=""
              defaultValue={""}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-submit">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
}

export default Feedback;
