import mongoose from 'mongoose'
import { Iproduct } from '../utils/interface'

const productSchema = new mongoose.Schema ({
    name:{type:String},
    category:{type:String},
    description:{type:String},
    images:[String],
    price:{type:Number},
    sizes:[String],
    rating:{type:Number},
})

export default mongoose.model<Iproduct>('Product',productSchema);