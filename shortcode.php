<?php
// ajax call

function rbf_result_function( $atts, $content ) {
    $output = '';

    extract( shortcode_atts( array(
        'el_class'     => '',

    ), $atts ) );


    $output .= '<div class="homepage_box game_results_widgets">';
    $output .= '<div class="homepage_box_title">Games
    <span class="refresh_result">
    <svg fill="#777" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    </span></div>';

    $output .= '
    <ul class="tabs">
        <li class="tab-link current" data-tab="11002">Man</li>
        <li class="tab-link" data-tab="11003">Women</li>
    </ul>';



    $output .= '<div class="tab-content">';
    $output .= '<div class="ajax_game_results">
    <div class="live_games-container">
    <div class="swiper-wrapper"></div>
    </div>
    <div class="swiper-container">
    <div class="swiper-wrapper"></div>
    <div class="swiper-scrollbar"></div>
    
    </div>
    <div class="result-loader"><div class="mk-preloader"></div></div>
    <div class="result-button-nav">
    <div class="result-button-prev"><i class="mk-jupiter-icon-arrow-top"></i></div>
    <div class="result-button-next"><i class="mk-jupiter-icon-arrow-bottom"></i></div>
    </div>
    </div>';
    

    $output .= '</div>';


    $output .= '</div>';


    return $output;
}

add_shortcode( 'rbf_result', 'rbf_result_function' );
?>