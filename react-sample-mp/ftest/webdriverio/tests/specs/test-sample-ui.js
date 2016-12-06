var correctLogIn = require('./test-login.js');
var assert = require('chai').assert;

describe('should navigate to Sample UI', function () {
    it.only ('should be on the Sample UI page', function () {
        correctLogIn(browser)
            .url('/nuxeo/sampleUI')
            .click('.login-button')

        let panelText = $(".side-panel-profile")
        panelText.waitForExist(2000)
        assert(panelText.getText() === 'Administrator')

    })
});