import mongoose, { Schema, Document } from "mongoose";

interface IListItem {
  firstName: string;
  phone: string;
  notes?: string;
}

export interface IList extends Document {
  agentId: mongoose.Types.ObjectId;
  items: IListItem[];
  uploadedAt: Date;
}

const listItemSchema = new Schema<IListItem>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

const listSchema = new Schema<IList>({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  items: [listItemSchema],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model<IList>("List", listSchema);
export default List;
