const chai = import("chai");
const expect = chai.expect;
const request = require("request");
const app = require('../src/app'); 
const baseUrl = "http://localhost:3000"; 

describe("Admin Routes Tests", function() {
    it("should get all rules", function(done) {
        request.get(`${baseUrl}/admin/rules`, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            // Add more assertions if needed
            done();
        });
    });

    it("should add a new rule", function(done) {
        const newRule = {
            factor: "Cs",
            severity: "Medium",
            description: "Test rule"
        };

        request.post({ url: `${baseUrl}/admin/rules`, json: newRule }, function(error, response, body) {
            expect(response.statusCode).to.equal(201);
            expect(body).to.have.property('factor').that.equals('Cs');
            expect(body).to.have.property('severity').that.equals('Medium');
            expect(body).to.have.property('description').that.equals('Test rule');
            done();
        });
    });

    it("should update an existing rule", function(done) {
        const updatedRule = {
            description: "Updated rule",
            severity: "Good"
        };

        // Assuming you have an existing rule ID to update
        const ruleIdToUpdate = "665520b437e9ed788dc25904";

        request.put({ url: `${baseUrl}/admin/rules/${ruleIdToUpdate}`, json: updatedRule }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.have.property('description').that.equals('Updated rule');
            expect(body).to.have.property('severity').that.equals('Good');
            done();
        });
    });

    it("should delete an existing rule", function(done) {
        // Assuming you have an existing rule ID to delete
        const ruleIdToDelete = "665520b437e9ed788dc25904";

        request.delete(`${baseUrl}/admin/rules/${ruleIdToDelete}`, function(error, response, body) {
            expect(response.statusCode).to.equal(204);
            done();
        });
    });
});
