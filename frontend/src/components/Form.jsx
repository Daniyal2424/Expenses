import React, { useState } from "react";
import "../index.css";

const Form = () => {
  const categories = ["Food", "Transport", "Entertainment"];
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    sum: "",
    author: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitForm = async () => {
    try {
      const body = { ...formData };
      const response = await fetch("http://localhost:4010/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="form" onSubmit={onSubmitForm}>
      <h1 className="form-title">Expenses</h1>

      <div className="form-date">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={onChange}
        />
      </div>

      <div className="form-categories">
        {categories.map((category, index) => (
          <label key={index}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={formData.category === category}
              onChange={onChange}
            />
            {category}
          </label>
        ))}
      </div>

      <div className="form-sum">
        <h3>Spent</h3>
        <input
          className="input-sum"
          type="number"
          name="sum"
          value={formData.sum}
          onChange={onChange}
        />
      </div>

      <div className="form-author">
        <h3>Author</h3>
        <input
          className="input-author"
          type="text"
          name="author"
          value={formData.author}
          onChange={onChange}
        />
      </div>

      <div className="form-button">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Form;
