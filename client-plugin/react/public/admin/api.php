<?php

if(!defined('ABSPATH')){
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('cost-estimator/v1', '/config', [
        'methods' => 'GET',
        'callback' => 'estimator_get_config',
        'permission_callback' => '__return_true',
    ]);
        register_rest_route('cost-estimator/v1', '/config', [
        'methods' => 'POST',
        'callback' => 'estimator_save_config',
        'permission_callback' => function() {
            return current_user_can('manage_options'); //admins only
        },
    ]);
});

function estimator_get_config(){
    $config = get_option('cost_estimator_config');
    error_log("fetched config from DB: " . print_r($config, true));
        if (!$config || !is_array($config)) {
        $config = [
            'layout' => [],
            'pricing' => [],
            'design' => [],
            'settings' => [],
        ];
        error_log('Returning default config structure');
    }
    return rest_ensure_response($config);
}

function estimator_save_config($request){
    $data = $request->get_json_params();
    if(!is_array($data)){
        return new WP_Error('invalid_data', 'Invalid config data.', ['status' => 400]);
    }
    update_option('cost_estimator_config', $data);
    return rest_ensure_response(['saved' => true, 'data' => $data]);
}