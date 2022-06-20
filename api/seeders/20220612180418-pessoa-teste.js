'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('pesssoas', [
        {
          nome: 'Ana maria',
          ativo: 1,
          email: 'ana@ana.com',
          role: 'estudante ',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Marcos felipe',
          ativo: 1,
          email: 'marcos@marcos.com',
          role: 'estudante',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
            nome: 'Felipe Nogueira',
            ativo: 1,
            email: 'felipe@felipe.com',
            role: 'estudante',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
              nome: 'Sandra gomes',
              ativo: 1,
              email: 'sandra@sandra.com',
              role: 'estudante',
              createdAt: new Date(),
              updatedAt: new Date()
        },
        {
          nome: 'Paula Morais',
          ativo: 1,
          email: 'paula@paula.com',
          role: 'docente',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pesssoas', null, {});
  }
};
