<?php
/**
 * Plugin Name: Funeral Estimator
 * Description: Displays a React-based cost estimator using remote ACF data from your host site.
 * Version: 1.0
 * Author: Your Name
 */

// Load the admin settings page
require_once plugin_dir_path(__FILE__) . 'admin/settings-page.php';

// Load the shortcode for frontend display
require_once plugin_dir_path(__FILE__) . 'public/shortcode.php';
