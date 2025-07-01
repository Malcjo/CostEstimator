<?php
function funeral_estimator_shortcode() {
    // Get the saved API key
    $api_key = esc_js(get_option('funeral_estimator_api_key', ''));

    // Construct the full API URL to your host site
    $host_base_url = 'http://hosttest.local'; // 🔁 CHANGE THIS TO YOUR REAL HOST
    $api_url = $host_base_url . '/wp-json/estimator/v1/data?key=' . $api_key;

    // Build plugin asset path
    $plugin_dir = plugin_dir_url(__DIR__) . 'build/assets/';

    ob_start(); ?>
        <div id="root">Testing</div>
        <p>{<?php echo $api_url; ?>}</p>
        <p>{<?php echo $plugin_dir  ?>}</p>
        <script>
            window.estimatorApiUrl = "<?php echo $api_url; ?>";
        </script>
        <script type="module" src="<?php echo $plugin_dir; ?>index.js"></script>
        <link rel="stylesheet" href="<?php echo $plugin_dir; ?>index.css">
    <?php return ob_get_clean();
}
add_shortcode('FuneralEstimator', 'funeral_estimator_shortcode');
