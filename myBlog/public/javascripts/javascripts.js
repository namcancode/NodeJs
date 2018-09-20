let offset = 1;
let isAjaxLoading = false;
// LOG OUT ADMIN
function logOut(e) {
	// e.preventDefault()
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/users/logout`;
	const usernameaa = $("#usernameNeeded")
		.text()
		.trim();
	$.ajax({
		url: url,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		type: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*"
		},
		async: true,
		data: { email: usernameaa },
		//   data: $("form").serialize(),
		dataType: "json",
		success: function(result) {
			window.location.href = `${location.protocol}//${document.domain}:${
				location.port
			}/users/login`;
		}
	});
}

//LOG OUT INDEX
function logOutIndex(e) {
	// e.preventDefault()
	const usernameaa = $("#usernameNeed")
		.text()
		.trim();
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/users/logout`; // api trong admin
	$.ajax({
		url: url,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		type: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*"
		},
		async: true,
		data: { email: usernameaa },
		//   data: $("form").serialize(),
		dataType: "json",
		success: function(result) {
			if (window.location.pathname.split("/").pop() == "") {
				$("#nav-dropdown")
					.html(`<ul id="logged-out-menu" class="nav navbar-nav navbar-right">

      <li>
        <a href="/users/login">
          <i class="fas fa-sign-in visible-xs-inline"></i>
          <span>Login</span>
        </a>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li data-original-title="" title="">
        <form id="search-form" class="navbar-form navbar-right hidden-xs" role="search" method="GET" action="">
          <button id="search-button" type="button" class="btn btn-link"><i class="fas fa-search fa-fw" title="Search"></i></button>
          <div class="hidden" id="search-fields">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search" name="query" value="">
              <a href="#"><i class="fas fa-gears fa-fw advanced-search-link"></i></a>
            </div>
            <button type="submit" class="btn btn-default hide">Search</button>
          </div>
        </form>
      </li>
      <li class="visible-xs" id="search-menu">
        <a href="#">
          <i class="fas fa-search fa-fw"></i> Search
        </a>
      </li>
    </ul>

    <ul class="nav navbar-nav navbar-right hidden-xs">
      <li>
        <a href="#" id="reconnect" class="hide" title="" data-original-title="Connection to Blog has been lost, attempting to reconnect..."><i
            class="fas fa-check"></i></a>
      </li>
    </ul>

    <ul class="nav navbar-nav navbar-right pagination-block visible-lg visible-md">
      <li class="dropdown">
        <i class="fas fa-angle-double-up pointer fa-fw pagetop"></i>
        <i class="fas fa-angle-up pointer fa-fw pageup"></i>

        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <span class="pagination-text"></span>
        </a>

        <i class="fas fa-angle-down pointer fa-fw pagedown"></i>
        <i class="fas fa-angle-double-down pointer fa-fw pagebottom"></i>

        <div class="progress-container">
          <div class="progress-bar"></div>
        </div>

        <ul class="dropdown-menu" role="menu">
          <input type="text" class="form-control" id="indexInput" placeholder="Enter index">
        </ul>
      </li>
    </ul>

    <ul id="main-nav" class="nav navbar-nav">
      <li class="">
        <a href="#" title="" data-original-title="Categories">
          <i class="fas fa-fw fa-list"></i>

          <span class="visible-xs-inline">Categories</span>
        </a>
      </li>
      <li class="">
        <a href="/recent" title="" data-original-title="Recent">
          <i class="fas fa-fw fa-clock-o"></i>

          <span class="visible-xs-inline">Recent</span>
        </a>
      </li>

      <li class="">
        <a href="/tags" title="" data-original-title="Tags">
          <i class="fas fa-fw fa-tags"></i>

          <span class="visible-xs-inline">Tags</span>
        </a>
      </li>
      <li class="">
        <a href="#" title="" data-original-title="Popular">
          <i class="fas fa-fw fa-fire"></i>

          <span class="visible-xs-inline">Popular</span>
        </a>
      </li>
      <li class="">
        <a href="#" title="" data-original-title="Users">
          <i class="fas fa-fw fa-user"></i>

          <span class="visible-xs-inline">Users</span>
        </a>
      </li>
      <li class="">
        <a href="/groups" title="" data-original-title="Groups">
          <i class="fas fa-fw fa-group"></i>

          <span class="visible-xs-inline">Groups</span>
        </a>
      </li>

      <li class="">
        <a href="/search" title="" data-original-title="Search">
          <i class="fas fa-fw fa-search"></i>

          <span class="visible-xs-inline">Search</span>
        </a>
      </li>
    </ul>`);
				$(".pull-right").html(
					`<a href="/users/login"><button class="btn btn-primary">Login to post</button></a>`
				);
			} else {
				location.reload();
			}
		}
	});
}

