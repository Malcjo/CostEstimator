<?php
/**
 * Plugin Name: Cost Estimator Client
 * Description: Client-side plugin for funeral cost estimation.
 * Version: 0.1
 * Author: Your Name
 */

 if(!defined('ABSPATH')) exit;

 //setup: Register plgun activation hook for DB
 register_activation_hook(__FILE__, 'fec_activation_plugin');

 function fec_activation_plugin(){
    //require_once plugin_dir_path(__FILE__) . 'includes/db-schema.php';
    //fec_create_estimator_tables();
 }

 // Load admin pages
 if(is_admin()){
    //require_once plugin_dir_path(__FILE__) . 'admin/settings-page.php';
    //require_once plugin_dir_path(__FILE__) . 'admin/layout-editor.php';
    require_once plugin_dir_path(__FILE__) . 'admin/menu.php';
 }

 //Register shortcode to render estimator
 require_once plugin_dir_path(__FILE__) . 'public/shortcode.php';
 require_once plugin_dir_path(__FILE__) . 'admin/api.php';

 wp_localize_script('ce-admin-js', 'CE_APP_DATA', [
  'mode' => 'client',
  'pro' => true,
]);