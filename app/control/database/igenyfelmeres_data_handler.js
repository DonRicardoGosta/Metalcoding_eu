const {User} = require("../../model/userModel");
const {BrandModel} = require("../../model/igenyfelmeres_data_models/brands_enum_Model");
const {DeviceModel} = require("../../model/igenyfelmeres_data_models/devices_enum_Model");
const {FunctionInHouseModel} = require("../../model/igenyfelmeres_data_models/functions_enum_Model");
const {LocationModel} = require("../../model/igenyfelmeres_data_models/locations_enum_Model");
const {IgenyfelmeresRecordModel} = require("../../model/igenyfelmeres_data_models/igenyfelmeres_records_Model");
const {IgenyfelmeresLineRecordModel} = require("../../model/igenyfelmeres_data_models/igenyfelmeres_line_records_Model");
const {Project} = require("../../model/project-management-modells/projectModel");


async function getIgenyfelmeresRecords(user_id){
    if(user_id){
        try {
            const igenyfelmeres_records = await IgenyfelmeresRecordModel
                .find({sharedwith : user_id.toString()})
                .populate({
                    path : 'line_records',
                    populate : {
                        path : 'location function'
                    }
                })
                .select('name _id');
            return igenyfelmeres_records;
        }catch (ex){
            console.log(ex.message)
        }
    }
}


module.exports.getIgenyfelmeresRecords = getIgenyfelmeresRecords