const controller = require('../controller/product.controller');
const {body} = require('express-validator');

module.exports = (app) => {
  app.get('/', controller.get);
  app.post(
      '/create',
      body('nama_produk')
          .notEmpty()
          .withMessage('Nama produk tidak boleh kosong'),
      body('keterangan')
          .notEmpty()
          .withMessage('Keterangan tidak boleh kosong'),
      body('harga')
          .notEmpty()
          .withMessage('Harga tidak boleh kosong'),
      body('jumlah')
          .notEmpty()
          .withMessage('Jumlah tidak boleh kosong'),
      controller.store,
  );
  app.post(
      '/update/:id',
      body('nama_produk')
          .notEmpty()
          .withMessage('Nama produk tidak boleh kosong'),
      body('keterangan')
          .notEmpty()
          .withMessage('Keterangan tidak boleh kosong'),
      body('harga')
          .notEmpty()
          .withMessage('Harga tidak boleh kosong'),
      body('jumlah')
          .notEmpty()
          .withMessage('Jumlah tidak boleh kosong'),
      controller.update,
  );
  app.post('/delete/:id', controller.deleteProduct);
};
