'use strict';
const {TABLE_NAME, fareSchema} = require('./../models/fare.model');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
  db.createTable(TABLE_NAME, fareSchema, callback);
};

exports.down = function(db,callback) {
  db.dropTable(TABLE_NAME, callback);
};

exports._meta = {
  "version": 1
};
