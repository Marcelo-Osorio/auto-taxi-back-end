const TABLE_NAME = 'booking_status';

const booking_statusSchema = {
  booking_status_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  status_name: { type: 'string', length:100, notNull: true },
  description: { type: 'text',  notNull: true },
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

module.exports = { TABLE_NAME, booking_statusSchema };
