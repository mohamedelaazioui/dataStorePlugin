/**
 * Created by Mohamed on 23-08-15.
 */
describe('data Store App', function(){
    beforeEach(function(){
        browser.get('http://localhost:3000');
    });
    it('should have a title', function(){


        expect(browser.getTtitle()).toEqual('DataStorePlugin');
    });
});