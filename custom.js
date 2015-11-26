
//ajax add slider function
function get_results(tab_id) {


	if(tab_id == null) {
		tab_id = 11002;
	}

	var liveSwiper = new Swiper ('.live_games-container', {
    });

	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		loop: false,
		pagination: '.swiper-pagination',
		slidesPerView: 4,
		slidesPerGroup: 4,
		paginationClickable: true,
		spaceBetween: 10,
		// Navigation arrows
	    nextButton: '.result-button-next',
	    prevButton: '.result-button-prev',
	    
	    // And if we need scrollbar
	    scrollbar: '.swiper-scrollbar',
	    mousewheelControl: true,
	    grabCursor: false,
	    scrollbarDraggable: true
    });

	var GameStatus = ["scheduled", "finished", "live"];

	jQuery.ajax({
		url : gameresults.ajax_url,
		type : 'post',
		dataType: "json",
		data : {
			action : 'game_results',
			tab_id : tab_id
		},
		beforeSend: function(){
	        $('.result-loader').show();
	        mySwiper.lockSwipeToNext();
	    },
	    complete: function(){
	        $('.result-loader').hide();
	        mySwiper.unlockSwipeToNext();
	    },
		success : function( get_data ) {
			var peopleHTML = "";
			var liveGames = "";

			var games = JSON.parse(get_data);
   		
			 $.each(games, function() {

			 	var classA = "", classB = "";

			 	if(this.ScoreA > this.ScoreB) {
      			classA = " winner"; 
		        }
		        if(this.ScoreB > this.ScoreA) {
		        classB = " winner"; 
		        }
		        if(this.GameStatus == 2) {

		        liveGames += '<div id="game-'+ this.GameID +'" class="game-item swiper-slide">';
	            liveGames += '<a target="_blank" href="http://stats.russiabasket.ru/org/game.html?id='+ this.GameID +'&compId=' + tab_id + '&tab=0" class="scorebox-container ' + GameStatus[this.GameStatus] + '">';
	            liveGames += '<div class="score-content">';

	            liveGames += '<div class="team-names">';

	            liveGames += '<div class="game-team">';
	            liveGames += '<span class="' + classA + '"><img src="http://org.infobasket.ru/Widget/GetTeamLogo/' + this.TeamAid + '?full=0">' + this.ShortTeamNameAen + '</span>';
	            liveGames += '</div>';

	            liveGames += '<div class="game-team">';
	            liveGames += '<span class="' + classB + '"><img src="http://org.infobasket.ru/Widget/GetTeamLogo/' + this.TeamBid + '?full=0">' + this.ShortTeamNameBen + '</span>';
	            liveGames += '</div>';

	            liveGames += '</div>';

	            liveGames += '<div class="game-results">';
	            if(this.ScoreA && this.ScoreB) {
	            liveGames += '<div class="game-result"><span class="' + classA + '">' + this.ScoreA + '</span></div>';
	            liveGames += '<div class="game-result"><span class="' + classB + '">' + this.ScoreB + '</span></div>';
	        	}
	            liveGames += '</div>';

	            liveGames += '<div class="game-time">';

	        if(this.GameStatus == 0) {

	            liveGames += '<div class="game-item-time">' + this.GameTimeMsk + ' GMT+3</div>';	
	            
	            if(this.IsToday == 0) {
	            liveGames += '<div class="game-item-date">' + this.GameDate + '</div>';	
	            } } else {
	        	liveGames += '<div class="game-item-status">' + GameStatus[this.GameStatus] + '</div>';	
	        	}
	            
	            liveGames += '</div>';

	            liveGames += '</div>';
	            liveGames += '</a>';
	            liveGames += '</div>';

		   		} else {  

	            peopleHTML += '<div id="game-'+ this.GameID +'" class="game-item swiper-slide">';
	            peopleHTML += '<a target="_blank" href="http://stats.russiabasket.ru/org/game.html?id='+ this.GameID +'&compId=' + tab_id + '&tab=0" class="scorebox-container ' + GameStatus[this.GameStatus] + '">';
	            peopleHTML += '<div class="score-content">';

	            peopleHTML += '<div class="team-names">';

	            peopleHTML += '<div class="game-team">';
	            peopleHTML += '<span class="' + classA + '"><img src="http://org.infobasket.ru/Widget/GetTeamLogo/' + this.TeamAid + '?full=0">' + this.ShortTeamNameAen + '</span>';
	            peopleHTML += '</div>';

	            peopleHTML += '<div class="game-team">';
	            peopleHTML += '<span class="' + classB + '"><img src="http://org.infobasket.ru/Widget/GetTeamLogo/' + this.TeamBid + '?full=0">' + this.ShortTeamNameBen + '</span>';
	            peopleHTML += '</div>';

	            peopleHTML += '</div>';

	            peopleHTML += '<div class="game-results">';
	            if(this.ScoreA && this.ScoreB) {
	            peopleHTML += '<div class="game-result"><span class="' + classA + '">' + this.ScoreA + '</span></div>';
	            peopleHTML += '<div class="game-result"><span class="' + classB + '">' + this.ScoreB + '</span></div>';
	        	}
	            peopleHTML += '</div>';

	            peopleHTML += '<div class="game-time">';

	        if(this.GameStatus == 0) {

	            peopleHTML += '<div class="game-item-time">' + this.GameTimeMsk + ' GMT+3</div>';	
	            
	            if(this.IsToday == 0) {
	            peopleHTML += '<div class="game-item-date">' + this.GameDate + '</div>';	
	            } } else {
	        	peopleHTML += '<div class="game-item-status">' + GameStatus[this.GameStatus] + '</div>';	
	        	}
	            
	            peopleHTML += '</div>';

	            peopleHTML += '</div>';
	            peopleHTML += '</a>';
	            peopleHTML += '</div>';

	            }

	        });

			

			mySwiper.removeAllSlides();
			mySwiper.appendSlide(peopleHTML);
			mySwiper.slideTo(1, 300);

			liveSwiper.removeAllSlides();
			liveSwiper.appendSlide(liveGames);
			
			window.dispatchEvent(new Event('resize'));

			

		}
	}); 

}


jQuery(document).ready(function($){
			
	"use strict";

	//initial call
	get_results();


	//on refresh click

	$('.refresh_result').click(function() {

		var tab_id = $('ul.tabs li.current').attr('data-tab');

		get_results(tab_id);


	});

   
	//on tab click

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		get_results(tab_id);

		  

		$('ul.tabs li').removeClass('current');

		$(this).addClass('current');
	});


});