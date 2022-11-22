import { Schema,Types,model } from "mongoose";
import { ICredit } from '../utils/interface'


const creditSchema = new Schema({
    amount:{type:Number},
    receiver:{type:Types.ObjectId,ref:'User'},
    sender:{type:Types.ObjectId,ref:'User'},
    status:{types:String,default:'pending',enum:['pending','successful','declined','failed','cancelled','conflict']},
    transactionType:{type:String,enum:['bank-transfer','deposit']},
    reference:{type:String}
},{timestamps:true});

export default model<ICredit>('Credit',creditSchema);