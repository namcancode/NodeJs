import Post from "../models/Post";
import User from "../models/User";

// GET POST
export const listAllPosts = async params => {
	const { offset } = params;
	try {
		const allPosts = await Post.findAll({
			limit: 20,
			offset: offset ? offset * 20 : 0,
			order: [["timepost", "DESC"]],
			// attributes: [
			// 	"id",
			// 	"title",
			// 	"content",
			// 	"tags",
			// 	"description",
			// 	"createdAt",
			// 	"updatedAt"
			// ],
			required: true,
			include: [
				{
					model: User,
					attributes: ["email", "image"], //Lay username va avatar cua user tu model User
					required: true
				}
			]
		});
		return allPosts;
	} catch (error) {
		throw error;
	}
};

// GET POST THEO USERNAME
export const listAllPostsUsername = async (params, username) => {
	const { offset } = params;
	const allPostsUsername = await Post.findAll({
		limit: 100,
		offset: offset ? offset * 100 : 0, //if (offset) => offset*limit, else: 0
		where: {
			author: username
		},
		order: [["timepost", "DESC"]]
	});
	try {
		return allPostsUsername;
	} catch (error) {
		throw error;
	}
};

// GET POST THEO ID
export const getPostById = async params => {
	const { id } = params;
	const postById = await Post.findOne({
		where: {
			id
		},
		required: true,
		include: [
			{
				model: User,
				attributes: ["email", "image"], //Lay username va avatar cua user tu model User
				required: true
			}
		]
	});
	try {
		return postById;
	} catch (error) {
		throw error;
	}
};

//CREATE POST
export const createPost = async params => {
	const { title, content, tags, email } = params;
	try {
		const userFinded = await User.findOne({
			where: { email }
		});
		const timepost = Date.now();
		if (userFinded && userFinded.isactive == "true") {
			const newPost = await Post.create(
				{
					title,
					content,
					tags,
					author:email,
					view:0,
					timepost
				},
				{
					fields: [
						"title",
						"content",
						"tags",
						"author",
						"view",
						"timepost"
					]
				}
			);
			return newPost;
		} else return null;
	} catch (error) {
		throw error;
	}
};

//UPDATE POST
export const updatePost = async (params, id) => {
	const { title, content, image, description, tags, author, view, timepost } = params;
	try {
		const userFinded = await User.findOne({
			where: { author }
		});
		if (userFinded && userFinded.isactive == "true") {
			const editPost = await Post.update(
				{
					title,
					content,
					image,
					description,
					tags,
					author
				},
				{
					where: {
						id
					}
				}
			);
		} else return null;

		return editPost;
	} catch (error) {
		throw error;
	}
};

//UPDATE POST VIEW
export const updatePostView = async (params) =>{
	const {id} = params
	try {
		const post = await Post.findOne({
			where: { id }
		});
		post.view++
		const editView = await Post.update(
			{
				view: post.view
			},
			{
				where: {
					id
				}
			}
		)
	} catch (error) {

	}
}

//DELETE POST
export const deletePost = async params => {
	const { id } = params;
	try {
        const userFinded = await User.findOne({
			where: { author }
		});
		if (userFinded && userFinded.isactive == "true") {
			const destroyPost = await Post.destroy({
                where: {
                    id
                }
            });
            return destroyPost;
		} else return null;
	} catch (error) {
		throw error;
	}
};
