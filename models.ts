import db from "./db";
import { INTEGER, Model } from "sequelize";

export const Profile = db.makeModel(class Profile extends Model {}, {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

db.init();
