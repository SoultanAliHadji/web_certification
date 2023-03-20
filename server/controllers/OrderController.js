import Order from "../models/OrderModel.js";

export const getOrders = async (req, res) => {
  try {
    const response = await Order.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const response = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    await Order.create(req.body);
    res.status(201).json({ msg: "Order created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateOrder = async (req, res) => {
  try {
    await Order.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Order updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Order deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
