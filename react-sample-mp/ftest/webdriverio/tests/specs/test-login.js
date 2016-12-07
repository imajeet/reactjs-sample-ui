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
           var error =  browser.getText('.feedbackMessage.errorMessage');
           assert(error === 'Invalid username or password');
    });
});


describe('Navigate to Sample UI', function () {
    it('should be on the Sample UI page', function () {
        correctLogIn(browser)
            .url('/nuxeo/sampleUI')
            .click('.login-button')

        var panelText = $(".side-panel-profile")
        panelText.waitForExist(2000)
        assert(panelText.getText() === 'Administrator')

    })
});

module.exports = correctLogIn;