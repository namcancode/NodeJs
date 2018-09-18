var express = require("express");
var router = express.Router();

import * as Message from "../configs/config";
import * as PostController from "../controllers/PostController";
import * as UserController from "../controllers/UserController";
import * as CommentController from "../controllers/CommentController"

/* GET home page. */
router.get("/topic/:id", async function(req, res, next) {
	const { id } = req.params;
	try {
		const updateView = await PostController.updatePostView(req.params)
		const findPostById = await PostController.getPostById(req.params);

		const inforAuthor = await UserController.getInfoByUsername(
			findPostById.author
		);
		const getComment = await CommentController.listAllComment(req.params)
		if (req.user) {
			res.render("details", {
				user: req.user,
				postsid: findPostById,
				status: inforAuthor.status,
				comments:getComment
			});
		} else {
			res.render("details", {
				user: "",
				postsid: findPostById,
				status: inforAuthor.status,
				comments:getComment
			});
		}
	} catch (error) {
		// console.log(`error: ${error}`);
		throw error;
	}
});

router.post("/apiPostComment",async (req,res) => {
	const { email, comment, parentid, postid } = req.body;
	try {
		if(comment){
			const addComment = await CommentController.createComment(req.body);
			if (addComment){
				res.json({
					result: Message.SUCCESS,
					message: Message.COMMENTSUCCESS,
					data: addComment
				  });
			}
			else {
				res.json({
					result: Message.FAILED,
					message: Message.COMMENTFAILED,
					data: null
				  });
			}
		}else{
			res.json({
				result: Message.FAILED,
				message: Message.COMMENTFAILEDEMPTY,
				data: null
			  });
		}


	} catch (error) {
		res.json({
			result: Message.FAILED,
			message:`error : ${error}`,
			data: null
		  });
	}
})
router.post("/apiMoreComment", async (req,res) =>{
	const { offset,id } = req.body;
	try {
		const allCommentInDb = await CommentController.listAllComment(req.body);
		if(allCommentInDb.length >0) {
			res.json({
				result: Message.SUCCESS,
				data:allCommentInDb,
				Message:Message.POSTSHOWSUCCESS
			})
		}else res.json({
			result: Message.FAILED,
			data:allCommentInDb,
			Message:Message.POSTSHOWFAILED
		})

	} catch (error) {
		res.json({
			result: Message.FAILED,
			data:error,
			Message:`Faild error: ${error}`
		})
	}
})
module.exports = router;
