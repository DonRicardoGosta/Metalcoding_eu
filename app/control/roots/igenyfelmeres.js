const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createRandomObjects, create_device } =require("../database/create_random_obejct_for_igenyfelmeres");

const { UserInSession } = require("./home")

const auth = require("../middleware/auth");
const {getIgenyfelmeresRecords, getLocations, getFunctions, getDevices, getBrands} = require("../database/igenyfelmeres_data_handler");


router.get('/', auth, async (req,res) => {
    try {


    let user = null;
    if (await UserInSession(req)) user = await UserInSession(req);
    const igenyfelmeres_records = await getIgenyfelmeresRecords(user._id);
    const active_igenyfelmero_record = await igenyfelmeres_records[0];
    const lines_for_active_ifmero = await active_igenyfelmero_record.line_records;
    const locations = await getLocations();
    const functions = await getFunctions();
    const devices = await getDevices();
    const brands = await getBrands();
    res.render('smarthome_igenyfelmeres', {
        title: 'MagoriCO - SmartHome - Igényfelmérés',
        user: user,
        //igenyfelmeres_records: igenyfelmeres_records,
        //active_igenyfelmero_record: active_igenyfelmero_record,
        //lines_for_active_ifmero: lines_for_active_ifmero,
        //locations: locations,
        //functions: functions,
        devices: devices,
        //brands: brands
    });
    }catch (ex){
        console.log(ex.message);
    }
});


router.get('/fill',auth ,async (req,res) => {
    /*let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10a3", "", 79900);
    let device1 =await create_device(user._id, "DIN Shutter 5");
    await createRandomObjects(user._id, "", device1._id, "", 79900);
    let device2 =await create_device(user._id, "DIN Dimmer 6");
    await createRandomObjects(user._id, "", device2._id, "", 99000);
    let device3 =await create_device(user._id, "DIN Digital Input 24");
    await createRandomObjects(user._id, "", device3._id, "", 59000);
    let device4 =await create_device(user._id, "DIN Analog Input 4");
    await createRandomObjects(user._id, "", device4._id, "", 62900);
    let device5 =await create_device(user._id, "DIN Analog Output 4");
    await createRandomObjects(user._id, "", device5._id, "", 62900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10a1", "", 45900);
    let device6 =await create_device(user._id, "LS Switch");
    await createRandomObjects(user._id, "", device6._id, "", 21900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10b9", "", 16900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10bb", "", 26900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10bd", "", 32900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10bf", "", 27900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10c1", "", 21900);
    await createRandomObjects(user._id, "", "6200162083ce9b410f4f10c5", "", 15900);*/

    res.redirect('/smarthome-igenyfelmeres');
});











router.use(function(req, res){
    res.redirect('/smarthome-igenyfelmeres');
});

module.exports = router;