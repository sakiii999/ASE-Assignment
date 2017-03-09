/**
 * Created by rAj on 9/28/2016.
 */
describe('LoginCtrl', function(){
  beforeEach(function(){
    browser().navigateTo('http://localhost/blah');
    window.sleep(1);
  });

  it('should log in a user and redirect', function(){
    input('email').enter('user');
    input('password').enter('pass');
    element(':button').click();
    expect(browser().location().url()).toBe('/newBlahPage');
  });
});
