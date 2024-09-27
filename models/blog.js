import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        required: true
    },
        creatorType: {
        type: String,
        required: true,
        enum: ['User', 'UserProvider'] 
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog; 