/**
 * Created by Mohamed on 23-08-15.
 */
describe('data Store App', function(){
    beforeEach(function(){
        browser.get('http:/localhost:3000');
    });
    it('should have a title', function(){


        expect(browser.getTitle()).toEqual('DataStorePlugin');
    });

    it('should redirect to #/', function() {
        browser.get('/');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/#');
        });
    });
});

