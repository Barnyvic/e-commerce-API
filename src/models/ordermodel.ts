import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    orderId:{type:String,required:true},
    vendorId:{type:String,required:true},
    item:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},required:true}],
    totalAmount:{type:Number,required:true},
    paidAmount:{type:Number,required:true},
    orderDate:{type:Date},
    orderStatus:{type:String},
    remarks:{type:String},
})

export default mongoose.model('Order',orderSchema);