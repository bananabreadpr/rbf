<?php
// ajax call

add_action( 'wp_ajax_nopriv_game_results', 'game_results' );
add_action( 'wp_ajax_game_results', 'game_results' );

function game_results() {


    $args = array(
        'timeout'     => 5,
        'redirection' => 5,
        'httpversion' => '1.0',
        'user-agent'  => 'WordPress/' . $wp_version . '; ' . get_bloginfo( 'url' ),
        'blocking'    => true,
        'headers'     => array(),
        'cookies'     => array(),
        'body'        => null,
        'compress'    => false,
        'decompress'  => true,
        'sslverify'   => true,
        'stream'      => false,
        'filename'    => null
    );

    $tomorrow = mktime(0, 0, 0, date("m"), date("d")+1, date("y"));
    

    $request  = wp_remote_get('http://org.infobasket.ru/Widget/CalendarCarousel/'. $_POST['tab_id'].'?from=today&to='.date("YYYY-MM-DD", $tomorrow).'&format=json', $args );                  
                
    $json = wp_remote_retrieve_body( $request );

    $json = json_encode($json);

    echo $json;
    die();

}
?>