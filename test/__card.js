var expect          = require("chai").expect,
    card            = require('../models/card.js');

describe('A Card in a Deck', function() {
    
    var testCard = null;
    
    beforeEach(function(done){    
        card.add({
                deck_id: 'unknown',
                title : 'Test Card',
                range : 5,
                damage : 3,
                quantity:  2,
                activation : 'On Attack',
                overcharge : 'Discharging this item can only be prefomed in a test environment. Result: Auto-win',
            }, function (doc) {
                testCard = doc;
                done();
        });
        
    });
    
    afterEach( function (done) {
        card.remove(testCard._id, function () {        
            done();
        });
    });

    it('ADD a new Card', function(done){
        expect(testCard.title).to.be.equal('Test Card');
        done();
    });

    it('UPDATE an existing Card', function(done){
        card.update({_id:testCard._id, quantity:99}, function(doc){
            expect(doc.quantity).to.be.equal(99);
            done();    
        });
    });

    it('REMOVE an existing Card', function(done){
        card.add({
                deck_id: 'unknown',
                title : 'Deleted Card',
                range : 1,
                damage : 1,
                quantity: 1,
                activation : 'On Defense',
                overcharge : 'Fail on Attack, this card never makes it into a deck',
            }, function (doc) {

                var removeCard = doc;
                expect(doc).not.to.be.null;
                card.remove(removeCard._id, function () {        
                    card.find(removeCard, function(targetDoc){
                        expect(targetDoc).to.be.null;
                        done();
                    });
                }); 
        });
    });

    it('FIND a Card', function(done){
        card.find({_id:testCard._id}, function(doc){
            expect(doc.title).to.be.equal('Test Card');
            done();    
        });
    });
    
    it('FIND ALL Cards', function(done){
        card.all(function(docs){
            expect(docs.length).to.be.above(1);
            done();    
        });
    });
});