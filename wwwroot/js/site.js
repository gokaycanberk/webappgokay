// Write your Javascript code.

$(function () {
    "use strict";
    var myApp = {
        init: function () {
            this.root = 'http://localhost:5001';
            this.login();
            this.createAccount();
            this.onReady();
            this.logout(); 
        },
        onReady: function() {
            var token = localStorage.getItem('WebAppGokayToken'),
                _this = this;

            if (token) {
                console.log('JWT: ' + token);
                $.ajax({
                    type: 'GET',
                    url: '/users/authenticate',
                    contentType: 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        $('.alert').addClass('hidden');
                        $('.alert-success').removeClass('hidden');
                        if (window.location.href === _this.root || window.location.href === _this.root + '/')
                            window.location.href = _this.root + '/employee';
                    },
                    error: function (err) {
                        console.log('An error occurred.');
                        console.log(err);
                        $('.alert').addClass('hidden');
                        $('.alert-danger').removeClass('hidden');
                    }
                }); 
            } else {
                if (window.location.href !== _this.root + '/' && window.location.href !== _this.root + '/createaccount')
                    window.location.href = _this.root;    
            }
        },
        logout: function() {
            var logoutBtn = $('.logout'),
                _this = this;

            logoutBtn.on('click', function(e) {
                e.preventDefault();
                localStorage.setItem('WebAppGokayToken', '');
                window.location.href = _this.root;
            });
        },
        createAccount: function() {
            var form = $('.form-create'),
                _this = this;

            form.on('submit', function (e) {
                e.preventDefault();
                var username = $('#inputEmail').val();
                var password = $('#inputPassword').val();
                var data = {
                    "username" : username,
                    "password" : password
                };
                $.ajax({
                    type: 'POST',
                    url: '/users',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (data) {
                        console.log(data);
                        $('.alert').addClass('hidden');
                        $('.alert-success').removeClass('hidden');
                        setTimeout(function() {
                            window.location.href = _this.root;
                        }, 2000);
                    },
                    error: function (err) {
                        console.log('An error occurred.');
                        console.log(err);
                        $('.alert').addClass('hidden');
                        $('.alert-danger').removeClass('hidden');
                    }
                });
            });
        },
        login: function () {
            var form = $('.form-signin');
            form.on('submit', function (e) {
                e.preventDefault();
                console.log('submıtted');
                var username = $('#inputEmail').val();
                var password = $('#inputPassword').val();
                var data = {
                    username: username,
                    password: password
                };
                $.ajax({
                    type: "POST",
                    url: '/users/authenticate',
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(data),
                    success: function (data) {
                        console.log(data);
                        $('.alert').addClass('hidden');
                        $('.alert-success').removeClass('hidden');
                        localStorage.setItem('WebAppGokayToken', data.token);
                        window.location.href = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + '/employee';
                    },
                    error: function (err) {
                        console.log('An error occurred.');
                        console.log(err);
                        $('.alert').addClass('hidden');
                        $('.alert-danger').removeClass('hidden');
                    }
                });
            });
        },
    };
    myApp.init();

});
