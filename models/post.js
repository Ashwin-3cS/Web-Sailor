import {Schema,model,models} from 'mongoose';

const PostSchema = new Schema (
    {
            creator : {
                type : Schema.Types.ObjectId,
                ref : 'User'
            },
            post : {
                type : String,
                required : [true,'Post is  required']
            },
            link : {
                type : String,
                required : [true , 'Link of the website is required']
            },
            image : {
                type : String,
                default : null,
            },
            tag:{
                type: String,
                required : [true,'Tag is required']
            }
    }
)

const Post = models.Post || model ('Post',PostSchema)

export default Post ;