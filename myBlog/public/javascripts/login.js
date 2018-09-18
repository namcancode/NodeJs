let isAjaxLoading = false;
function init() {
	// Generate li foreach fieldset
	for (let i = 0; i < count; i++) {
		const ul = document.querySelector("ul.items"),
			li = document.createElement("li");
		document.querySelector("ul.items").appendChild(li);
	}
	// Add class active on first li
	document.querySelector("ul.items").firstChild.classList.add("active");
}

function next(target) {
	const input = target.previousElementSibling;
	const inpEmail = $('input[type="mail"]').val();
	const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|vn|pro|tk|ml|ga|gq|co|edu|gov|ooo|cn|uk|tv|int|asia|shop|website|email|top)\b/;
	const checkEmail = regex.test(inpEmail);
	// Check if input is empty
	if (input.value === "" || !checkEmail) {
		body.classList.add("error");
	} else {
		body.classList.remove("error");
		const enable = document.querySelector("form fieldset.enable"),
			nextEnable = enable.nextElementSibling;
		enable.classList.remove("enable");
		enable.classList.add("disable");
		nextEnable.classList.add("enable");

		// Switch active class on left list
		const active = document.querySelector("ul.items li.active");

		if (active) {
			const nextActive = active.nextElementSibling;
			active.classList.remove("active");
			nextActive.classList.add("active");
		}
	}
}


function keyDown(event) {

	const key = event.keyCode,
		target = document.querySelector("fieldset.enable .button");
    if (key == 13 || key == 9) next(target);

	if ($("#last-button").hasClass("enable")) {
		submitAjax();
	}
}

const body = document.querySelector("body"),
	form = document.querySelector("form"),
	count = form.querySelectorAll("fieldset").length;

window.onload = init;
document.body.onmouseup = function(event) {
	const target = event.target || event.toElement;
    if (target.classList.contains("button")) next(target);
    if ($("#last-button").hasClass("enable")) {
		submitAjax();
	}
};
document.addEventListener("keydown", keyDown, false);

function submitAjax(e) {
	//e.preventDefault(); // loai bo trang thai mac dinh (submit k reload nua)
	const url = `${location.protocol}//${document.domain}:${
		location.port
	}/users/login`;
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
			data: $("#form-login").serialize(),
			dataType: "json",
			success: function(result) {
				if (result.result === "success") {
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
					toastr["success"](`${result.message}`, "Notification");
					setTimeout(() => {
						window.location.href = `${location.protocol}//${
							document.domain
						}:${location.port}/`;
					}, 3000);
				} else if (result.result == "failed") {
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
					toastr["error"](`${result.message}`, "Notification");
					setTimeout(() => {
						$("#last-button").removeClass("enable");
						$(".email")
							.addClass("enable")
							.removeClass("disable");
						$(".password").removeClass("disable");
						document
							.querySelector("ul.items")
							.firstChild.classList.add("active");
						document
							.querySelector("ul.items")
							.lastChild.classList.remove("active");
					}, 1500);
				}
			},
			complete: function(complete) {
				isAjaxLoading = !isAjaxLoading;
			}
		});
	}

}
