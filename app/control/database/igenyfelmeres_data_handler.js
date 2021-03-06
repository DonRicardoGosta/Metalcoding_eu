const {BrandModel} = require("../../model/igenyfelmeres_data_models/brands_enum_Model");
const {DeviceModel} = require("../../model/igenyfelmeres_data_models/devices_enum_Model");
const {FunctionInHouseModel} = require("../../model/igenyfelmeres_data_models/functions_enum_Model");
const {LocationModel} = require("../../model/igenyfelmeres_data_models/locations_enum_Model");
const {IgenyfelmeresRecordModel} = require("../../model/igenyfelmeres_data_models/igenyfelmeres_records_Model");



async function getIgenyfelmeresRecords(user_id){
    try {
        if(user_id){
            const igenyfelmeres_records = await IgenyfelmeresRecordModel
                .find({sharedwith : user_id.toString()})
                .populate({
                    path : 'line_records',
                    populate : {
                        path : 'location function device brand'
                    }
                })
                .select('name _id');
            return igenyfelmeres_records;
        }
    }catch (ex){
        console.log(ex.message)
    }
}

async function getLocations(){
    try {
        const locations = await LocationModel.find().sort({name:1});
        return locations;
    }catch (ex){
        console.log(ex.message)
    }
}
async function getFunctions(){
    try {
        const functions = await FunctionInHouseModel.find().sort({name:1});
        return functions;
    }catch (ex){
        console.log(ex.message)
    }
}
async function getDevices(){
    try {
        const devices = await DeviceModel.find().sort({name:1});
        return devices;
    }catch (ex){
        console.log(ex.message)
    }
}
async function getBrands(){
    try {
        const brands = await BrandModel.find().sort({name:1});
        return brands;
    }catch (ex){
        console.log(ex.message)
    }
}


module.exports.getLocations = getLocations
module.exports.getFunctions = getFunctions
module.exports.getDevices = getDevices
module.exports.getBrands = getBrands
module.exports.getIgenyfelmeresRecords = getIgenyfelmeresRecords