// SAVE BTN TO UPDATE PROFILE
$("#save-form").submit(function saveBtn(e) {
	e.preventDefault(); // loai bo trang thai mac dinh (submit k reload nua)
	//   console.log("hello");
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/admin/editprofile`;
	// const updatedInput = $("#save-form").serialize(); //serialize() lay data tu input
	const updatedImage = $("#exampleInputEmail1").val();
	const updatedPass = $("#exampleInputPassword1").val();
	const updatedRepass = $("#exampleInputPassword2").val();
	const usernameFrForm = $("#usernameNeeded")
		.text()
		.trim(); // loai bo khoang trang
	$.ajax({
		url: url,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		type: "PUT",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*"
		},
		async: true,
		data: {
			email: usernameFrForm,
			image: updatedImage,
			password: updatedPass,
			repassword: updatedRepass
		},
		// data: updatedInfo,
		dataType: "json",
		success: function(notice) {
			// console.log(result);
			if (notice.result === "success") {
				toastr.options = {
					closeButton: true,
					debug: false,
					newestOnTop: true,
					progressBar: true,
					positionClass: "toast-top-right",
					preventDuplicates: false,
					showDuration: 300,
					hideDuration: 1000,
					timeOut: 3000,
					extendedTimeOut: 1000,
					showEasing: "swing",
					hideEasing: "linear",
					showMethod: "fadeIn",
					hideMethod: "fadeOut"
				};
				toastr["success"](`${notice.message}`, "Notification");
				$("#user-avatar11").html(`
            <img src="${updatedImage}" alt="Avatar">`);
				$("#avatar-in-form").html(`
            <img src="${updatedImage}" alt="Avatar">`);
			} else if (notice.result == "failed") {
				toastr.options = {
					closeButton: true,
					debug: false,
					newestOnTop: true,
					progressBar: true,
					positionClass: "toast-top-right",
					preventDuplicates: false,
					showDuration: 300,
					hideDuration: 1000,
					timeOut: 3000,
					extendedTimeOut: 1000,
					showEasing: "swing",
					hideEasing: "linear",
					showMethod: "fadeIn",
					hideMethod: "fadeOut"
				};
				toastr["error"](`${notice.message}`, "Notification");
			}
			//  window.location.href = `${location.protocol}//${document.domain}:${location.port}/login`
		}
	});
	//   });
});

// SEND BTN TO CREATE NEW POST
$("#form-edit-text").submit(function(e) {
	e.preventDefault(); // loai bo trang thai mac dinh (submit k reload nua)
	//   console.log("hello");
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/admin/newpost`;
	const updatedInput = $(this).serialize(); //serialize() lay data tu input
	// console.log($(this).serialize());
	$.ajax({
		url: url,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		type: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*"
		},
		async: true,
		data: updatedInput,
		// data: updatedInfo,
		dataType: "json",
		success: function(notice) {
			// console.log(result);
			if (notice.result === "success") {
				toastr.options = {
					closeButton: true,
					debug: false,
					newestOnTop: true,
					progressBar: true,
					positionClass: "toast-top-right",
					preventDuplicates: false,
					showDuration: 300,
					hideDuration: 1000,
					timeOut: 3000,
					extendedTimeOut: 1000,
					showEasing: "swing",
					hideEasing: "linear",
					showMethod: "fadeIn",
					hideMethod: "fadeOut"
				};
				toastr["success"](`${notice.message}`, "Notification");
			} else if (notice.result == "failed") {
				toastr.options = {
					closeButton: true,
					debug: false,
					newestOnTop: true,
					progressBar: true,
					positionClass: "toast-top-right",
					preventDuplicates: false,
					showDuration: 300,
					hideDuration: 1000,
					timeOut: 3000,
					extendedTimeOut: 1000,
					showEasing: "swing",
					hideEasing: "linear",
					showMethod: "fadeIn",
					hideMethod: "fadeOut"
				};
				toastr["error"](`${notice.message}`, "Notification");
			}
			//  window.location.href = `${location.protocol}//${document.domain}:${location.port}/login`
		}
	});
	//   });
});

