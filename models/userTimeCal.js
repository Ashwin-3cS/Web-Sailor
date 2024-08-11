// models/UserTimeCal.js

import { Schema, model,models } from 'mongoose';

const userTimeCalSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  totalViewTime: {
    type: Number, // Store as integer (milliseconds)
    required: true
  }
});

const UserTimeCal = models.UserTimeCal || model("UserTimeCal", userTimeCalSchema);


export default UserTimeCal;
