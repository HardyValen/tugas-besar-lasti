'use strict';

let RuangMap = {
  "PS_1001": "President Suite", 
  "PS_1002": "President Suite", 
  "PS_1003": "President Suite", 
  "PS_2001": "President Suite", 
  "PS_2002": "President Suite", 
  "PS_2003": "President Suite",

  "Suite_1101": "Suite", 
  "Suite_1102": "Suite", 
  "Suite_1103": "Suite", 
  "Suite_2101": "Suite", 
  "Suite_2102": "Suite", 
  "Suite_2103": "Suite", 

  "SVIP_1201": "SVIP", 
  "SVIP_1202": "SVIP", 
  "SVIP_1203": "SVIP", 
  "SVIP_2201": "SVIP", 
  "SVIP_2202": "SVIP", 
  "SVIP_2203": "SVIP", 

  "VIP_1301": "VIP", 
  "VIP_1302": "VIP", 
  "VIP_1303": "VIP", 
  "VIP_2301": "VIP", 
  "VIP_2302": "VIP", 
  "VIP_2303": "VIP", 

  "Kelas1_1701": "Kelas 1", 
  "Kelas1_1702": "Kelas 1", 
  "Kelas1_1703": "Kelas 1", 
  "Kelas1_2701": "Kelas 1", 
  "Kelas1_2702": "Kelas 1", 
  "Kelas1_2703": "Kelas 1", 

  "Kelas2_1801": "Kelas 2", 
  "Kelas2_1802": "Kelas 2", 
  "Kelas2_1803": "Kelas 2", 
  "Kelas2_2801": "Kelas 2", 
  "Kelas2_2802": "Kelas 2", 
  "Kelas2_2803": "Kelas 2", 

  "Kelas3_1901": "Kelas 3", 
  "Kelas3_1902": "Kelas 3", 
  "Kelas3_1903": "Kelas 3", 
  "Kelas3_2901": "Kelas 3", 
  "Kelas3_2902": "Kelas 3", 
  "Kelas3_2903": "Kelas 3", 
};

let ObjectRuangan = (() => {
  
  let temp = []
  Object.entries(RuangMap).forEach(([key, value]) => {
    temp.push({
      id_ruangan: key,
      tipe_ruangan: value
    })
  })

  return temp;
})()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ruangan', ObjectRuangan);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Ruangan', null, {truncate: true}
    );
  }
};
