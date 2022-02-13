const express = require('express');
const { UserInSession } = require("../home")
const { IgenyfelmeresLineRecordModel } = require('../../../model/igenyfelmeres_data_models/igenyfelmeres_line_records_Model');
const { DevicePriceModel } = require('../../../model/igenyfelmeres_data_models/price_for_devices');
const {getLocations} = require("../../database/igenyfelmeres_data_handler");
const router = express.Router();

const auth = require("../../middleware/auth");





router.get('/get-test',auth ,async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    //const projects = await getProjects(user._id);
    res.send("kacsa");
});
router.get('/get-locations',auth ,async (req,res) => {
    const locations = await getLocations();
    res.send(locations);
});
router.get('/get-price-for-device/:device_id',auth ,async (req,res) => {
    const device = await DevicePriceModel.findOne();
    if(device){
        res.send(device);
    }else{
        res.send({price: 0});
    }

});










router.put('/rename-name-line-record/:id/:new_name',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {name: req.params.new_name}, {
        new: true
    });
    res.send(line_record);
});
router.put('/rename-description-line-record/:id/:new_description',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {description: req.params.new_description}, {
        new: true
    });
    res.send(line_record);
});
router.put('/change-option-line-record/:id/:new_location_id',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {location: req.params.new_location_id}, {
        new: true
    });
    res.send(line_record);
});

router.put('/change-fucntion-line-record/:id/:new_function_id',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {function: req.params.new_function_id}, {
        new: true
    });
    res.send(line_record);
});
router.put('/change-device-line-record/:id/:new_device_id',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {device: req.params.new_device_id}, {
        new: true
    });
    res.send(line_record);
});
router.put('/change-brand-line-record/:id/:new_brand_id',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {brand: req.params.new_brand_id}, {
        new: true
    });
    res.send(line_record);
});


module.exports = router;