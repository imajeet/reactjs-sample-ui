var expect = require('chai').expect;
var assert = require('chai').assert;


const logIn = [
    {
        username: "Administrator",
        password: "Administrator"
    },

    {
        username: "Administrator",
        password: "gibberish"
    },
];

const correctLogIn = function (browser) {
    browser.url('/')
        .setValue('#username.login_input', logIn[0].username)
        .setValue('#password.login_input', logIn[0].password)
        .click('.login_button');
    return browser;
};

// beforeEach(function() {
//     browser.url('/')
//         .setValue('#username.login_input', logIn[0].username)
//         .setValue('#password.login_input', logIn[0].password)
//         .click('.login_button')
// });

describe('Nuxeo successful login page', function() {
    it('should login successfully when given correct login', function() {
        correctLogIn(browser);
        browser.pause(7000);
        // wait for text blocking menu to clear
        browser.click('#nxw_userMenuActions_dropDownMenu')
            .click("#nxw_non_anonymous_logout")
    });

});


describe('Nuxeo fail login page', function() {
    it('should not log in when given incorrect login', function() {
        browser.url('/')
            .setValue('#username.login_input', logIn[1].username)
            .setValue('#password.login_input', logIn[1].password)
            .click('.login_button');
           let error =  browser.getText('.feedbackmessage.errormessage');
           assert(error === 'Invalid username or password');

    });
});

module.exports = correctLogIn;