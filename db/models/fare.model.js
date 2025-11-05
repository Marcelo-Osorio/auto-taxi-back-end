const TABLE_NAME = 'fare';

const fareSchema = {
  fare_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  distance: { type: 'decimal', notNull: true },
  unit_measurement: { type: 'string', notNull: true, length : 10 },
  price: { type: 'decimal', unique: true, notNull: true },
  loaddate: {
    type: 'datetime',
    defaultValue: new String('CURRENT_TIMESTAMP'),
    notNull: true,
  },
  updatedate: {
    type: 'datetime',
    defaultValue: new String('CURRENT_TIMESTAMP'),
    notNull: true,
  }
};

module.exports = {TABLE_NAME, fareSchema };
