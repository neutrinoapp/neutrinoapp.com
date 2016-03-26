(function ($) {
    'use strict';

    var board = [];
    var index = 1;
    var rows = 5;
    var cols = 7;

    for (var i = 0; i <= rows; i++) {
        board.push([]);
        var row = $('<div class="row"></div>');
        for (var l = 0; l <= cols; l++) {
            board[i].push(index++);
            var tile = $('<div class="tile"></div>');
            tile.attr('id', board[i][l]);
            tile.on('click', moveItem);
            tile.appendTo(row);
        }
        row.appendTo('#game-board');
    }


    var start = $('#game-board').find('#' + getRandomInt(board[rows][0], board[rows][cols]));
    var end = $('#game-board').find('#' + getRandomInt(board[0][0], board[0][cols]));
    var finish = $('<i class="fa fa-star"></i>');
    var arrowUp = $('<i class="game-arrow fa fa-arrow-up"></i>');
    var arrowDown = $('<i class="game-arrow fa fa-arrow-down"></i>');
    var arrowRight = $('<i class="game-arrow fa fa-arrow-right"></i>');
    var arrowLeft = $('<i class="game-arrow fa fa-arrow-left"></i>');
    var lastTile = start;
    var viewedTilesStyles = {
        'background-color': '#A09F9F',
        'opacity': 0.8
    };
    finish.appendTo(end);
    arrowUp.appendTo(start);

    function moveItem(event) {
        var move = checkMovePossibility(event);
        if (move) {
            lastTile.css(viewedTilesStyles);
            $('.game-arrow').detach();
            lastTile = $(event.target);
            move.appendTo(lastTile);
        }
    }

    function checkMovePossibility(event) {
        var lastId = parseInt(lastTile[0].id);
        var newId = parseInt(event.target.id);
        if (lastId + 1 === newId) {
            return arrowRight;
        } else if (lastId - 1 === newId) {
            return arrowLeft;
        } else if (lastId - 8 === newId) {
            return arrowUp;
        } else if (lastId + 8 === newId) {
            return arrowDown;
        }
        return false;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})(jQuery);
