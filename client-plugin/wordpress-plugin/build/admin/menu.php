<?php
//add_action('admin_menu', 'ce_register_admin_menu');
add_action('admin_enqueue_scripts', 'ce_enqueue_admin_assets');

add_action('admin_menu', function (){
  add_menu_page(
    'Cost Estimator',
    'Cost Estimator',
    'manage_options',
    'cost-estimator-dashboard',
    'ce_render_admin_ui',
    'dashicons-calculator',
    56
  );
});

/*function ce_register_admin_menu() {

}
*/
function ce_render_admin_ui() {

  echo '<div id="root"></div>';
}


function ce_enqueue_admin_assets($hook) {
  if ($hook !== 'toplevel_page_cost-estimator-dashboard') return;

  $build_path = dirname(__FILE__, 2);
  $js_path    = $build_path . '/assets/index.js';
  $css_path   = $build_path . '/assets/index.css';

  $js_url  = plugins_url('../assets/index.js', __FILE__);
  $css_url = plugins_url('../assets/index.css', __FILE__);



  if(file_exists($js_path)){
    wp_register_script('ce-main-js', $js_url, [], filemtime($js_path), true);
    wp_script_add_data('ce-main-js', 'type', 'module');

    // Localize the REST base + NONCE (this token proves the request comes from a logged-in user on this site)
    wp_localize_script('ce-main-js', 'CE_APP_DATA', [
      'mode'    => 'client',
      'pro'     => true,
      'client'  => 'default',
      'restUrl' => esc_url_raw(rest_url('cost-estimator/v1')), // e.g., https://site.test/wp-json/cost-estimator/v1
      'nonce'   => wp_create_nonce('wp_rest'),                  // <-- the REST nonce
    ]);

    wp_enqueue_script('ce-main-js');
  }

  if (file_exists($css_path)) {
    wp_enqueue_style('ce-main-css', $css_url, [], filemtime($css_path));
  }
}

/*
  if ($hook !== 'toplevel_page_cost-estimator-dashboard') return;

  // Adjust path if your React files are elsewhere
  $plugin_url = plugin_dir_url(__FILE__) . '../assets/';

    // Register first
  wp_register_script('ce-main-js', $plugin_url . 'index.js', [], null, true);
  
    // ✅ Localize AFTER registering
  wp_localize_script('ce-main-js', 'CE_APP_DATA', [
    'mode' => 'client',
    'pro' => true,
    'nonce' => wp_create_nonce('wp_rest'),
  ]);

    wp_script_add_data('ce-main-js', 'type', 'module');
  
  wp_enqueue_script('ce-main-js');
  wp_enqueue_style('ce-main-css', $plugin_url . 'index.css');
*/

/*What is a WordPress nonce?
It’s a short-lived token WordPress generates to protect against CSRF (Cross-Site Request Forgery).

It’s not encryption. It’s a time-sensitive “are you really this logged-in user, on this site, right now?” check.

Lifetime: effectively up to ~24 hours (two 12-hour “ticks”).

For the REST API, WP uses a special action string: 'wp_rest'.
You generate the token in PHP and the browser sends it back in each write request.

Why you need it
Without a nonce, a bad site could trick a logged-in admin into POSTing to your /config endpoint (e.g., via an auto-submitting form in a hidden iframe). The nonce blocks that because the attacker can’t read/generate a valid token for your site/user.
*/