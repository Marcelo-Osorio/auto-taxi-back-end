const TABLE_NAME = 'record';

const recordSchema = {
  record_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  travel_date: {
    type: 'datetime',
    notNull: true,
  },
  price_rate: {
    type: 'decimal',
    notNull: true,
  },
  final_state: {
    type: 'string',
    length: 150,
    notNull: true,
    defaultValue: 'completed',
  },
  // route_start: {
  //   type: 'point',
  //   notNull: true,
  // },
  // route_end: {
  //   type: 'point',
  //   notNull: true,
  // },
  taxi_name: {
    type: 'string',
    length: 100,
    notNull: true,
  },
  taxi_plate: {
    type: 'text',
    notNull: true,
  },
  taxi_image: {
    type: 'text',
  },
  cancellation_fee : {
    type: 'decimal',
  },
  user_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'taxi_id_user_id_fk',
      table: 'user',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      mapping: 'user_id',
    },
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

module.exports = { TABLE_NAME, recordSchema };
