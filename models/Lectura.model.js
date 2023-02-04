import { Schema, model } from "mongoose";

const lecturaSchema = new Schema({
    nocontador: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    cliente: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    direccion: {
        type: String,
        required: true,
        unique: false,
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    periodo: {
        type: Schema.Types.ObjectId,
        ref: "Periodo",
        required: true
    },
    cancelado: {
        type: Boolean,
        default: false
    },
    

    timestap: true

});

export const Lectura = model('Lectura', lecturaSchema);