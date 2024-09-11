import { Schema, model, models } from "mongoose";

const UserProviderSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

const UserProvider = models.UserProvider || model("UserProvider", UserProviderSchema);
export default UserProvider;