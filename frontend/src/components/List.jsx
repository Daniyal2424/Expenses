import React, { useEffect, useState } from "react";
import "../index.css";

const List = () => {
  const [expenses, setExpenses] = useState([]);

  async function getExpenses() {
    const res = await fetch("http://localhost:4010/expenses");
    const expensesArray = await res.json();
    setExpenses(expensesArray);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  async function deleteExpenses(id) {
    try {
      const res = await fetch(`http://localhost:4010/expenses/${id}`, {
        method: "DELETE",
      });
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Date</th>
            <th>Category</th>
            <th>Sum</th>
            <th>Author</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.date}</td>
              <td>{e.category}</td>
              <td>{e.sum}</td>
              <td>{e.author}</td>
              <td>
                <button
                  onClick={() => deleteExpenses(e.id)}
                  className="btnDelete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
