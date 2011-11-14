var ConnectFour = function (){
  this.board_pieces = [];
  this.players = [0 ,1];
  this.active_player = this.players[0];
  this.is_game_done = false;
}

ConnectFour.prototype = {
  get_pieces: function (column) {
    var column_pieces = this.board_pieces[column];
    if (!column_pieces) {
      return [];
    }
    return column_pieces;
  },

  has_piece: function(row, column) {
    var pieces = this.get_pieces(column);
    var piece = pieces[row];
    if (piece == null || piece === 'undefined') {
      return false;
    }
    return true;
  },

  can_add_piece: function(column) {
    if(column < 7) {
      var count = 0;
      for (var i = 0; i < 6; i++) {
        if (this.has_piece(i, column)) {
          count++;
        }
      }
      if (count < 6) {
        return true;
      }
    }
    return false;
  },

  get_next_piece_row: function(column) {
     var pieces = this.get_pieces(column);
     for (var i = 5; i >= 0; i--) {
       if (!this.has_piece(i, column)) {
         return i;
       }
     }
     return -1;
  },

  add_piece: function(column) {
     var pieces = this.get_pieces(column);
     if(this.can_add_piece(column)) {
       var row = this.get_next_piece_row(column);
       pieces[row] = this.active_player;
       this.board_pieces[column] = pieces;
     }
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

    for (var row = 0; row < 6; row++) {
      for (var column = 0; column < 7; column++) {
        connect_matrix['up:' + row + ':' + column] = [];
        connect_matrix['up_right:' + row + ':' + column] = [];
        connect_matrix['right:' + row + ':' + column] = [];
        connect_matrix['down_right:' + row + ':' + column] = [];
        connect_matrix['down:' + row + ':' + column] = [];
        connect_matrix['down_left:' + row + ':' + column] = [];
        connect_matrix['left:' + row + ':' + column] = [];
        connect_matrix['up_left:' + row + ':' + column] = [];

        for (var i = 0; i < 4; i++) {
          connect_matrix['up:' + row + ':' + column].push([column, row - i]);
          connect_matrix['up_right:' + row + ':' + column].push([column + i, row - i]);
          connect_matrix['right:' + row + ':' + column].push([column + i, row]);
          connect_matrix['down_right:' + row + ':' + column].push([column + i, row + i]);
          connect_matrix['down:' + row + ':' + column].push([column, row + i]);
          connect_matrix['down_left:' + row + ':' + column].push([column - i, row + i]);
          connect_matrix['left:' + row + ':' + column].push([column - i, row]);
          connect_matrix['up_left:' + row + ':' + column].push([column - i, row - i]);
        }
      }
    }

    for (var matrix_key in connect_matrix) {
      var cells = connect_matrix[matrix_key];
      
      for (var i = 0; i < 4; i++) {
        var cell = cells[i];
        var column = cell[0];
        var row = cell[1];
        var pieces = this.get_pieces(column);
        var piece = pieces[row];

        if(!this.has_piece(row, column) || piece !== player || row < 0 
          || column < 0 ) {
          break;
        }
        else if(i === 3) {
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

