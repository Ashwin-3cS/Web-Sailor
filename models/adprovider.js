import { Schema, model, models } from 'mongoose';

const AdProviderSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email Already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^[a-zA-Z0-9._]{5,20}$/, "Username invalid, it should contain 5-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

const AdProviders = models.AdProviders || model("AdProviders", AdProviderSchema);

export default AdProviders;
