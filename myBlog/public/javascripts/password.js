let isAjaxLoading = false;
$(document).ready(function() {

	var NameInput = React.createClass({displayName: "NameInput",
    handleTextChange: function(){
        var x = this.refs.nameField.getDOMNode().value;

        if(x != ''){
            this.refs.nameField.getDOMNode().className = 'active';
        } else {
            this.refs.nameField.getDOMNode().className = '';
        }

        this.props.onUserInput(x);
    },
    render: function(){
        return (
            React.createElement("div", {className: "control"},
                React.createElement("input", {type: "password", id: "inp-password", ref: "nameField", placeholder: "Enter password", autoFocus: true, required: true, onChange: this.handleTextChange}),
                React.createElement("label", {for: "inp-password"}, "Password")
            )
        )
    }
});

var EmailInput = React.createClass({displayName: "EmailInput",
    handleTextChange: function(){
        var x = this.refs.emailField.getDOMNode().value;

        if(x != ''){
            this.refs.emailField.getDOMNode().className = 'active';
        } else {
            this.refs.emailField.getDOMNode().className = '';
        }

        this.props.onUserInput('', x);
    },
    render: function(){
        return (
            React.createElement("div", {className: "control"},
                React.createElement("input", {type: "password", id: "inp-repassword", ref: "emailField", placeholder: "Enter the correct password?", required: true, onChange: this.handleTextChange}),
                React.createElement("label", {for: "inp-repassword"}, "Repassword")
            )
        )
    }
});

var MessageArea = React.createClass({displayName: "MessageArea",
    handleTextChange: function(){
        var x = this.refs.messageBox.getDOMNode().value;

        if(x != ''){
            this.refs.messageBox.getDOMNode().className = 'active';
        } else {
            this.refs.messageBox.getDOMNode().className = '';
        }

        this.props.onUserInput('', '', x);
    },
    render: function(){
        return (
            React.createElement("div", {className: "control"},
              /*   React.createElement("textarea", {id: "message", ref: "messageBox", placeholder: "What's on your mind?", required: true, onChange: this.handleTextChange}),
                React.createElement("label", {for: "message"}, "Message") */
            )
        )
    }
});

var ContactForm = React.createClass({displayName: "ContactForm",
    getInitialState: function() {
        return {
            nameText: '',
            emailText: '',
            messageText: ''
        };
    },
    handleUserInput: function(nameText, emailText, messageText) {
        this.setState({
            nameText: nameText,
            emailText: emailText,
            messageText: messageText
        });
    },
  render: function(){
    return (
         React.createElement("form", { id:"form-password"},

            React.createElement("fieldset", null,
                React.createElement("legend", null, "Update Your Password"),

                React.createElement(NameInput, {onUserInput: this.handleUserInput}),
                React.createElement(EmailInput, {onUserInput: this.handleUserInput}),
                React.createElement(MessageArea, {onUserInput: this.handleUserInput}),

                React.createElement("input", {type: "submit", value: "send" ,id: "btn-update-password"})
            )

        )
        );
  }
});

React.render(React.createElement(ContactForm, null), document.getElementById('stage'));

$("#form-password").submit(function(e) {
	e.preventDefault();
	const url = `${location.protocol}//${document.domain}:${
						location.port
					}/users/updatePassword`;
	const email = window.location.pathname.split("/")[3];
	const password = $('#inp-password').val();
	const repassword = $('#inp-repassword').val();
	if (!isAjaxLoading && password) {
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
			data: { email, password,repassword },
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

});




