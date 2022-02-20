const express = require('express');
const { UserInSession } = require("../home")
const { IgenyfelmeresLineRecordModel } = require('../../../model/igenyfelmeres_data_models/igenyfelmeres_line_records_Model');
const { DevicePriceModel } = require('../../../model/igenyfelmeres_data_models/price_for_devices');
const router = express.Router();
const {getLocations} = require("../../database/igenyfelmeres_data_handler");
const {IgenyfelmeresRecordModel} = require("../../../model/igenyfelmeres_data_models/igenyfelmeres_records_Model");
const {DeviceModel} = require("../../../model/igenyfelmeres_data_models/devices_enum_Model");

const auth = require("../../middleware/auth");
const {LocationModel} = require("../../../model/igenyfelmeres_data_models/locations_enum_Model");
const {FunctionInHouseModel} = require("../../../model/igenyfelmeres_data_models/functions_enum_Model");
const {BrandModel} = require("../../../model/igenyfelmeres_data_models/brands_enum_Model");
const {Card} = require("../../../model/project-management-modells/cardModel");






router.get('/get-test',auth ,async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    //const projects = await getProjects(user._id);
    res.send("kacsa");
});
router.get('/get-price-for-device/:id',auth ,async (req,res) =>{
    const device = await DevicePriceModel.find({device: req.params.id});
    if(device&&device.length>0){
        res.send(device);
    }else{
        res.send({error: true});
    }

});
router.get('/get-line-rec-pieces-num/:line_rec_id',auth ,async (req,res) =>{
    const line_rec = await IgenyfelmeresLineRecordModel.findById(req.params.line_rec_id);
    res.send(line_rec);


});

router.get('/get-new-line-record/:igenyfelmeres_record_id',auth ,async (req,res) =>{
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);

    const new_line_name = "Igényfelmérés line " + await IgenyfelmeresLineRecordModel.find().count();
    let new_line = new IgenyfelmeresLineRecordModel({
        name: new_line_name,
        location: await LocationModel.findOne(),
        description: "EZ egy description",
        function: await FunctionInHouseModel.findOne(),
        device: await DeviceModel.findOne(),
        brand: await BrandModel.findOne(),
        created_user: user._id,
    });
    new_line = await new_line.save();
    let igenyfelmeres_record = await IgenyfelmeresRecordModel.findOneAndUpdate(
        {_id: req.params.igenyfelmeres_record_id},
        {$push: {line_records: new_line._id}}, {
        new: true
    });

    res.send("done");
});









router.put('/increase-piece/:line_record_id',auth ,async (req,res) =>{
    const line_rec = await IgenyfelmeresLineRecordModel.find({_id: req.params.line_record_id});
    let new_piece = line_rec[0].piece + 1;

    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.line_record_id}, {piece: new_piece}, {
        new: true
    });
    res.send({piece: line_record.piece});
});
router.put('/decrease-piece/:line_record_id',auth ,async (req,res) =>{
    const line_rec = await IgenyfelmeresLineRecordModel.find({_id: req.params.line_record_id});
    if(line_rec[0].piece <= 1){
        res.send({piece: -1})
    }else{
        let new_piece = line_rec[0].piece - 1;

        let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.line_record_id}, {piece: new_piece}, {
            new: true
        });
        res.send({piece: line_record.piece});
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

router.delete('/delete-line/:line_rec_id',auth ,async (req,res) => {
    const line_rec = await IgenyfelmeresLineRecordModel.findByIdAndRemove(req.params.line_rec_id);
    if(!line_rec) {
        res.send({success: false})
    }else{
        res.send({success: true})
    }
});
//""

module.exports = router;