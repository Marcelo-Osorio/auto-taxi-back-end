const TABLE_NAME = 'user';

const userSchema = {
  user_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  username: {
    type: 'string',
    notNull: true,
    length: 100,
    unique: true
  },
  password: {
    type: 'text',
    notNull: true,
  },
  account_type : {
    type: 'string',
    length : 150,
    notNull: true,
    defaultValue : 'application'
  },
  has_reserved : {
    type: 'boolean',
  },
  birth_date: {
    type: 'date',
    notNull: true,
  },
  email : {
    type: 'string',
    notNull: true,
    unique: true
  },
  plan_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'taxi_id_plan_id_fk',
      table: 'plans',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      mapping: 'plan_id',
    },
  },
  booking_id: {
    type: 'int',
    foreignKey: {
      name: 'taxi_id_booking_id_fk',
      table: 'booking',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      mapping: 'booking_id',
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

module.exports = { TABLE_NAME, userSchema };