// CLICK AVATAR, GET DROPDOWN MENU
$("#user_label").click(e => {
	$("#user_label").toggleClass("open");
});

// LAY user-data khi click vao status
$(".user-status").click(function(e) {
	const email = $("#usernameNeed")
		.text()
		.trim();
	const status = $(this).data("status");
	// console.log(statusss);
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/users/apiUpdateStatus`;
	$.ajax({
		url: url,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		type: "PUT",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*"
		},
		async: true,
		data: { email, status },
		//   data: $("form").serialize(),
		dataType: "json",
		success: function(result) {
			$("#updateStHere")
				.removeClass("away dnd online offline")
				.addClass(`${status}`);
		}
	});
});

// More Post
function morePostWithScroll(e) {
	$("#menu").removeClass("dsblock");
	const endPoint = window.innerHeight + window.scrollY; //tọa độ của scroll hiện tại
	if (
		//nếu như tọa độ hiện tại + 20% lớn hơn chiều dài của body thì bắt đầu thực hiện
		endPoint + endPoint * 0.2 >= document.body.offsetHeight ||
		endPoint >= document.body.offsetHeight
	) {
		const url = `${location.protocol}//${document.domain}:${location.port}`;

		if (!isAjaxLoading) {
			//sử dụng phương thức cắm cờ để check xem ajax có đang hoạt động không, false thì bắt đầu chạy ajax
			isAjaxLoading = !isAjaxLoading; // ajax đang chạy chuyển biến thành true ngăn ko chạy lặp lại

			if (window.location.pathname.split("/").pop() == "") {
				$.ajax({
					url: `${url}/apiMorePost`,
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					type: "POST",
					async: true,
					data: { offset },
					dataType: "json",
					success: function(result) {
						if (result.result === "success") {
							const { data } = result; //nhận kết quá của api trả về
							data.forEach((post,index) => {
								$(".topic-list").append(`
								<li component="category/topic" class="row clearfix unread" data-tid="1878" data-index="${index}"
								data-cid="${index}" itemprop="itemListElement">
								<meta itemprop="name" content="">
								<div class="col-md-7 col-sm-9 col-xs-10 content">
								  <div class="avatar pull-left" data-original-title="" title="">
									<a href="#" class="pull-left">
									  <img component="user/picture" data-uid="4866" src="${post.user.image}" class="user-img" title="${post.user.username}"
										data-original-title="${post.user.username}">
									</a>
								  </div>
								  <h2 component="topic/header" class="title">
									<i component="topic/pinned" class="fas fa-thumb-tack hide"></i>
									<i component="topic/locked" class="fas fa-lock hide"></i>
									<a href="/details/topic/${post.id}" itemprop="url">
									  ${post.title}></a><br>
									<small>
									  <a href="#"><span class="fa-stack fa-lg"><i style="color:#e95c5a;"
											class="fas fa-circle fa-stack-2x"></i><i style="color:#fff;" class="fas fa-question fa-stack-1x"></i></span>
										${post.tags}</a> •
									</small>
									<span class="tag-list hidden-xs">
									</span>
								  </h2>
								</div>

								<div class="mobile-stat col-xs-2 visible-xs text-right">
								  <span class="human-readable-number">1</span> <a href="#"><i class="fas fa-arrow-circle-right"></i></a>
								</div>
								<div class="col-md-5 hidden-sm hidden-xs stats">
								  <span class="human-readable-number" title="${post.view}">
									${post.view}</span><br>
								  <small>Views</small>
								</div>
							  </li>
				`);
							});
						}
					},
					complete: function(data) {
						offset++; //khi thêm post xong thì tăng biến offset lên 1 để gọi thêm 20 bài viết nữa
						isAjaxLoading = !isAjaxLoading; //trả lại cho biến ajax thành false để gọi tiếp ajax nếu cuộn
					}
				});
			} else if (window.location.pathname.split("/")[1] === "details") {
				const id = $(".posts-text[data-uid]").data("uid");
				$.ajax({
					url: `${url}/details/apiMoreComment`,
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					type: "POST",
					async: true,
					data: { offset, id },
					dataType: "json",
					success: function(result) {
						if (result.result === "success") {
							const { data } = result; //nhận kết quá của api trả về
							data.forEach((comment, index) => {
								//data là 20 bài post dạng array nên lặp từng post rồi append vô body
								$(".posts").append(`
					<li component="post" class="" data-index="${index} " data-pid=" ${
									comment.comment.id
								} "
					data-uid="${comment.comment.parentid}" data-email="${
									comment.comment.user.email
								}"
					data-userslug="${
						comment.comment.user.email
					}" itemscope="" itemtype="http://schema.org/Comment">
					<a component="post/anchor" data-index="1" name="1"></a>

					<meta itemprop="datePublished" content="2018-09-09T05:21:18.618Z">
					<meta itemprop="dateModified" content="">

					<div class="clearfix">
							<div class="icon pull-left">
									<a href="/user/profile/ ${comment.comment.user.email}">
											<img component="user/picture" data-uid=" ${comment.comment.user.id}" src=" ${
									comment.comment.user.image
								}"
													itemprop="image" align="left">
											<i component="user/status" class="fas fa-circle status ${
												comment.comment.user.status
											}"
													title="${comment.comment.user.status}"></i>
									</a>
							</div>
							<small class="pull-left">
									<strong>
											<a href="/user/profile/${comment.comment.user.email}" itemprop="author"
													data-email="${comment.comment.user.email}" data-uid="${
									comment.comment.user.id
								}">
													${comment.comment.user.email}</a>
									</strong>
									<div class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
											<a class="permalink" href="/details/${comment.comment.id}"><span class="timeago"
															title="Sun Sep 09 2018 12:21:18 GMT+0700 (Indochina Time)">a
															day ago</span></a>

											<i class="fas fa-pencil-square pointer edit-icon hidden"></i>

											<small data-editor="" component="post/editor" class="hidden">last edited
													by
													<span class="timeago" title="Invalid Date"></span></small>
											<span>
											</span>
									</div>
									<span class="bookmarked"><i class="fas fa-bookmark-o"></i></span>
							</small>
					</div>
					<br>
					<div class="content" component="post/content" itemprop="text">
							${comment.comment.comment}
					</div>
					<hr>
			</li>
															<a component="post/anchor" data-index="1" name="1"></a>
															<meta itemprop="datePublished" content="2018-09-09T05:21:18.618Z">
															<meta itemprop="dateModified" content="">
															<div class="clearfix">
																	<div class="icon pull-left">
																			<a href="/user/profile/${comment.comment.user.email}">
																					<img component="user/picture" data-uid="2" src="${
																						comment
																							.comment
																							.user
																							.image
																					}" itemprop="image" align="left">
																					<i component="user/status" class="fas fa-circle status ${
																						comment
																							.comment
																							.user
																							.status
																					}" title="${
									comment.comment.user.status
								}"></i>
																			</a>
																	</div>

																	<small class="pull-left">
																			<strong>
																					<a href="/user/profile/${
																						comment
																							.comment
																							.user
																							.email
																					}" itemprop="author" data-email="${
									comment.comment.user.email
								}" data-uid="2">
																					${comment.comment.user.email}</a>
																			</strong>
																			<div class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
																					<a class="permalink" href="/details/7"><span class="timeago" title="Sun Sep 09 2018 12:21:18 GMT+0700 (Indochina Time)">a
																									day ago</span></a>

																					<i class="fas fa-pencil-square pointer edit-icon hidden"></i>

																					<small data-editor="" component="post/editor" class="hidden">last edited
																							by
																							<span class="timeago" title="Invalid Date"></span></small>
																					<span>
																					</span>
																			</div>
																			<span class="bookmarked"><i class="fas fa-bookmark-o"></i></span>
																	</small>
															</div>

															<br>

															<div class="content" component="post/content" itemprop="text">
																	<p>${comment.comment.comment}</p>

															</div>

															<div class="clearfix">
																	<div component="post/signature" data-uid="411" class="post-signature">
																			<p><a href="#" target="_blank" rel="nofollow">
																			${comment.comment.user.email}</a></p>
																	</div>
																	<small class="pull-right">
																			<span class="post-tools">
																					<a component="post/reply" href="#" class="no-select ">Reply</a>
																					<a component="post/quote" href="#" class="no-select ">Quote</a>
																			</span>
																			<span class="votes">
																					<a component="post/upvote" href="#" class="">
																							<i class="fas fa-chevron-up"></i>
																					</a>
																					<span component="post/vote-count" data-votes="0">0</span>

																					<a component="post/downvote" href="#" class="">
																							<i class="fas fa-chevron-down"></i>
																					</a>
																			</span>
																			<span component="post/tools" class="dropdown moderator-tools ">
																					<a href="#" data-toggle="dropdown"><i class="fas fa-fw fa-ellipsis-v"></i></a>
																					<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
																			</span>
																	</small>
															</div>
															<hr>
													</li>
					`);
							});
						}
					},
					complete: function(data) {
						offset++; //khi thêm post xong thì tăng biến offset lên 1 để gọi thêm 20 bài viết nữa
						isAjaxLoading = !isAjaxLoading; //trả lại cho biến ajax thành false để gọi tiếp ajax nếu cuộn
					}
				});
			}
		}
	}
}
window.addEventListener("scroll", morePostWithScroll);

