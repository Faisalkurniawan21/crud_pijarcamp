/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }
  Product.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    nama_produk: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
