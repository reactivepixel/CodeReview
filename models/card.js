module.exports = function() {
    // Dependencies
    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        data        = require('../lib/sanitize.js');
    
    var cardSchema = mongoose.Schema({
        deck_id: String,
        title : String,
        range : Number,
        damage : Number,
        quantity:  Number,
        activation : String,
        overcharge : String,
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    }),
    
     _model = mongoose.model('cards', cardSchema);

    // ADD ONE
    var _save = function(card, success, fail){
        var cleanData = data.sanitize(card);
        if(!cleanData) return false;

        var Card = new _model(cleanData);

        Card.save(function(err, doc){
            if (err) {
                fail (err);
            } else {
                success(doc);
            }
        });
    },
    
    // UPDATE ONE
    _update = function(card,success,fail){

        var cleanData = data.sanitize(card);
        if(!cleanData) return false;
        
        _model.update({'_id':cleanData._id}, {$set:cleanData}, function(err){
            if (err) {
                fail(err);
            }else{
                success(cleanData);
            }
        });
    
    },
    
    // REMOVE ONE
    _remove = function(card,success,fail){
        var cleanData = data.sanitize(card);
        if(!cleanData) return false;
        
        _model.findByIdAndRemove(cleanData, function(err,doc){
            if (err) {
                fail(err);
            } else {
                success(doc);
            }
        });
    },

    // FIND One
    _findOne = function(card, success,fail){
        var cleanData = data.sanitize(card);
        if(!cleanData) return false;
        
        _model.findOne({_id:cleanData._id}, function(err,doc) {
            if (err) {
                fail(err);
            } else {
                success(doc);
            }
        });
    },
    
    // FIND
     _findAll = function(success,fail){
        _model.find({}, function(err,doc){
            if (err) {
                fail(err);
            }else{
                success(doc);
            }
        });
    };
    
// Publicly Available
// ==========================================================================
    return {
        schema:        cardSchema,
        model:         _model,
        add:           _save,
        update:        _update,
        remove:        _remove,
        find:           _findOne,
        all:            _findAll
    };
}();



