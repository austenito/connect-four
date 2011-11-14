var ConnectFour = function (){
  this.board_pieces = [];
  this.players = [0 ,1];
  this.active_player = this.players[0];
  this.is_game_done = false;
}

ConnectFour.prototype = {
  get_pieces: function (row) {
    var current_row_pieces = this.board_pieces[row];
    if (!current_row_pieces) {
      return [];
    }
    return current_row_pieces;
  },

  has_piece: function(row, column) {
    var pieces = this.get_pieces(row);
    var piece = pieces[column];
    if (piece == null || piece === 'undefined') {
      return false;
    }
    return true;
  },

  add_piece: function(row, column) {
     var pieces = this.get_pieces(row);
     pieces[column] = this.active_player;
     this.board_pieces[row] = pieces;
  },

  change_turn: function() {
   if (this.active_player === this.players[0]) {
     this.active_player = this.players[1];
   }
   else {
     this.active_player = this.players[0];
   }
  },

  is_winning_move:  function(row, column, player) {
    var connect_matrix = [];
    connect_matrix['up'] = [];
    connect_matrix['up_right'] = [];
    connect_matrix['right'] = [];
    connect_matrix['down_right'] = [];
    connect_matrix['down'] = [];
    connect_matrix['down_left'] = [];
    connect_matrix['left'] = [];
    connect_matrix['up_left'] = [];

    for (var i = 1; i < 4; i++) {
      connect_matrix['up'].push([column, row - i]);
      connect_matrix['up_right'].push([column + i, row - i]);
      connect_matrix['right'].push([column + i, row]);
      connect_matrix['down_right'].push([column + i, row + i]);
      connect_matrix['down'].push([column, row + i]);
      connect_matrix['down_left'].push([column - i, row + i]);
      connect_matrix['left'].push([column - i, row]);
      connect_matrix['up_left'].push([column - i, row - i]);
    }

    for (var matrix_key in connect_matrix) {
      var cells = connect_matrix[matrix_key];
      
      for (var i = 0; i < 3; i++) {
        var cell = cells[i];
        var column = cell[0];
        var row = cell[1];
        var pieces = this.get_pieces(row);
        var piece = pieces[column];

        //console.log("player(" + player + "): " + row + ", " + column + ": " + piece);
        if(!this.has_piece(row, column) || piece !== player || row < 0 
          || column < 0 ) {
          break;
        }
        else if(i === 2) {
          return cells;
        }
      }
    }
    return false;
  },

  get_active_player: function() {
    return this.active_player;
  },

  set_winner: function(player) {
    this.winner = player;
  },

  get_winner: function() {
    return this.winner;
  },

  has_winner: function() {
    if (this.winner == null || this.winner === 'undefined') {
      return false;
    }
    return true;
  }
};

