let isAjaxLoading = false;

$(".mcnButtonContent").click(function(e) {
	e.preventDefault();
	const url = `${location.protocol}//${document.domain}:${
						location.port
					}/users/linkForgotpassword`;
	const email = $('input').val()
	const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|vn|pro|tk|ml|ga|gq|co|edu|gov|ooo|cn|uk|tv|int|asia|shop|website|email|top)\b/;
	const checkEmail = regex.test(email);

	if (!isAjaxLoading && checkEmail) {
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
					toastr["success"](`${result.message}`, "Notification");
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
					toastr["error"](`${result.message}`, "Notification");
				}
			},
			complete: function(complete) {
				isAjaxLoading = !isAjaxLoading;
			}
		});
	}
});



