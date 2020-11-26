'use strict';

let commonCreatedDate = new Date(Date.now() + ((7) * 3600000));
let commonExpiredDate = new Date(Date.now() + ((31) * 24 * 3600000));

let commonPastDate = new Date(Date.now() - ((24 - 7) * 3600000));
let commonPastExpiredDate = new Date(Date.now() - ((22 + 7)  * 3600000));

let visitorsList = [
  {
    id_pengunjung: "b1d42a9f-0a58-44ec-824e-a56929d7fa3a",
    nama_pengunjung: "Jhon Doe",
    jumlah_pengunjung: "3",
    created_date: commonCreatedDate.toISOString(),
    expired_date: commonExpiredDate.toISOString(),
    permissions: ["Kelas1_1701"],
  },
  {
    id_pengunjung: "1f17841a-8c57-4026-8e08-003a98092853",
    nama_pengunjung: "Mary Ann",
    jumlah_pengunjung: "5",
    created_date: commonCreatedDate.toISOString(),
    expired_date: commonExpiredDate.toISOString(),
    permissions: ["Kelas1_1702"],
  },
  {
    id_pengunjung: "ba440a58-4300-4a16-a646-28d70b15af95",
    nama_pengunjung: "Bob Ross",
    jumlah_pengunjung: "4",
    created_date: commonPastDate.toISOString(),
    expired_date: commonPastExpiredDate.toISOString(),
    permissions: ["Kelas1_1701"],
  },
  {
    id_pengunjung: "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
    nama_pengunjung: "Alice Sue",
    jumlah_pengunjung: "1",
    created_date: commonPastDate.toISOString(),
    expired_date: commonPastExpiredDate.toISOString(),
    permissions: ["Kelas1_1702"],
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pengunjung', visitorsList);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Pengunjung', null, {truncate: true}
    );
  }
};
