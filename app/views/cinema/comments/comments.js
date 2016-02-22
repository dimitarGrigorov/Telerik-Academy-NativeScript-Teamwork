var view = require('ui/core/view');
var CommentViewModel = require('../../../shared/view-models/comment-view-model');
var CommentSectionViewModel = require('../../../shared/view-models/comment-section-view-model');
var commentService = require('../../../shared/services/comment-service');
var userService = require('../../../shared/services/user-service');
var dialogsModule = require('ui/dialogs');
var Toast = require('nativescript-toast');
var socialShare = require('nativescript-social-share');
var _ = require('lodash');

var page;
var pageData;

function onNavigatedTo(args) {
    page = args.object;

    pageData = new CommentSectionViewModel({
        cinemaId: page.navigationContext.cinemaId
    });

    page.bindingContext = pageData;
    loadComments();
}

function loadComments() {
    commentService.getAllByCinemaId(pageData.get('cinemaId'))
        .then(function (responseData) {
            var comments = _.map(responseData, function (comment) {
                return new CommentViewModel(comment);
            });

            pageData.set('comments', _.reverse(comments));
        }, function (error) {
            console.log('Error in comments view: ' + error.message);
        });
}

function submitComment() {
    var cinemaId = pageData.get('cinemaId');
    var text = pageData.get('commentToSubmit');

    if (text.length) {
        userService.getCurrent()
            .then(function (userData) {
                commentService.create({
                    from: userData.username,
                    text: text,
                    cinemaId: cinemaId
                }).then(function () {
                    loadComments();
                    Toast.makeText('You have successfully sent a message!', 'long').show();
                });
            }, function (error) {
                Toast.makeText(error.message, 'long').show();
            });
    }

    // hide keyboard
    view.getViewById(page, 'comment-to-add').dismissSoftInput();
    pageData.set('commentToSubmit', '');
}

function shareComment(from, text) {
    var shareMessage = 'Check out what ' + from + ' said: ' + text;

    userService.getCurrent()
        .then(function () { // authenticated
            socialShare.shareText(shareMessage);
        }, function (error) {
            Toast.makeText(error.message, 'long').show();
        });
}

function deleteComment() {
}

function onLongPress(args) {
    var commentFrom = args.view.commentData.from;
    var commentText = args.view.commentData.text;

    console.log(commentFrom);    

    dialogsModule.action({
        message: 'Select an action',
        cancelButtonText: 'Do nothing...',
        actions: ['Share', 'Delete']
    }).then(function (result) {
        if (result === 'Share') {
            shareComment(commentFrom, commentText);
        } else if (result === 'Delete') {
            deleteComment();
        }
    });
}

exports.onNavigatedTo = onNavigatedTo;
exports.submitComment = submitComment;
exports.onLongPress = onLongPress;
