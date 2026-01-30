<?php

/**
 * @file
 * Template suggestions for SACDA theme.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter() for page templates.
 */
function sacda_theme_suggestions_page_alter(array &$suggestions, array $variables): void {
  if (\Drupal::service('path.matcher')->isFrontPage()) {
    $suggestions[] = 'page__landing';
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for block templates.
 */
function sacda_theme_suggestions_block_alter(array &$suggestions, array $variables): void {
  if (isset($variables['elements']['#plugin_id'])) {
    $plugin_id = $variables['elements']['#plugin_id'];
    
    if (strpos($plugin_id, 'system_menu_block:') === 0) {
      $menu_name = str_replace('system_menu_block:', '', $plugin_id);
      $suggestions[] = 'block__system_menu_block__' . $menu_name;
    }
  }
  
  if (isset($variables['elements']['#configuration']['region'])) {
    $region = $variables['elements']['#configuration']['region'];
    $suggestions[] = 'block__region__' . $region;

    // Use generic sidebar section template for all blocks in object_sidebar
    if ($region === 'object_sidebar') {
      $suggestions[] = 'block__sidebar_section';
    }
    
    if (isset($variables['elements']['#plugin_id'])) {
      $plugin_id = str_replace(':', '_', $variables['elements']['#plugin_id']);
      $suggestions[] = 'block__region__' . $region . '__' . $plugin_id;
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for menu templates.
 */
function sacda_theme_suggestions_menu_alter(array &$suggestions, array $variables): void {
  if (isset($variables['menu_name'])) {
    $suggestions[] = 'menu__' . $variables['menu_name'];
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for node templates.
 */
function sacda_theme_suggestions_node_alter(array &$suggestions, array $variables): void {
  if (isset($variables['view']) && $variables['view'] instanceof \Drupal\views\ViewExecutable) {
    $suggestions[] = 'node__view__' . $variables['view']->id();
    $suggestions[] = 'node__view__' . $variables['view']->id() . '__' . $variables['view']->current_display;
  }
}
