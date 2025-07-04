<?php

function fec_render_estimator_shortcode() {
    ob_start();
    // This will be replaced by React later
    return '<div id="estimator-root">Loading Cost Estimator...</div>';

    return ob_get_clean();
}
add_shortcode('CostEstimator', 'fec_render_estimator_shortcode');

function fec_enqueue_test_script() {
    wp_enqueue_script('fec-api-test', plugin_dir_url(__FILE__) . 'test-api.js', [], null, true);
}
add_action('wp_enqueue_scripts', 'fec_enqueue_test_script');