//Slide menu
$("#mobile-menu").click(function(e) {
	$("#menu").toggleClass("dsblock");
});
$("#search-button").click(function(e) {
	$("#search-fields").toggleClass("hidden");
});
$("#panel").click(function(e) {
	$("#menu").removeClass("dsblock");
	$("#search-fields").addClass("hidden");
});

$(".btn-reply").each(function() {
	$(this).click(function(e) {
		$("#text-editor-detal").toggleClass("showEditor");
	});
});
$("#btn-discard").click(function(e) {
	e.preventDefault();
	$("#text-editor-detal").removeClass("showEditor");
});
$("#btn-submit").click(function(e) {
	e.preventDefault();
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/details/apiPostComment`;
	const imageUser = $("#user_dropdown img").attr("src");
	const statusUser = $("#updateStHere")
		.attr("class")
		.substr(27);
	const email = $("#usernameNeed")
		.text()
		.trim();
	const comment = $("textarea").froalaEditor("html.get");
	const postid = $(".posts-text[data-uid]").data("uid");
	if (!isAjaxLoading) {
		//sử dụng phương thức cắm cờ để check xem ajax có đang hoạt động không, false thì bắt đầu chạy ajax
		isAjaxLoading = !isAjaxLoading; // ajax đang chạy chuyển biến thành true ngăn ko chạy lặp lại
		$.ajax({
			url: url,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Access-Control-Allow-Origin": "*"
			},
			async: true,
			data: { email, comment, postid },
			dataType: "json",
			success: function(notice) {
				if (notice.result === "success") {
					toastr.options = {
						closeButton: true,
						debug: false,
						newestOnTop: true,
						progressBar: true,
						positionClass: "toast-top-right",
						preventDuplicates: false,
						showDuration: 300,
						hideDuration: 1000,
						timeOut: 3000,
						extendedTimeOut: 1000,
						showEasing: "swing",
						hideEasing: "linear",
						showMethod: "fadeIn",
						hideMethod: "fadeOut"
					};
					toastr["success"](`${notice.message}`, "Notification");
					$("textarea").froalaEditor("html.set");
					$(".posts").append(`
					<li component="post" class="" data-index="0" data-pid="7" data-uid="0" data-email="${email}" data-userslug="${email}" itemscope="" itemtype="http://schema.org/Comment">
								<a component="post/anchor" data-index="1" name="1"></a>

								<meta itemprop="datePublished" content="2018-09-09T05:21:18.618Z">
								<meta itemprop="dateModified" content="">

								<div class="clearfix">
									<div class="icon pull-left">
										<a href="/user/profile/${email}">
											<img component="user/picture" data-uid="2" src="${imageUser}" itemprop="image" align="left">
											<i component="user/status" class="fas fa-circle status ${statusUser}" title="${statusUser}"></i>
										</a>
									</div>

									<small class="pull-left">
										<strong>
											<a href="/user/profile/${email}" itemprop="author" data-email="${email}" data-uid="2">
																					${email}</a>
										</strong>
										<div class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
											<a class="permalink" href="/details/7"><span class="timeago" title="Sun Sep 09 2018 12:21:18 GMT+0700 (Indochina Time)">a
													day ago</span></a>

											<i class="fas fa-pencil-square pointer edit-icon hidden"></i>

											<small data-editor="" component="post/editor" class="hidden">last edited
												by
												<span class="timeago" title="Invalid Date"></span></small>
											<span>
											</span>
										</div>
										<span class="bookmarked"><i class="fas fa-bookmark-o"></i></span>
									</small>
								</div>

								<br>

								<div class="content" component="post/content" itemprop="text">
									<p>${comment}</p>

								</div>

								<div class="clearfix">
									<div component="post/signature" data-uid="411" class="post-signature">
										<p><a href="#" target="_blank" rel="nofollow">
																			${email}</a></p>
									</div>

									<small class="pull-right">
										<span class="post-tools">
											<a component="post/reply" href="#" class="no-select ">Reply</a>
											<a component="post/quote" href="#" class="no-select ">Quote</a>
										</span>

										<span class="votes">
											<a component="post/upvote" href="#" class="">
												<i class="fas fa-chevron-up"></i>
											</a>

											<span component="post/vote-count" data-votes="0">0</span>

											<a component="post/downvote" href="#" class="">
												<i class="fas fa-chevron-down"></i>
											</a>
										</span>

										<span component="post/tools" class="dropdown moderator-tools ">
											<a href="#" data-toggle="dropdown"><i class="fas fa-fw fa-ellipsis-v"></i></a>
											<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
										</span>

									</small>
								</div>


								<hr>

							</li>
					`);
				} else if (notice.result == "failed") {
					toastr.options = {
						closeButton: true,
						debug: false,
						newestOnTop: true,
						progressBar: true,
						positionClass: "toast-top-right",
						preventDuplicates: false,
						showDuration: 300,
						hideDuration: 1000,
						timeOut: 3000,
						extendedTimeOut: 1000,
						showEasing: "swing",
						hideEasing: "linear",
						showMethod: "fadeIn",
						hideMethod: "fadeOut"
					};
					toastr["error"](`${notice.message}`, "Notification");
				}
			},
			complete: function(data) {
				isAjaxLoading = !isAjaxLoading; //trả lại cho biến ajax thành false để gọi tiếp ajax nếu cuộn
			}
		});
	}
});

function checkActiveAccount() {
	const email = $("#usernameNeed")
		.text()
		.trim();
	const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|vn|pro|tk|ml|ga|gq|co|edu|gov|ooo|cn|uk|tv|int|asia|shop|website|email|top)\b/;
	if (email) {
		const checkEmail = regex.test(email);
		const url = `${location.protocol}//${document.domain}:${
			location.port
		}/checkActiveAccount`;
		if (checkEmail) {
			$.ajax({
				url: url,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				type: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Access-Control-Allow-Origin": "*"
				},
				async: true,
				data: { email },
				dataType: "json",
				success: function(result) {
					if (result.result == "success") {
						return;
					} else {
						toastr.options = {
							closeButton: true,
							debug: false,
							newestOnTop: true,
							progressBar: true,
							positionClass: "toast-bottom-right",
							preventDuplicates: false,
							showDuration: 300,
							hideDuration: 1000,
							timeOut: 10000,
							onclick: sendLinkActiveAccount,
							extendedTimeOut: 1000,
							showEasing: "swing",
							hideEasing: "linear",
							showMethod: "fadeIn",
							hideMethod: "fadeOut"
						};
						toastr["info"](`${result.message}`, "Notification");
					}
				}
			});
		} else return;
	} else return;
}
function sendLinkActiveAccount(arguments) {
	const email = $("#usernameNeed")
		.text()
		.trim();
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/sendLinkActiveAccount`;
	if (!isAjaxLoading) {
		//sử dụng phương thức cắm cờ để check xem ajax có đang hoạt động không, false thì bắt đầu chạy ajax
		isAjaxLoading = !isAjaxLoading; // ajax đang chạy chuyển biến thành true ngăn ko chạy lặp lại
		$.ajax({
			url: url,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Access-Control-Allow-Origin": "*"
			},
			async: true,
			data: { email },
			dataType: "json",
			success: function(notice) {
				if (notice.result === "success") {
					toastr.options = {
						closeButton: true,
						debug: false,
						newestOnTop: true,
						progressBar: true,
						positionClass: "toast-top-right",
						preventDuplicates: false,
						showDuration: 300,
						hideDuration: 1000,
						timeOut: 3000,
						extendedTimeOut: 1000,
						showEasing: "swing",
						hideEasing: "linear",
						showMethod: "fadeIn",
						hideMethod: "fadeOut"
					};
					toastr["success"](`${notice.message}`, "Notification");
				} else if (notice.result == "failed") {
					toastr.options = {
						closeButton: true,
						debug: false,
						newestOnTop: true,
						progressBar: true,
						positionClass: "toast-top-right",
						preventDuplicates: false,
						showDuration: 300,
						hideDuration: 1000,
						timeOut: 3000,
						extendedTimeOut: 1000,
						showEasing: "swing",
						hideEasing: "linear",
						showMethod: "fadeIn",
						hideMethod: "fadeOut"
					};
					toastr["error"](`${notice.message}`, "Notification");
				}
			},
			complete: function(data) {
				isAjaxLoading = !isAjaxLoading; //trả lại cho biến ajax thành false để gọi tiếp ajax nếu cuộn
			}
		});
	}
}
$(function() {
	checkActiveAccount();
	if (window.location.pathname.split("/").pop() == "register") {
		const regex = new RegExp(
			'^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
				'(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
				"|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
		);

		$(".email input").on("keyup", function(e) {
			$(this)
				.parent()
				.toggleClass("success", regex.test($(this).val()));
			if (e.keyCode == 13 && regex.test($(this).val())) {
				e.preventDefault();
				const url = `${location.protocol}//${document.domain}:${
					location.port
				}/users/apiRegister`;
				const email = $("#inputemail")
					.val()
					.trim();
				if (!isAjaxLoading) {
					isAjaxLoading = !isAjaxLoading;
					$.ajax({
						url: url,
						xhrFields: {
							withCredentials: true
						},
						crossDomain: true,
						type: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							"Access-Control-Allow-Origin": "*"
						},
						async: true,
						data: { email },
						dataType: "json",
						success: function(result) {
							if (result.result == "success") {
								toastr.options = {
									closeButton: true,
									debug: false,
									newestOnTop: true,
									progressBar: true,
									positionClass: "toast-top-right",
									preventDuplicates: false,
									showDuration: 300,
									hideDuration: 1000,
									timeOut: 3000,
									extendedTimeOut: 1000,
									showEasing: "swing",
									hideEasing: "linear",
									showMethod: "fadeIn",
									hideMethod: "fadeOut"
								};
								toastr["success"](
									`${result.message}`,
									"Notification"
								);
								setTimeout(() => {
									window.location.href = `${
										location.protocol
									}//${document.domain}:${
										location.port
									}/users/login`;
								}, 3000);
							} else {
								toastr.options = {
									closeButton: true,
									debug: false,
									newestOnTop: true,
									progressBar: true,
									positionClass: "toast-top-right",
									preventDuplicates: false,
									showDuration: 300,
									hideDuration: 1000,
									timeOut: 3000,
									extendedTimeOut: 1000,
									showEasing: "swing",
									hideEasing: "linear",
									showMethod: "fadeIn",
									hideMethod: "fadeOut"
								};
								toastr["error"](
									`${result.message}`,
									"Notification"
								);
							}
						},
						complete: function(complete) {
							isAjaxLoading = !isAjaxLoading;
						}
					});
				}
			}
		});
		$("svg").click(function(e) {
			e.preventDefault();
			$("#inputemail")
				.parent()
				.toggleClass("success", regex.test($("#inputemail").val()));
			const url = `${location.protocol}//${document.domain}:${
				location.port
			}/users/apiRegister`;
			const email = $("#inputemail")
				.val()
				.trim();

			if (!isAjaxLoading && regex.test($("#inputemail").val())) {
				isAjaxLoading = !isAjaxLoading;
				$.ajax({
					url: url,
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					type: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Access-Control-Allow-Origin": "*"
					},
					async: true,
					data: { email },
					dataType: "json",
					success: function(result) {
						if (result.result == "success") {
							toastr.options = {
								closeButton: true,
								debug: false,
								newestOnTop: true,
								progressBar: true,
								positionClass: "toast-top-right",
								preventDuplicates: false,
								showDuration: 300,
								hideDuration: 1000,
								timeOut: 3000,
								extendedTimeOut: 1000,
								showEasing: "swing",
								hideEasing: "linear",
								showMethod: "fadeIn",
								hideMethod: "fadeOut"
							};
							toastr["success"](
								`${result.message}`,
								"Notification"
							);
							setTimeout(() => {
								window.location.href = `${location.protocol}//${
									document.domain
								}:${location.port}/users/login`;
							}, 3000);
						} else {
							toastr.options = {
								closeButton: true,
								debug: false,
								newestOnTop: true,
								progressBar: true,
								positionClass: "toast-top-right",
								preventDuplicates: false,
								showDuration: 300,
								hideDuration: 1000,
								timeOut: 3000,
								extendedTimeOut: 1000,
								showEasing: "swing",
								hideEasing: "linear",
								showMethod: "fadeIn",
								hideMethod: "fadeOut"
							};
							toastr["error"](
								`${result.message}`,
								"Notification"
							);
						}
					},
					complete: function(complete) {
						isAjaxLoading = !isAjaxLoading;
					}
				});
			}
		});
	}
});

