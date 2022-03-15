const App = (() => {
    'use strict';
    // console.log('tl is ', tl);
    // const t = tt;
// const ts = 'kek';
    // console.log('t', t);

    const d = {
        ajax: 'app/ajax/index.php',
        // temp: {}
    };

    d.WikiMedia = {
        options: {
            url: 'https://commons.wikimedia.org/w/api.php',
            callback: (r) => {
                // console.log('result is ', r);
                const k = Object.keys(r.query.pages);
                const n = {
                    v: []
                };
                // const n = {
                //     v: [],
                //     i: []
                // };
                for (let e = k.length; e--;) {
                    if (n.v[0]) break;
                    // if (n.v[0] && n.i[0]) break;

                    const u = L.getNestProp(r, `query.pages.${k[e]}.imageinfo.0.url`);
                    if(u) {
                        const x = u.slice(u.lastIndexOf('.') + 1);

                        if (x === 'webm' ||  x === 'ogv') {
                            n.v = [u, L.getNestProp(r, `query.pages.${k[e]}.imageinfo.0.descriptionurl`)]; 
                        }
                        // else if (x === 'jpg' ||  x === 'jpeg') {
                        //     n.i = [u, L.getNestProp(r, `query.pages.${k[e]}.imageinfo.0.descriptionurl`)]; 
                        // }
                    }
                }
                // console.log('n is ', n);
                // return n;
                // if (n.v[0] && n.i[0]) {
                if (n.v[0]) {
                    if (L('.about__video')[0].paused) { //Prevent multiple load
                        console.log('current src ', n.v[0]);
                        L('.about__video')[0].onended = () => {
                            Wiki.getInfo(d.WikiMedia.options);
                        };
                        L('.about__video')[0].volume = 0.1;
                        L('.about__video')[0].src = n.v[0];
                        L('.about__video')[0].href = n.v[1];
                        console.log('test ', L('body'));
                        if (L('body').hasClass('^go_info')) {
                            console.log('YEE')
                            L('.about__video')[0].play();
                        }
                     }
                    // L('.register-form__background').css('background-image', 'url(' + n.i[0] + ')');
                }
                else {
                    console.log('me empty --');
                    Wiki.getInfo(d.WikiMedia.options);
                }
            }
        }
    };

    const loading = (e, m, l) => {
        const i = e.getAttribute('d');
        return [setInterval(() => {
            if (e.pathSegList[0].y === m) {
                if (e.pathSegList[1].y === l) {
                    e.pathSegList[0].y += 1;
                }
                else {
                    e.pathSegList[1].x += 1;
                    e.pathSegList[2].x -= 1;
                    e.pathSegList[1].y = e.pathSegList[2].y += 1;
                }
            }
            else {
                if (e.pathSegList[0].y === l) {
                    e.setAttribute('d', i);
                }
                else {
                    e.pathSegList[0].y += 1;
                } 
            }
        }, 50), i];
    };

    const Wiki = new function () {
        this.getInfo = (o) => {
            L.getJSON({
                url: o.url,
                data: {
                    origin: '*', 
                    action: 'query', 
                    format: 'json',
                    generator: 'random',
                    grnnamespace: o.namespace || '6',
                    grnlimit: o.limit || 500,
                    prop: 'imageinfo',
                    iiprop: 'url'
                },
                onload: o.callback
            });
        };
    };

    // function test() {
    //     return Login.email;
    // }

    const Login = new function () {
        const td = {
            code: ''
        };

        this.login = (e) => {
            L('.login-form').removeClass('^error_');
            
            if (L('.go_login_state_input')[0]) {
                td.email = L('.login-form__input_type_email').val();
                td.password = L('.login-form__input_type_password').val();
                if (!td.email) {
                    L('.login-form').addClass('error_email');
                }
                if (!td.password) {
                    L('.login-form').addClass('error_password');
                }
                if (L('.login-form').hasClass('^error_')) return;
                L('.go_login_state_input').swapClass('input', 'loading');
            }
            else if (L('.go_login_state_verification')[0]) {
                td.code = L('.login-form__input_type_verification-code').val();
                if (!td.code) {
                    L('.login-form').addClass('error_verification-code');
                    return;
                }
                L('.go_login_state_verification').concatClass('verification', '_loading');
            }
            // if (L('.login-form').hasClass('^error_')) return;
            e.disable();
            const l = loading(L('.svg__circle_type_login .svg__memento-mori')[0], -25, -15);
            // this.email = L('.login-form__input_type_email').val();
            console.log('login post data is ', td);
            L.post({
                url: d.ajax,
                data: {
                    action: 'Login',
                    code: td.code,
                    email: td.email,
                    password: td.password
                },
                responseType: 'json',
                onload: (r) => {

                    console.log('result is ', r, 'type is ', L.type(r));
                    // return;
                    if (L('body').hasClass('^loading')) {
                            if (r === 3) { //wrong ver code
                                L('.go_login_state_verification_loading').removeClass('^_loading');
                                L('.login-form').addClass('error_verification-code');
                            }
                            else if (r === 2) { // need to verify
                                L('.go_login_state_loading').swapClass('loading', 'verification');
                            }
                            else if (r === 1) { // success login
                                //if true determines wrong page
                                location.reload(true);
                            }
                            else if (r === 0) { // wrong login data
                                L('.go_login_state_loading').swapClass('loading', 'input');
                                L('.login-form').addClass('error_email error_password');
                            }
                        e.enable();
                    }
                    clearInterval(l[0]);
                    L('.svg__circle_type_login .svg__memento-mori').attr('d', l[1]);
                }
            });
            td.code = '';
        };
    };

    const Register = new function () {

        window.submitRegister = (tk) => {
            L('body').swapClass('^state_', 'state_loading');
            const l = loading(L('.svg__circle_type_register .svg__memento-mori')[0], -25, -15);
            grecaptcha.reset();
            if (tk) {
                console.log('token is ', tk);
                L.post({
                    url: d.ajax,
                    data: {
                        action: 'Register',
                        token: tk,
                        email: L('.register-form__input_type_email').val(),
                        username: L('.register-form__input_type_username').val(),
                        password: L('.register-form__input_type_password').val()
                    },
                    responseType: 'json',
                    onload: (r) => {
                        console.log('register result is ', r, 'type ', L.type(r)); 
                            if (r === true) {
                                //Viewable only after immediate reopen
                                //Should display always on window open on success
                                // L('.go_register_state_loading').swapClass('^state','state_success');
                                // L('body').addClass('register_success');
                                L('body').addClass('register_success').swapClass('^_state','_state_success');
                                // L('body').addClass('register_success');
                            }
                            else {
                                if (L('.go_register_state_loading').swapClass('loading', 'error')[0]) {
                                    if (r === null) {
                                        L('.register-form').addClass('error_duplicate');
                                        // L('.register-form').addClass('error_duplicate');
                                        // L('.go_register_state_error').concatClass('state_error', '_duplicate');
                                        // L('.register-form__message_type_duplicate .register-form__message-text').text(t.Register.error.duplicate);
                                    }
                                    else {
                                        for (let i = 0; i < r.length; i++) {
                                            const e = r[i].split(':');
                                            L('.register-form').addClass('error_' + e[0]);
                                            L('.register-form__message_type_' + e[0] + ' .register-form__message-text').text(t.Register.error[e[0]][e[1]]);
                                        }
                                    }
                                    // L('.go_register_state_loading').swapClass('^state', 'state_error');
                                }
                            }
                            // L('body').swapClass('^state_', 'state_loading');
                            L('.register-form__button_type_register').enable();
                        // }
                        clearInterval(l[0]);
                        L('.svg__circle_type_register .svg__memento-mori').attr('d', l[1]);
                    }
                });
            }
        };

        this.register = (e) => {
            L('.register-form').removeClass('^error_');
            if (!L('.register-form__input_type_email').val()) {
                L('.register-form').addClass('error_empty-email');
            }
            if (!L('.register-form__input_type_username').val()) {
                L('.register-form').addClass('error_empty-username');
            }
            if (!L('.register-form__input_type_password').val()) {
                L('.register-form').addClass('error_empty-password');
            }
            if (L('.register-form').hasClass('^error_')) return;
            e.disable();
            grecaptcha.execute();
        };
    };

    Wiki.getInfo(d.WikiMedia.options);

    return new function () {
        this.show = (f) => {
            // console.log('me is ', ts);
            if (f === 2) { //login
                if (L('.state_default')[0]) {
                    L('.login-form').removeClass('^error_');
                    L('.login-form__input').val('');
                    L('.login-form__button_type_login').enable();
                    L('body').swapClass('state_default', 'go_login_state_input', 0);
                }
                else {
                    L('body').swapClass('^go_login', 'state_default', 0);
                }
            }
            else if (f === 1) { //register
                if (L('.state_default')[0]) {
                    L('.register-form').removeClass('^error_');
                    L('.register-form__input').val('');
                    L('.register-form__button_type_register').enable();
                    L('body').swapClass('state_default', 'go_register_state_input', 0);
                }
                else {
                    L('body').swapClass('^go_register', 'state_default', 0).removeClass('register_success');
                    L('.register-form + div')[0].firstChild.click();
                    grecaptcha.reset();
                }
            }
            else { //info
                if (L('.state_default').swapClass('state_default', 'go_info')[0]) {
                    L('.about__video')[0].currentSrc && L('.about__video')[0].play() || Wiki.getInfo(d.WikiMedia.options);
                }
                else {
                    L('.about__video')[0].src = '';
                    L('body').swapClass('^go_info', 'state_default');
                }
            }
        };
        this.Register = {
            register: Register.register
        };
        this.Login = {
            login: Login.login
        };
    };
})();
Object.freeze(App);