const {User} = require("../../model/userModel");
const {BrandModel} = require("../../model/igenyfelmeres_data_models/brands_enum_Model");
const {DeviceModel} = require("../../model/igenyfelmeres_data_models/devices_enum_Model");
const {FunctionInHouseModel} = require("../../model/igenyfelmeres_data_models/functions_enum_Model");
const {LocationModel} = require("../../model/igenyfelmeres_data_models/locations_enum_Model");
const {IgenyfelmeresRecordModel} = require("../../model/igenyfelmeres_data_models/igenyfelmeres_records_Model");
const {IgenyfelmeresLineRecordModel} = require("../../model/igenyfelmeres_data_models/igenyfelmeres_line_records_Model");


async function create_random_objects(userId){
    /*await createBrands(userId);
    await createDevices(userId);
    await createFunctions(userId);
    await createLocations(userId);
    return;*/
    //await creatIgenyfelmeresRecord(userId);
    await createIgenyfelmeresLine(userId);
    return;
}
async function createIgenyfelmeresLine(userId){
    console.log(await BrandModel.find());
    /*const ifr_name = "Igényfelmérés line " + await IgenyfelmeresLineRecordModel.find().count();
    let ifr = new IgenyfelmeresLineRecordModel({
        name: ifr_name,
        location: LocationModel.findOne(),
        description: "EZ egy description",
        function: FunctionInHouseModel.findOne(),
        device: DeviceModel.findOne(),
        brand:BrandModel.findOne(),
        piece:1,
        price:0,
        created_user:userId,
    });
    ifr = await ifr.save();
    */
    return;
}
async function creatIgenyfelmeresRecord(userId){
    const ifr_name = "Igényfelmérés rekord " + await IgenyfelmeresRecordModel.find().count();
    let ifr = new IgenyfelmeresRecordModel({
        name: ifr_name,
        line_records: [],
        sharedwith:[userId, "61d0cb515c3d78973b9bf765"],
        created_user: userId
    });
    ifr = await ifr.save();

    return;
}
async function createLocations(userId){
    let location_names= ["Közlekedő","Előtér","Főbejárat","Fürdőszoba","Gyerekszoba 1","Gyerekszoba 2","Hálószoba","Kert","Nappali/Konyha","Terasz","WC"];
    for(let location_name of location_names){
        let location = new LocationModel({
            name: location_name,
            created_user: userId,
        });
        location = await location.save();
    }
    return;
}
async function createFunctions(userId){
    let function_names= ["Árnyékolástechnika","Beléptetés","Egyéb","Életvédelem","Hűtés-fűtés","IT","Kertápolás","Központi vezérlő","Légtechnika","mozgásérzékelő","Okosbútor","Világítás"];
    for(let function_name of function_names){
        let func = new FunctionInHouseModel({
            name: function_name,
            created_user: userId,
        });
        func = await func.save();
    }
    return;
}
async function createDevices(userId){
    let device_names= ["Controller","DIN LS tree 2 bővítő","DIN Relay 10","Fürdőből indul","füstérzékelő","garázskapu","iCON 200","időjárás állomás","iPad","kaputelefon","kerti kiskapu","Központra rákötve, ha nem akarnak dimmelést.","locsolórendszer","LS Alt 2","LS Alt 8","LS Dimmer 230","LS RGBW","LS Shutter","LS Socket","LS Termostat","mozgásérzékelő","nyitásérzékelő","páraelszívó","riasztó","robotfűnyíró","robotfűnyíró dokkoló","Sensibo","szagelszívó","tápegység","thermofej","UPS","videorögzítő"];
    for(let device_name of device_names){
        let device = new DeviceModel({
            name: device_name,
            created_user: userId,
        });
        device = await device.save();
    }
    return;
}
async function createBrands(userId){
    let brand_names= ["Apple","Chameleon","DoorBird","MGE","NGBS","Paradox","Sensibo","TP_Link"];
    for(let brand_name of brand_names){
        let brand = new BrandModel({
            name: brand_name,
            created_user: userId,
        });
        brand = await brand.save();
    }
    return;
}
module.exports.createRandomObjects = create_random_objects