$(".admin-delete-btn").click(e => {
	const idToDelete = $($(e.target).parent())
		.parent()
		.find(".admin-post-title")
		.data(`id`);
	$("#sosureBtn").click(e => {
		e.preventDefault();
		const url = `${location.protocol}//${document.domain}:${
			location.port
		}/admin/deletepost`;
		$.ajax({
			url: url,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			type: "DELETE",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Access-Control-Allow-Origin": "*"
			},
			async: true,
			data: {
				id: idToDelete
			},
			// data: $(".form-horizontal").serialize(),
			dataType: "json",
			success: function(result) {
				// console.log("create thanh cong");
				if (result.result == "success") {
					toastr.options = {
						closeButton: false,
						debug: false,
						newestOnTop: true,
						progressBar: true,
						positionClass: "toast-top-right",
						preventDuplicates: false,
						showDuration: 300,
						hideDuration: 1000,
						timeOut: 2000,
						extendedTimeOut: 1000,
						showEasing: "swing",
						hideEasing: "linear",
						showMethod: "fadeIn",
						hideMethod: "fadeOut"
					};
					toastr["success"](`${result.message}`, "Notification");
					window.location.href = `${location.protocol}//${
						document.domain
					}:${location.port}/admin`;
				} else if (result.result == "failed") {
					// console.log(`khong create duoc`);
					toastr.options = {
						closeButton: false,
						debug: false,
						newestOnTop: true,
						progressBar: true,
						positionClass: "toast-top-right",
						preventDuplicates: false,
						showDuration: 300,
						hideDuration: 1000,
						timeOut: 2000,
						extendedTimeOut: 1000,
						showEasing: "swing",
						hideEasing: "linear",
						showMethod: "fadeIn",
						hideMethod: "fadeOut"
					};
					toastr["error"](`${result.message}`, "Notification");
				}
			}
		});
	});
});

$(".admin-edit-btn").click(function(e) {
	// console.log('admin-edit-btn');
	$("#defaultContactFormName1").val(
	  `${$($(this).parent())
		.parent()
		.find(".admin-post-title")
		.text()
		.trim()}`
	);
	$(".category-list").val(
	  `${$($(this).parent())
		.parent()
		.find(".admin-post-tags")
		.text()
		.trim()}`
	);

	$("textarea").froalaEditor('html.set',`
	${$($(this).parent())
		.parent()
		.find(".admin-post-content")
		.text()
		.trim()}
	`);
  });