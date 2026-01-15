<?php

/**
 * @file
 * Footer preprocess functions for SACDA theme.
 */

use Drupal\file\Entity\File;

/**
 * Prepares footer partner variables.
 *
 * @param array $variables
 *   The variables array to populate.
 * @param string $theme_path
 *   The base theme path.
 */
function _sacda_preprocess_footer_partners(array &$variables, string $theme_path): void {
  $static_images = [
    'canada' => $theme_path . '/static/footer_sponsors/canada_logo.svg',
    'british columbia' => $theme_path . '/static/footer_sponsors/bc.svg',
    'fraser valley' => $theme_path . '/static/footer_sponsors/ufv.svg',
    'barber learning' => $theme_path . '/static/footer_sponsors/BCHDP_logo_white.png',
    'library and information' => $theme_path . '/static/footer_sponsors/CLIR_red_w_wordmark_outline.svg',
  ];

  $default_partners = [
    [
      'name' => 'Government of Canada',
      'image' => $static_images['canada'],
      'link' => 'https://www.canada.ca/',
      'weight' => 2,
    ],
    [
      'name' => 'Province of British Columbia',
      'image' => $static_images['british columbia'],
      'link' => 'https://www.bcb.ca/en',
      'weight' => 1,
    ],
    [
      'name' => 'University of the Fraser Valley',
      'image' => $static_images['fraser valley'],
      'link' => 'https://www.ufv.ca/',
      'weight' => 0,
    ],
    [
      'name' => 'UBC Irving K. Barber Learning Centre',
      'image' => $static_images['barber learning'],
      'link' => 'https://ikblc.ubc.ca/',
      'weight' => 3,
    ],
    [
      'name' => 'Council of Library and Information Resources',
      'image' => $static_images['library and information'],
      'link' => 'https://www.clir.org/',
      'weight' => 4,
    ],
  ];

  $partners = theme_get_setting('footer_partners') ?: [];
  $variables['footer_partners'] = [];

  if (!empty($partners)) {
    foreach ($partners as $partner) {
      $image_url = '';
      $fid = is_array($partner['image_fid']) ? reset($partner['image_fid']) : ($partner['image_fid'] ?? NULL);
      
      if ($fid && $file = File::load($fid)) {
        $image_url = \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
      }
      else {
        $name_lower = strtolower($partner['name'] ?? '');
        foreach ($static_images as $key => $path) {
          if (str_contains($name_lower, $key)) {
            $image_url = $path;
            break;
          }
        }
      }

      if (!empty($image_url)) {
        $variables['footer_partners'][] = [
          'name' => $partner['name'] ?? '',
          'image' => $image_url,
          'link' => $partner['link'] ?? '',
          'weight' => $partner['weight'] ?? 0,
        ];
      }
    }
  }

  if (empty($variables['footer_partners'])) {
    $variables['footer_partners'] = $default_partners;
  }

  usort($variables['footer_partners'], fn($a, $b) => $a['weight'] <=> $b['weight']);
}

/**
 * Prepares footer social link variables.
 *
 * @param array $variables
 *   The variables array to populate.
 */
function _sacda_preprocess_footer_social(array &$variables): void {
  $variables['footer_social_links'] = theme_get_setting('footer_social_links') ?: [];
  usort($variables['footer_social_links'], fn($a, $b) => ($a['weight'] ?? 0) <=> ($b['weight'] ?? 0));
}
