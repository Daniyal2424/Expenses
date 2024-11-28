import express from "express";
import cors from "cors"
import pool from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.post("/expenses", async (req, res) => {
    try {
        const { date, category, sum, author } = req.body
        const newExpenses = await pool.query("INSERT INTO expenses (date,category,sum,author) VALUES ($1,$2,$3,$4) RETURNING *", [date, category, sum, author])
        res.json(newExpenses.rows[0])

    } catch (err) {
        console.log(err.message);
    }
})

app.get("/expenses", async (req, res) => {
    try {
        const allExpenses = await pool.query("SELECT * FROM expenses")
        res.json(allExpenses.rows)
    } catch (err) {
        console.log(err.message);
    }
})

app.get("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params
        const expensesById = await pool.query("SELECT * FROM expenses WHERE id = $1", [id])
        res.json(expensesById.rows[0])
    } catch (err) {
        console.log(err.message);
    }
})

app.delete("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params
        const expensesDelete = await pool.query("DELETE FROM expenses WHERE id = $1", [id])
        res.json(expensesDelete.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(4010, () => {
    console.log("server starting on 4010");
})