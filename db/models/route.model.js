const TABLE_NAME = 'route';

const routeSchema = {
  route_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  // start_point: {
  //   type: 'string',
  //   length: 200,
  //   notNull: true,
  // },
  // end_point: {
  //   type: 'string',
  //   length: 200,
  //   notNull: true,
  // },
  zone_start: { type: 'string', length:250, notNull: true },
  zone_end: { type: 'string', length:250, notNull: true },
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

module.exports = { TABLE_NAME, routeSchema };
