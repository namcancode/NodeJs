import Sequelize from "sequelize";
import { sequelize } from "../databases/database";
import User from './User'
import CommentTB from './CommentTB'
const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  createdAt: {
      field: 'createdat',
      type: Sequelize.DATE
  },
  updatedAt: {
    field: 'updatedat',
    type: Sequelize.DATE
  },
  timepost:{
		type: Sequelize.INTEGER
  },
  view: {
    type: Sequelize.INTEGER
  }
});

 User.hasMany(Post,{foreignKey: "author", sourceKey:"email"})
Post.belongsTo(User,{foreignKey: "author", targetKey: "email"})
Post.belongsTo(CommentTB,{foreignKey: "id", targetKey: "postid"})
CommentTB.belongsTo(User,{foreignKey: "email", targetKey: "email"})
export default Post;
