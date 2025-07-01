<?php
/**
 * Plugin Name: Funeral Estimator Plugin
 * Description: Sets up the connection betwen client and host for displaying funeral Estimator.
 * Version: 1.0
 * Author: Josh Malcolm
 */
// Adds the settings menu under "Settings"
add_action('admin_menu', function () {
    add_options_page(
        'Funeral Estimator Settings',
        'Funeral Estimator',
        'manage_options',
        'funeral-estimator',
        'funeral_estimator_settings_page'
    );
});

// Register a settings field to store the API key
add_action('admin_init', function () {
    register_setting('funeral_estimator_settings', 'funeral_estimator_api_key');
});

function funeral_estimator_settings_page() {
    ?>
    <div class="wrap">
        <h1>Funeral Estimator Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('funeral_estimator_settings');
            do_settings_sections('funeral_estimator_settings');
            ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">API Key</th>
                    <td>
                        <input type="text" name="funeral_estimator_api_key"
                               value="<?php echo esc_attr(get_option('funeral_estimator_api_key')); ?>"
                               style="width: 300px;" />
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}
