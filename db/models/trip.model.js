const TABLE_NAME = 'trip';

const tripSchema = {
  trip_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  // start_point: {
  //   type: 'point',
  //   length: 200,
  //   notNull: true,
  // },
  // end_point: {
  //   type: 'point',
  //   length: 200,
  //   notNull: true,
  // },
  status_trip: {
    type: 'string',
    length: 50,
    notNull: true,
    defaultValue: 'waiting',
  },
  loaddate: {
    type: 'datetime',
    defaultValue: new String('CURRENT_TIMESTAMP'),
    notNull: true,
  },
  updatedate: {
    type: 'datetime',
    defaultValue: new String('CURRENT_TIMESTAMP'),
    notNull: true,
  },
};

module.exports = { TABLE_NAME, tripSchema };
