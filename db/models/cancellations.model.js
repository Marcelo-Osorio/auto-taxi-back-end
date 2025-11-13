const TABLE_NAME = 'cancellations';

const cancellationsSchema = {
  cancellation_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  breakpoint_time: { type: 'time',notNull: true  },
  status_time: { type: 'string', length: 50, notNull: true },
  cancellation_type: {
    type: 'string',
    length: 100,
    notNull: true,
    defaultValue: 'early',
  },
  commission_charged: { type: 'int', notNull: true },
  commission_charged_percentage: { type: 'string', notNull: true },
  commission_available: { type: 'boolean', notNull: true },
  description : { type: 'text', notNull: true },
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

module.exports = { TABLE_NAME, cancellationsSchema };
