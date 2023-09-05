import { Schema, Document } from "mongoose";

const deleteAtPath = (obj: Record<string, any>, path: string[], index: number) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

export const toJSON = (schema: Schema) => {
  const schemaOptions = schema.get("toJSON");

  schema.set(
    "toJSON",
    Object.assign(schemaOptions || {}, {
      transform: (doc: Document, ret: Record<string, any>, options: any) => {
        Object.keys(schema.paths).forEach((path) => {
          if (schema.paths[path].options && schema.paths[path].options.private) {
            deleteAtPath(ret, path.split("."), 0);
          }
        });

        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      }
    })
  );
};
