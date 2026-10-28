'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    });
  },
async down(queryInterface, Sequelize) {
    const [columns] = await queryInterface.sequelize.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'users'
          AND column_name = 'role';
    `);

    if (columns.length > 0) {
        await queryInterface.removeColumn('users', 'role');
    }

    await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_users_role";'
    );
}
};