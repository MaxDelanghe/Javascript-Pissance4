$(document).ready(function(){
  $('<div id="block1"></div>').prependTo('.contener');
  $('<div id="block2"></div>').prependTo('.contener');
  $('<div id="timer1"></div>').appendTo('#block1');
  $('<div id="timer2"></div>').appendTo('#block2');
  $('<div id="score1"></div>').appendTo('#block1');
  $('<div id="score2"></div>').appendTo('#block2');

  $("#timer0").hide();
  $('<div id="name1"></div>').appendTo('#block1');
  $('<div id="name2"></div>').appendTo('#block2');
  $('<div id="cercle1"></div>').appendTo('#block1');
  $('<div id="cercle2"></div>').appendTo('#block2');



  var $tab_color = ['red', 'blue', 'green', 'pink', 'yellow'];
  var $tab_color_fr = ['rouge', 'bleu', 'vert', 'rose', 'jaune'];
  let $time = 0;
  var $id_current = 0;
  var $color_current = '';
  var $lauch_time = true;
  var $manche_total = 0;
  var $grille_y = 0;
  var $grille_y = 0;

/*  let $tab_init_j1 = init(1 , $tab_color_fr);
  for( var i = 0; i < $tab_color_fr.length; i++){
    if ( $tab_color_fr[i] === $tab_init_j1[1]) {
      $tab_init_j1[1] = $tab_color[i];
      $tab_color_fr.splice(i, 1);
      $tab_color.splice(i, 1);
    }
  }
  console.log('info du j2 ->' + $tab_init_j1);
  let $tab_init_j2 = init(2 , $tab_color_fr);
  for( var i = 0; i < $tab_color_fr.length; i++){
    if ( $tab_color_fr[i] === $tab_init_j2[1]) {
      $tab_init_j2[1] = $tab_color[i];
      $tab_color_fr.splice(i, 1);
      $tab_color.splice(i, 1);
    }
  }
  console.log('info du j2 ->' + $tab_init_j2);
  do {
   $time = prompt('Choissisez le niveau de dificulte :\n\tniveau 3 : 1  minutes\n\tniveau 2 : 2  minutes\n\tniveau 1 : 3  minute\n\tniveau 0 : ∞ minutes ');
 } while ($time != 0 && $time != 1 && $time != 2 && $time != 3);*/
  $time = 1; // // TODO: testtttttttttttttttttttttttttttttt;

  $manche_total = prompt('Combien de manche voulez-vous jouer ?');
  var j1 = new Player(1, 'amel', 'green', $time, 0);
  $('#block1').css('color', 'green');
  $('#name1').text('amel');
  $('#cercle1').css('background-color', 'green');

  var j2 = new Player(2, 'p2', 'red', $time, 0);
  $('#block2').css('color', 'red');
  $('#name2').text('p2');
  $('#cercle2').css('background-color', 'red');

  $('#score1').text('Score : ' + 0);
  $('#score2').text('Score : ' + 0);

  do { $grille_y = prompt('Nombre de collonne ? min(5)'); } while (!($grille_y >= 5));
  do { $grille_x = prompt('Nombre de ligne ? min(5)'); } while (!($grille_x >= 5));
  set_game($grille_x, $grille_y);
  function set_game(){
    $('#grille').show();
    $id_current  = (j1.get_id());
    $color_current = (j1.get_color());
    $name_current = (j1.get_color());
    init_grille();
  }
  function reset_game(){
    $( "#grille" ).empty();
    j1.reset_time($time);
    j2.reset_time($time);
    document.getElementById('timer1').innerHTML = 00 + $time + ":" + 00;
    document.getElementById('timer2').innerHTML = 00 + $time + ":" + 00;
    set_game();
  }

  function init($nb, $couleur){
    let $tab_info = [];
    let $string = '';
    for (var i = 0; i < $couleur.length; i++) {
      $string = $string + $couleur[i] + ' ';
    }
    do { $tab_info[0] = prompt('Nom du joueur '+ $nb +' ?'); } while ($tab_info[0] == '');
    do { $tab_info[1] = prompt('Couleur du joueur '+ $nb +' ?\nLes couleurs disponible sont : ' + $string);
    }
    while (
      $tab_info[1] != $couleur[0] && $tab_info[1] != $couleur[1] && $tab_info[1] != $couleur[2] && $tab_info[1] != $couleur[3] && $tab_info[1] != $couleur[4]
    );
    return $tab_info;
  }

  function init_grille(){
    let $str = '';
    let $col = '';
    let $place = '';
    let $string_id = '';
    for (var i =0; i < $grille_y; i++) {
      $str = "<div class=\"collonne\" id=\"col" + i + "\"></div>"
      $($str).appendTo('#grille');
      $col = $('#col'+i);
      for (var a = 0; a < $grille_x; a++) {
        if (a == 0) c = " stop";
        else c = "";
        if (a == $grille_x -1) e = " cible";
        else e = "";
        if (i == 0) {
          $string_id = "id=\""+a;
        }
        else {
          $string_id = "id=\""+i+a;
        }
        $place = '<div class="case '+ c + e + '\" '+ $string_id+"\"></div>";
        $($place).appendTo($col);
      }
    }
    $(".collonne").each(function() {
      $(".collonne").css('background-color', 'black');
    });
  }
  $(document).on('mouseenter', '.collonne', function() {
      $(this).css('background-color', $color_current);
  });
  $(document).on('mouseleave', '.collonne', function() {
      $(this).css('background-color', 'black');
  });

  $(document).on('click', '.collonne', function() {
    if ($(':animated').length) {
      return false;
    }
    if ($lauch_time) {
      $lauch_time = false;
      startTimer();
    }
    let index = $(".collonne").index(this);
    let target = $(".cible").eq(index);
    let next = target.prev();
    if (target.hasClass("end")) {
      $(this).trigger('mouseleave');
      return;
    }
    animate(target);
    $($dropDiv).promise().done(function(){
      if (target.hasClass("stop")) {
        target.css('background-color', $color_current);
        target.addClass($color_current);
        target.addClass('end');
        target.removeClass("stop");
      }
      else {
        target.addClass($color_current);
        target.css('background-color', $color_current);
        next.addClass('cible');
        target.removeClass("cible");
      }
      $($dropDiv).css('display', 'none');
      win(target);
      $id_current = turn_id($id_current);
      $color_current = turn_color($id_current);
      $name_current = turn_name($id_current);
      $(this).trigger('mouseenter');
    });
  });

  function Player($id, $name, $color, $time, $score) {
    this.id = $id;
    this.name = $name;
    this.color = $color;
    this.time = $time;
    this.score = $score;
    this.get_id = function() { return(this.id); };
    this.get_name = function() { return(this.name); };
    this.get_color = function() { return(this.color); };
    this.get_time = function() { return(this.time); };
    this.get_score = function() { return(this.score); };
    this.change_time = function($sub) {
      this.time = parseInt(this.time, 10) - parseInt($sub, 10);
    };
    this.reset_time = function($int) {
      this.time = $int;
    };
    this.change_score = function($add) {
      this.score = this.score + $add;
    };
  }

  function turn_id($id_current) {
    console.log('in change -> ' + $id_current);

    if ( $id_current == 1) {
      $id_current = 2;
    }
    else if ($id_current == 2) {
       $id_current = 1;
    }
    return($id_current);
  }

  function turn_name($name_current) {
    if ($id_current == 1) {
      $name_current = j1.get_name(); }
    else {
      $name_current = j2.get_name(); }
    return($name_current);
  }
  function turn_color($color_current) {
    if ($id_current == 1) {
      $color_current = j1.get_color();
      $('#block1').css('border', '1px solid ' + $color_current);
      $('#block2').css('border', '1px solid black');
    }
    else {
      $color_current = j2.get_color();
      $('#block2').css('border','1px solid ' + $color_current);
      $('#block1').css('border', '1px solid black');
    }
    return($color_current);
  }

  //js part
  document.getElementById('timer1').innerHTML = 00 + $time + ":" + 00;
  document.getElementById('timer2').innerHTML = 00 + $time + ":" + 00;

function startTimer() {
  console.log('in timer -> ' +$id_current);
    const presentTime = document.getElementById('timer' + $id_current).innerHTML;
    const timeArray = presentTime.split(/[:]+/);
    let $int = (-1);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    if(m<0){
      alert('T\'es dans la loose ' + $name_current);
      if ($id_current == 1) {
        j1.change_score($int);
      }else {
        j2.change_score($int);
      }
      alert('reset de la partie');
      reset_game();
    }

    document.getElementById('timer'+ $id_current).innerHTML =
      m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }

  $('<div id="dropPion"></div>').appendTo('body');
  var $dropDiv = $('#dropPion');

  function animate(down) {
      $dropDiv.css('background-color', $color_current)
      // get position of the target
      var offset = $(down).offset();
      // get width/height of click collone
      var h = $(down).outerHeight();
      var w = $(down).outerWidth();
      // get width/height pion
      var dh = $dropDiv.outerHeight();
      var dw = $dropDiv.outerWidth();
      console.log(h);
      dh = dh - 100; // for place until target
      console.log(h);
      // determine middle position
      var initLeft = offset.left + ((w/2) - (dw/2));
      // animation
        console.log(offset);
      if ((offset.top) < 400) { // when rangee du haut
        $dropDiv.css({
              left: initLeft,
              top: $(window).scrollTop() - dh,
              opacity: 1,
              display: 'block'
            }).animate({
                left: initLeft,
                top: offset.top - dh,
                opacity: 1
            }, 150).animate({
              top: offset.top -  ((offset.top)/9)
            }, 20).animate({
              top: offset.top
            }, 20).animate({
              top: offset.top -  ((offset.top)/13)
            }, 20).animate({
              top: offset.top
            }, 20);
      }
      else {
        $dropDiv.css({ // when rangee du bas
          left: initLeft,
          top: $(window).scrollTop() - dh,
          opacity: 1,
          display: 'block'
        }).animate({
          left: initLeft,
          top: offset.top - dh,
          opacity: 1
        }, 250).animate({
          top: offset.top -  ((offset.top)/6)
        }, 75).animate({
          top: offset.top
        }, 100).animate({
          top: offset.top -  ((offset.top)/9)
        }, 75).animate({
          top: offset.top
        }, 100);
      }
  }

  function win($pion){
    let $color = $color_current;
    var $id = $($pion).attr('id');
    let $win_bool = false;
    let $score = 0;
    let $str1 = '';
    let $str2 = '';
    let $str3 = '';
    let $str4 = '';
    $win_bool = verif_verticale($id, $color);
    if ($win_bool == true) {
      $str1 = (' (vertical)');
      $score++;
      $win_bool = false;
    }
    $win_bool = verif_right($id, $color);
    if ($win_bool == true) {
      $str2 = (' (horizontale)');
      $score++;
      $win_bool = false;
    }
    $win_bool = verif_up_right($id, $color);
    if ($win_bool == true) {
      $str3 = (' (diagonale)');
      $score++;
      $win_bool = false;
    }
    $win_bool = verif_up_left($id, $color);
    if ($win_bool == true) {
      $str4 = (' (diagonale)');
      $score++;
      $win_bool = false;
    }
    if ($score >= 2) {
      $score = $score - 1;
      alert($name_current + ' gagne cette manche avec un bonus de (' + $score +')point car alignements multiples !!!' + $str1 + $str2+ $str3+ $str4);
      $score = $score + 1;
    }
    else if ($score == 1) {
      alert($name_current + ' gagne cette manche !'+ $str1 + $str2+  $str3+ $str4);
    }
    verif_score($score);
  }

  function verif_score($int){
    if ($int == 0) {
      return;
    }
    let $actual = 0;
    if ($id_current == 1) {
      j1.change_score($int)
      $actual = j1.get_score($int);
      if ($actual >= $manche_total) {
        alert($name_current + ' gagne la partie !!!');
      }
      else {
        $('#score1').text('Score : '+$actual);
        reset_game();
      //  $("body").empty();
      }
    }
    else if ($id_current == 2) {
      j2.change_score($int)
      $actual = j2.get_score($int);
      if ($actual >= $manche_total) {
        alert($name_current + ' gagne la partie !!!');
    //    $("body").empty();
      }
      else {
        $('#score2').text('Score : '+$actual);
        reset_game();
      }
    }
  }

  function verif_verticale($pion, $color){
    let test_win = 0;
    for (var i = 0; i < 4; i++) {
      let $test = parseInt($pion, 10) + parseInt(i, 10);
      if ($("#" +$test).hasClass($color)) {
        test_win++;
        if (test_win == 4) {
          return true;
        }
      }
      else {
        return false;
      }
    }
  }

  function verif_right($pion, $color){
    var test_win = 0;
    let unit = 10;
    let $if_horizontal = 0;
    for (var i = 0; i < 4; i++) {
      let $test = parseInt($pion, 10) + parseInt(unit, 10);
      if ($("#" +$test).hasClass($color)) {
        test_win++;
        if (test_win >= 3) {
          return true;
        }
      }
      else {
        $if_horizontal = verif_left($pion, $color, test_win);
        return $if_horizontal;
      }
      unit = parseInt(unit, 10) + parseInt(10, 10);
    }
  }

  function verif_left($pion, $color, test_win_left){
    let unit = (-10);
    let $test = 0;
    for (var i = 0; i < 4; i++) {
      $test = parseInt($pion, 10) + parseInt(unit, 10);
      if ($("#" +$test).hasClass($color)) {
        test_win_left++;
        if (test_win_left >= 3) {
            return true;
        }
      }
      else {
        return false;
      }
      unit = parseInt(unit, 10) - parseInt(10, 10);
    }
  }

  function verif_up_right($pion, $color){
    var test_win = 0;
    let unit = 10 - 1;
    let $if_digonale = 0;
    for (var i = 0; i < 4; i++) {
      let $test = parseInt($pion, 10) + parseInt(unit, 10);
      if ($("#" +$test).hasClass($color)) {
        test_win++;
        if (test_win >= 3) {
          return true;
        }
      }
      else {
        $if_digonale = verif_up_right_reverse($pion, $color, test_win);
        return $if_digonale;
      }
      unit = parseInt(unit, 10) + parseInt(10 - 1, 10);
    }
  }
  function verif_up_right_reverse($pion, $color, test_up_right_reverse){
    let unit = (-10 +1);
    let $test = 0;
    for (var i = 0; i < 4; i++) {
      $test = parseInt($pion, 10) + parseInt(unit, 10);
      if ($("#" +$test).hasClass($color)) {
        test_up_right_reverse++;
        if (test_up_right_reverse >= 3) {
          return true;
        }
      }
      else {
        return false;
      }
      unit = parseInt(unit, 10) - parseInt(10 -1, 10);
    }
  }



  function verif_up_left($pion, $color){
    var test_win = 0;
    let unit = (-(10 + 1));
    let $if_digonale = 0;
    for (var i = 0; i < 4; i++) {
      let $test = parseInt($pion, 10) + parseInt(unit, 10);
      if ($("#" +$test).hasClass($color)) {
        test_win++;
        if (test_win >= 3) {
          return true;
        }
      }
      else {
        $if_digonale = verif_up_left_reverse($pion, $color, test_win);
        return $if_digonale;
      }
      unit = parseInt(unit, 10) - parseInt(10 + 1, 10);
    }
  }
  function verif_up_left_reverse($pion, $color, test_up_left_reverse){
    let unit = (10 +1);
    let $test = 0;
    for (var i = 0; i < 4; i++) {
      $test = parseInt($pion, 10) + parseInt(unit, 10);
      if ($("#" +$test).hasClass($color)) {
        test_up_left_reverse++;
        if (test_up_left_reverse >= 3) {
          return true;
        }
      }
      else {
        return false;
      }
      unit = parseInt(unit, 10) + parseInt(10 +1, 10);
    }
  }

});
