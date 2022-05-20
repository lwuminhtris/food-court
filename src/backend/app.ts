import db from "./firebase";
import express, { Application } from "express";
const cors = require("cors");

const app: Application = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("<b>API Authorization Denied</b>");
});

// => /authorize?username=..&&password=..
app.post("/authorize", async (req: any, res: any) => {
  const account = await db
    .collection("users")
    .where("username", "==", req.query.username)
    .where("password", "==", req.query.password)
    .get();
  if (account.empty) {
    res.send({ response: false });
  } else {
    res.send({ response: true });
  }
});

// => /register?username=..&&password=..
app.post("/register", async (req: any, res: any) => {
  const account = await db
    .collection("users")
    .where("username", "==", req.query.username)
    .get();
  if (!account.empty) {
    res.send({ response: false });
  } else {
    await db.collection("users").add({
      username: req.query.username,
      password: req.query.password,
    });
    res.send({ response: true });
  }
});

// => /orders
app.post("/orders", async (req: any, res: any) => {
  const status = await db.collection("ordersListByUser").add({
    username: req.body.username,
    date: req.body.date,
    burger: req.body.burger,
    pizza: req.body.pizza,
    pasta: req.body.pasta,
    paella: req.body.paella,
    totalPrice: req.body.totalPrice,
  });
  if (status) {
    res.send({ response: true });
  } else {
    res.send({ response: false });
  }
});

// => /orders?username=...
app.get("/orders", async (req: any, res: any) => {
  const orders = await db
    .collection("ordersListByUser")
    .where("username", "==", req.query.username)
    .get();
  const ordersList: Record<any, any>[] = [];
  orders.forEach((doc) => {
    ordersList.push(doc.data());
  });
  if (!orders.empty) {
    res.send({ orders: ordersList });
  } else {
    res.send({ orders: [] });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
