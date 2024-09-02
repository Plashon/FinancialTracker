const Financial = require("../models/financial.model");

///create a financial record

exports.create = async (req, res) => {
  const { userId, description, date, amount, category, paymentMethod } =
    req.body;

  const newRecord = {
    userId,
    description,
    date,
    amount,
    category,
    paymentMethod,
  };

  await Financial.create(newRecord)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while saving the Financial record!",
      });
    });
};
//retrieve all financial 
exports.getAll = async (req, res) => {
  await Financial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while getting the financial Record!",
      });
    });
};
//retrieve a financial by id 
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Financial.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No found Restaurant with ID : " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while getting the financial Record!",
      });
    });
};

//retrieve a financial  by User Id
exports.getByUserId = async (req, res) => {
  const userId = req.params.userId;
  await Financial.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while getting the financial Record!",
      });
    });
};
//Edit  a financial by Id 
exports.updateById = async (req, res) => {
  const id = req.params.id;
  await Financial.update(req.body, { where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Record was update successfully!" });
    } else {
      res.send({
        message:
          "Can't update Record with ID : " +
          id +
          ". Maybe financial Record wasn't found or req.body is empty!",
      });
    }
  });
};
//delete a financial by Id 
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  await Financial.destroy({ where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Record was delete successfully!" });
    } else {
      res.send({ message: "Can't delete Record ID : " + id + "." });
    }
  });
};
