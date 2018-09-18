import Post from "../models/Post";
import User from "../models/User";
import CommentTB from "../models/CommentTB";
// GET POST
export const listAllComment = async params => {
	const { offset,id } = params;
	try {
		const allComment = await Post.findAll({
			limit: 5,
			offset: offset ? offset * 5 : 0,
			where:{id},
	/* 		attributes: [
				"id",
				// "username",
				// "comment",
				// "parentid",
				// "postid",
				// "createdAt",
				"updatedAt"
			], */
			required: true,
			include: [
				{
					model: CommentTB,
					order: [["timecomments", "DESC"]],
					// attributes: ["id", "image"], //Lay username va avatar cua user tu model User
					required: true,
					include: [
						{
							model: User,
							attributes: ["email", "image", "id","status"], //Lay username va avatar cua user tu model User
							required: true
						}
					]
				}
			]
		});
		return allComment;
	} catch (error) {
		throw error;
	}
};

//CREATE POST
export const createComment = async params => {
	const { email, comment, parentid, postid } = params;
	try {
		const userFinded = await User.findOne({
			where: { email }
		});
		if (userFinded && userFinded.isactive == "true") {
			const timecomment = Date.now();
			const newComment = await CommentTB.create(
				{
					email,
					comment,
					parentid: parentid ? parentid : 0,
					postid,
					timecomment
				},
				{
					fields: ["email", "comment", "parentid", "postid","timecomment"]
				}
			);
			return newComment;
		} else return null;

	} catch (error) {
		throw error;
	}
};


