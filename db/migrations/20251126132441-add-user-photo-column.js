'use strict';

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
  db.addColumn('user', 'photo', {
    type: 'text',
    defaultValue: 'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg'
  }, callback)
};

exports.down = function(db,callback) {
  db.removeColumn('user', 'photo', callback)
};

exports._meta = {
  "version": 1
};
