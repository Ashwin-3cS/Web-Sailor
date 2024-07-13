import { Schema, model, models } from 'mongoose';

const AdproviderPostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postContent: {
        type: String,
        required: [true, 'Postcontent is required']
    },
    posthash: {
        type: String,
        required: [true, 'Posthash is required']
    }
});

// Check if the model already exists before defining it
const AdProviderPost = models.AdProviderPost || model('AdProviderPost', AdproviderPostSchema);

export default AdProviderPost;
