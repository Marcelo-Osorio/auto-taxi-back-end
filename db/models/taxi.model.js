const TABLE_NAME = 'taxi';

const taxiSchema = {
  taxi_id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
    notNull: true,
    unique: true,
  },
  plate: {
    type: 'text',
    notNull: true,
  },
  taxi_name: { type: 'string', length: 100, notNull: true },
  ability: { type: 'int', unsigned: true, notNull: true },
  taxi_status: {
    type: 'string',
    length: 50,
    notNull: true,
    defaultValue: 'enabled',
  },
  // current_location: {
  //   type: 'point',
  //   length: 200,
  //   notNull: true,
  // },
  image: { type: 'text' },
  trip_id: {
    type: 'int',
    foreignKey: {
      name: 'taxi_id_trip_id_fk',
      table: 'trip',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      mapping: 'trip_id',
    },
  },
  route_id: {
    type: 'int',
    foreignKey: {
      name: 'taxi_id_route_id_fk',
      table: 'route',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      mapping: 'route_id',
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

module.exports = { TABLE_NAME, taxiSchema };
