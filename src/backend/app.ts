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

// [POST] => /authorize?username=..&&password=..
// Authorize a user by username and password
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

// [POST] => /register?username=..&&password=..
// Create new account
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

// [POST] => /orders
// Create new order by user
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

// [GET] => /orders?username=...
// Get order history of user by username
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

// [POST] => /informations
// Update user information, if user hasn't had information yet then create new
app.post("/informations", async (req: any, res: any) => {
  const info = await db.collection("informations").doc(req.body.username).set({
    username: req.body.username,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
  });
  if (info) {
    res.send({
      response: true,
    });
  } else {
    res.send({
      response: false,
    });
  }
});

// [GET] => /informations?username=...
// GET user information
app.get("/informations", async (req: any, res: any) => {
  const info = await db
    .collection("informations")
    .where("username", "==", req.query.username)
    .get();
  if (info) {
    info.forEach((doc) => {
      res.send(doc.data());
    });
  } else {
    res.send({
      response: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
