<?php
/**
 * Shortcode + asset wiring for Cost Estimator (client)
 * Vite emits:
 *   build/assets/index.js
 *   build/assets/index.css  (only if CSS is imported)
 */
if (!defined('ABSPATH')) exit;

/**
 * Register frontend assets using paths relative to THIS file.
 * This file is at: wordpress-plugin/build/public/shortcode.php
 * Assets are at:   wordpress-plugin/build/assets/index.{js,css}
 */
function ce_register_frontend_assets_fixed() {
    // Filesystem paths for existence/version checks
    $build_path  = dirname(__FILE__, 2);     // .../wordpress-plugin/build
    $js_path     = $build_path . '/assets/index.js';
    $css_path    = $build_path . '/assets/index.css';

    // URLs derived from this file's location
    $js_url  = plugins_url('../assets/index.js', __FILE__);
    $css_url = plugins_url('../assets/index.css', __FILE__);

    // Register JS if it exists
    if (file_exists($js_path)) {
        wp_register_script(
            'cost-estimator-frontend',
            $js_url,
            [],
            filemtime($js_path), // cache-bust with file mtime
            true                 // in footer
        );
        wp_script_add_data('cost-estimator-frontend', 'type', 'module');
    } else {
        error_log('[CostEstimator] Missing JS asset at ' . $js_path);
    }

    // Register CSS only if present (avoids 404 when no CSS emitted)
    if (file_exists($css_path)) {
        wp_register_style(
            'cost-estimator-frontend',
            $css_url,
            [],
            filemtime($css_path)
        );
    }
}

/**
 * Shortcode: [CostEstimator] or [CostEstimator client="Acme"]
 * Passes client + REST info to JS.
 */
add_shortcode('CostEstimator', function($atts){
    $atts = shortcode_atts(['client' => 'default'], $atts, 'CostEstimator');

    // Make sure assets are registered
    ce_register_frontend_assets_fixed();

    // Localize boot data onto the registered handle
    if (wp_script_is('cost-estimator-frontend', 'registered')) {
        wp_localize_script('cost-estimator-frontend', 'COST_ESTIMATOR_BOOT', [
            'client' => $atts['client'],
            'restUrl' => esc_url_raw(rest_url('cost-estimator/v1')),
            'nonce'   => wp_create_nonce('wp_rest'),
        ]);

        // Enqueue after localize so data is attached before print
        wp_enqueue_script('cost-estimator-frontend');
    } else {
        error_log('[CostEstimator] Frontend script not registered; run your Vite build and ensure index.js exists.');
    }

    // Enqueue CSS if present
    if (wp_style_is('cost-estimator-frontend', 'registered')) {
        wp_enqueue_style('cost-estimator-frontend');
    }

    // Render a STATIC mount point id for compatibility with your existing React entry
    $root_id = 'estimator-root';
    ob_start(); ?>
      <div id="<?php echo esc_attr($root_id); ?>" data-client="<?php echo esc_attr($atts['client']); ?>"></div>
    <?php
    return ob_get_clean();
});
