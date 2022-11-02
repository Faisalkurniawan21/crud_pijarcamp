const {Product} = require('../models');

const get = async (req, res) => {
  let data;
  let errors;

  try {
    data = await Product.findAll();
  } catch (error) {
    errors = error;
  } finally {
    res.render('index', {
      data,
      errors,
      message: req.session.message,
      error: req.session.error,
    });
    delete req.session.data;
    delete req.session.errors;
    delete req.session.message;
    delete req.session.error;
  }
};







const {validationResult} = require('express-validator');
const uuid = require('uuid');

const store = async (req, res) => {
  try {
    const {body} = req;
    const errors = validationResult(body);

    if (!errors.isEmpty()) {
      req.session.error = errors;
      return res.redirect('/create');
    } else {
      body.id = uuid.v4();

      await Product.create(body);

      req.session.message = 'Berhasil menambah produk';

      return res.redirect('/');
    }
  } catch (error) {
    req.session.error = error.parent.sqlMessage;
    return res.redirect('/create');
  }
};

const update = async (req, res) => {
  const {body} = req;
  const {id} = req.params;

  try {
    const errors = validationResult(body);

    if (!errors.isEmpty()) {
      req.session.error = errors;
      return res.redirect(`/edit/${id}`);
    } else {
      body.id = uuid.v4();

      await Product.update(body, {where: {id}});

      req.session.message = 'Berhasil mengedit produk';

      return res.redirect('/');
    }
  } catch (error) {
    req.session.error = error.parent?.sqlMessage;
    return res.redirect(`/edit/${id}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;

    await Product.destroy({where: {id}});
    req.session.message = 'Berhasil menghapus produk';
    return redirect('/');
  } catch (error) {
    req.session.error = error.parent?.sqlMessage;
    return res.redirect('/');
  }
};

module.exports = {get, store, deleteProduct, update};
