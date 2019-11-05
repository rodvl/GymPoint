import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso_kg: Sequelize.INTEGER,
        altura_cm: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }
}

export default Student;
