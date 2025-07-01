<?php
/**
 * Plugin Name: Funeral Estimator Host API
 * Description: Provides mock pricing data for FuneralEstimator plugin clients.
 * Version: 0.1
 * Author: You
 */

// Register a REST endpoint: /wp-json/funeral/v1/data?key=YourKey
add_action('rest_api_init', function () {
    register_rest_route('estimator/v1', '/data', [
        'methods' => 'GET',
        'callback' => 'feh_get_estimator_data',
        'permission_callback' => '__return_true', // make public
    ]);
});

function feh_get_estimator_data($request) {
    $key = sanitize_text_field($request->get_param('key'));

    // Simple key check or mapping logic (optional)
    if ($key !== 'Testing123') {
        return new WP_Error('invalid_key', 'Invalid or missing API key', ['status' => 403]);
    }

    // Mock data
    return [
        'casketPrices' => [
            'Pine_Plywood_Casket' => 800,
            'Settler_Plastic' => 600,
        ],
        'facilityHire' => [
            'KCFHLounge' => 400,
            'KCFHChapel' => 750,
        ],
        'burialOrCremation' => [
            'new_burial_plot' => 3000,
            'cremation_fee_children_and_adults' => 550,
        ],
        'serviceSheet' => [
            'basic' => 100,
            'premium' => 250,
        ],
    ];
}
