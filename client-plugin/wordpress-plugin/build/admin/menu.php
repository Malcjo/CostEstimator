<?php
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
add_action('admin_menu', 'ce_register_admin_menu');

function ce_render_admin_ui() {

  echo '<div id="root"></div>';
}

add_action('admin_enqueue_scripts', 'ce_enqueue_admin_assets');
function ce_enqueue_admin_assets($hook) {
  if ($hook !== 'toplevel_page_cost-estimator-dashboard') return;

  // Adjust path if your React files are elsewhere
  $plugin_url = plugin_dir_url(__FILE__) . '../assets/';
  
  wp_enqueue_script('ce-admin-js', $plugin_url . 'index.js', [], null, true);
  wp_enqueue_style('ce-admin-css', $plugin_url . 'index.css');
}



