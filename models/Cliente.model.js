import { Schema, model } from "mongoose";

const clienteSchema = new Schema({	
    nocontador:{	
        type: String,	
        required: true,	
        trim: true,	
        unique: true,	
        lowercase: true,	
        index: {unique: true},	
    },	
    cliente:{	
        type: String,	
        required: true,
        trim: true,
        lowercase: true	
    },
    direccion: {
        type: String,
        required: true,
        unique: false,
    }
});

export const User = model('Cliente', clienteSchema);	