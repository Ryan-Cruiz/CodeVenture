const chai = require('chai'); // require chai
const expect = chai.expect; // take expect
const UserModel = require('../models/User.model'); // require user
var modelUser = new UserModel();
describe("Fairness", function() {
    it("should return false if values passed are not equal", function(){
        let fairness = new UserModel();
        let result = fairness.is_fair(1, 2);
        expect(result).to.be.false;
    });
});
describe('Login feature', function(){ // describe what feature
    
    describe('User Model', function(){ // describe what model
        /* give it a title and test */
        it('Given email and password as input, it should return user info (including password) when the email is found in the database',async ()=>{
            let params = {'email':'testuser@test.com','password':'password123'};
            let user = {'name':'Anthony Dillahunty','email':'testuser@test.com','password':'password123'};
            modelUser.log_in(params,(result)=>{
                console.log('user info',result.user);
                expect(result.user).to.deep.equal(user); // expect that the result is equal
            });
        });

        it("Given email and password as input, it should return false when email doesn't exist in database.",async ()=>{
            let params = {'email':'notexist@test.com','password':'password123'};
            modelUser.log_in(params,(result)=>{
                console.log('should false',result.stat);
                expect(result.stat).to.equal(false);
            });
        }); 
    });
});

