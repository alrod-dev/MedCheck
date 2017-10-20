// Author: Alfredo Rodriguez, Brooklee Wilson, Mya Nguyen
// File: JS - meds.js
// Date: 10/10/2017


//Exports Sequelize object to the data table meds
module.exports = function(sequelize, DataTypes) {
    var Meds = sequelize.define("meds", {
        name: DataTypes.STRING,
        drugClass: DataTypes.STRING,
        description: DataTypes.TEXT,
        dosage: DataTypes.STRING,
        frequency: DataTypes.STRING,
        quantity: DataTypes.STRING,
        img: DataTypes.TEXT,
        doctor_Name: DataTypes.STRING,
        phoneNumber: DataTypes.STRING
    }, {
        timestamps: false
    });
    return Meds;
};