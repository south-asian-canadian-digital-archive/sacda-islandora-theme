<?php

/**
 * @file
 * Color helper functions for SACDA theme.
 */

/**
 * Gets theme color settings with defaults.
 *
 * @return array
 *   Array with 'primary', 'secondary', and 'light' color values.
 */
function _sacda_get_theme_colors(): array {
  return [
    'primary' => theme_get_setting('primary_color') ?: '#F99D2A',
    'secondary' => theme_get_setting('secondary_color') ?: '#414042',
    'light' => theme_get_setting('light_color') ?: '#FFEDC2',
  ];
}

/**
 * Adds theme color variables to a variables array.
 *
 * @param array $variables
 *   The variables array to populate.
 */
function _sacda_add_color_variables(array &$variables): void {
  $colors = _sacda_get_theme_colors();
  $variables['primary_color'] = $colors['primary'];
  $variables['secondary_color'] = $colors['secondary'];
  $variables['light_color'] = $colors['light'];
}
