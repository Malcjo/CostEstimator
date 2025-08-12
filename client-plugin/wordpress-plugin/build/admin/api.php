<?php

if(!defined('ABSPATH')){
    exit;
}

add_action('rest_api_init', function () {
        register_rest_route('cost-estimator/v1', '/config', [
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'estimator_get_config',
        'permission_callback' => '__return_true', // public GET for now
    ]);

    register_rest_route('cost-estimator/v1', '/config', [
        'methods'  => WP_REST_Server::EDITABLE,
        'callback' => 'estimator_save_config',
        'permission_callback' => function () {
            // Only admins can save
            return current_user_can('manage_options');
        },
    ]);
});

/**
 * For now we always use a single option name.
 * When you are ready to split per client, change this to:
 *   return 'cost_estimator_config_' . sanitize_key($client);
 * // if you're not splitting per client yet, keep a single key
 */
function ce_option_name_for($client = 'default') {
    return 'cost_estimator_config';
}

function estimator_get_config(WP_REST_Request $req){

    $client = sanitize_text_field($req->get_param('client') ?: 'default');
    $opt = ce_option_name_for($client);

    // Read the option. It may be a JSON string (new) or an array (old saves).
    $raw = get_option($opt, '{}');
    // Migrate old array saves into a JSON response
    if (is_array($raw)) {
        $raw = wp_json_encode($raw);
    }

    $config = json_decode($raw, true);
    if (!is_array($config)) {
        $config = [
            'layout'   => [],
            'pricing'  => [],
            'design'   => [],
            'settings' => [],
        ];
    }

    return rest_ensure_response($config);
}

function estimator_save_config(WP_REST_Request $req){
// 1) Verify nonce (prevents CSRF)
        // Nonce check (send X-WP-Nonce from your admin UI)
    $nonce = $req->get_header('X-WP-Nonce');
    if (!wp_verify_nonce($nonce, 'wp_rest')) {
        return new WP_Error('rest_forbidden', 'Invalid nonce', ['status' => 403]);
    }
      // 2) Verify capability (defense in depth; also enforced by permission_callback)
  if (!current_user_can('manage_options')) {
    return new WP_Error('rest_forbidden', 'Insufficient permissions', ['status' => 403]);
  }

// 3) Read + validate payload
    $data = $req->get_json_params();
    if (!is_array($data)) {
        return new WP_Error('invalid_data', 'Invalid config data.', ['status' => 400]);
    }
  

/*
  // (Optional) size limit to avoid massive options
  $bytes = strlen(wp_json_encode($payload));
  if ($bytes > 512000) { // ~500 KB
    return new WP_Error('rest_too_large', 'Config too large', ['status' => 413]);
  }
*/

  // 4) Save JSON, autoload=no
    // Read client param but keep single-option behaviour for now
    $client = sanitize_text_field($req->get_param('client') ?: 'default');
    $opt    = ce_option_name_for($client);

    // Save JSON, autoload = no for performance
    update_option($opt, wp_json_encode($data), false);

    return rest_ensure_response(['saved' => true]);
}


/*
add_action('rest_api_init', function () {
    /*
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
    */
    /*
        register_rest_route('cost-estimator/v1', '/config', [
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'estimator_get_config',
        'permission_callback' => '__return_true', // public GET for now
    ]);

    register_rest_route('cost-estimator/v1', '/config', [
        'methods'  => WP_REST_Server::EDITABLE,
        'callback' => 'estimator_save_config',
        'permission_callback' => function () {
            // Only admins can save
            return current_user_can('manage_options');
        },
    ]);
});
*/


/*
function estimator_get_config(WP_REST_Request $req){
/*
    $raw = get_option('cost_estimator_config', '{}');

    if(is_array($raw)){
        $raw = wp_json_encode($raw);
    }
    $config = json_decode($raw, true);
    //$config = get_option('cost_estimator_config');
    //error_log("fetched config from DB: " . print_r($config, true));
        if (!$config || !is_array($config)) {
        $config = [
            'layout' => [],
            'pricing' => [],
            'design' => [],
            'settings' => [],
        ];
        //error_log('Returning default config structure');
    }
    return rest_ensure_response($config);
    */
/*
    $client = sanitize_text_field($req->get_param('client') ?: 'default');
    $opt = ce_option_name_for($client);

    // Read the option. It may be a JSON string (new) or an array (old saves).
    $raw = get_option($opt, '{}');

    // Migrate old array saves into a JSON response
    if (is_array($raw)) {
        $raw = wp_json_encode($raw);
    }

    $config = json_decode($raw, true);

    if (!is_array($config)) {
        $config = [
            'layout'   => [],
            'pricing'  => [],
            'design'   => [],
            'settings' => [],
        ];
    }

    return rest_ensure_response($config);
}
    */


    /*
    function estimator_save_config(/*$request*/ //){
/*
    $data = $request->get_json_params();
    if(!is_array($data)){
        return new WP_Error('invalid_data', 'Invalid config data.', ['status' => 400]);
    }
    update_option('cost_estimator_config', wp_json_encode($data), false);
    //update_option('cost_estimator_config', $data);
    return rest_ensure_response(['saved' => true, 'data' => $data]);
    */
/*
        // Nonce check (send X-WP-Nonce from your admin UI)
    $nonce = $req->get_header('X-WP-Nonce');
    if (!wp_verify_nonce($nonce, 'wp_rest')) {
        return new WP_Error('rest_forbidden', 'Invalid nonce', ['status' => 403]);
    }

    $data = $req->get_json_params();
    if (!is_array($data)) {
        return new WP_Error('invalid_data', 'Invalid config data.', ['status' => 400]);
    }

    // Read client param but keep single-option behaviour for now
    $client = sanitize_text_field($req->get_param('client') ?: 'default');
    $opt    = ce_option_name_for($client);

    // Save JSON, autoload = no for performance
    update_option($opt, wp_json_encode($data), false);

    return rest_ensure_response(['saved' => true]);
}
    */