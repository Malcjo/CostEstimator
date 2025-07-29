<?php
add_action('admin_menu', 'ce_register_admin_menu');
add_action('admin_enqueue_scripts', 'ce_enqueue_admin_assets');



function ce_register_admin_menu() {
  add_menu_page(
    'Cost Estimator',
    'Cost Estimator',
    'manage_options',
    'cost-estimator-dashboard',
    'ce_render_admin_ui',
    'dashicons-clipboard',
    3
  );
}

function ce_render_admin_ui() {

  echo '<div id="root"></div>';
}


function ce_enqueue_admin_assets($hook) {
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
}



