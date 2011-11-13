var ConnectFour = function (){
  this.board_pieces = [];
  this.players = [0 ,1];
  this.active_player = this.players[0];
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
     
     if (this.active_player === this.players[0]) {
       this.active_player = this.players[1];
     }
     else {
       this.active_player = this.players[0];
     }
  },

  is_winning_move:  function(row, column) {
  },

  get_active_player: function() {
    return this.active_player;
  }
};

