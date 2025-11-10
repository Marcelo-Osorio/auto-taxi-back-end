const TABLE_NAME = 'booking';

const bookingSchema = {
  booking_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  price_rate: {
    type: 'decimal',
    notNull: true,
  },
  cancellation_type_available: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'booking_id_cancellation_id_fk',
      table: 'cancellations',
      rules: {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      mapping: 'cancellation_id',
    },
  },
  status_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'booking_id_booking_status_id_fk',
      table: 'booking_status',
      rules: {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      mapping: 'booking_status_id',
    },
  },
  trip_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'booking_id_trip_id_fk',
      table: 'trip',
      rules: {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      mapping: 'trip_id',
    },
  },
  taxi_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'booking_id_taxi_id_fk',
      table: 'taxi',
      rules: {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      mapping: 'taxi_id',
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

module.exports = { TABLE_NAME, bookingSchema };
