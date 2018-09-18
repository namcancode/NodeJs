import Sequelize from "sequelize";
import { sequelize } from "../databases/database";
import Post from "./Post";
import User from "./User";
const CommentTB = sequelize.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING
	},
	comment: {
		type: Sequelize.STRING
	},
	parentid: {
		type: Sequelize.INTEGER
	},
	postid: {
		type: Sequelize.INTEGER
	},
	createdAt: {
		field: "createdat",
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		field: "updatedat",
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	timecomment:{
		type: Sequelize.INTEGER
	}
},{
	// timestamps:false
});
// User.hasMany(CommentTB,{foreignKey: "username", sourceKey:"username"})
// Post.hasMany(CommentTB, { foreignKey: "postid", sourceKey: "id" });
// Post.belongsTo(CommentTB, { foreignKey: "id", targetKey: "postid" });
// CommentTB.belongsTo(User,{foreignKey: "username", targetKey: "username"})
// CommentTB.belongsTo(User, { foreignKey: "username", targetKey: "username" });
export default CommentTB;
