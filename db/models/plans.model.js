const TABLE_NAME = 'plans';

const plansSchema = {
  plan_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  type_plan: {
    type: 'string',
    length: 50,
    notNull: true,
    defaultValue: 'basic',
  },
  description: { type: 'text', notNull: true },
  advance_reservations: { type: 'boolean', notNull: true },
  pay: { type: 'decimal', unique: true, notNull: true },
  type_payment: { type: 'string', length: 20, notNull: true },
  access_taxis: { type: 'boolean', notNull: true },
  fare_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'plan_id_fare_id_fk',
      table: 'fare',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      mapping: 'fare_id'
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

module.exports = { TABLE_NAME, plansSchema };
