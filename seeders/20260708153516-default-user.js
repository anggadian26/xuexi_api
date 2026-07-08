'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        username: 'superuser',
        email: 'superuser@gmail.com',
        fullname: 'superuser',
        password: 'password',
        picture: 'default.png',
        bio: 'superuser bio here',
        createdBy: 0,
        updatedBy: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        username: 'admin',
        email: 'admin@gmail.com',
        fullname: 'admin tester',
        password: 'password',
        picture: 'default.png',
        bio: 'tester bio here',
        createdBy: 0,
        updatedBy: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        username: 'tester',
        email: 'tester@gmail.com',
        fullname: 'tester',
        password: 'password',
        picture: 'default.png',
        bio: 'tester bio here',
        createdBy: 0,
        updatedBy: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
