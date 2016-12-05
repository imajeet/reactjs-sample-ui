import correctLogIn from './test-login.js';

beforeEach(function() {
   return correctLogIn(browser);
});


describe('should navigate to Web UI', function () {
    it ('should be on the Web UI page', function () {
        browser.click()
    })
})