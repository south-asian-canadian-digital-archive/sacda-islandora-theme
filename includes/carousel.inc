<?php

/**
 * @file
 * Carousel preprocess functions for SACDA theme.
 */

use Drupal\file\Entity\File;

/**
 * Prepares carousel slide variables.
 *
 * @param array $variables
 *   The variables array to populate.
 * @param string $theme_path
 *   The base theme path.
 */
function _sacda_preprocess_carousel(array &$variables, string $theme_path): void {
  $default_carousel_slides = [
    [
      'image_url' => $theme_path . '/static/carousel/38280_ca_object_representations_media_512_large.jpg',
      'title' => 'Heritage Sikh Temple, Abbotsford',
      'subtitle' => '',
      'link' => 'https://sacda.ca/Detail/objects/614',
    ],
    [
      'image_url' => $theme_path . '/static/carousel/32984_ca_object_representations_media_12323_large.jpg',
      'title' => 'Group photograph of six men at Victoria gurdwara',
      'subtitle' => '',
      'link' => 'https://sacda.ca/Detail/objects/18700',
    ],
    [
      'image_url' => $theme_path . '/static/carousel/92147_ca_object_representations_media_2966_large.jpg',
      'title' => 'Group on steps of Hillcrest Temple',
      'subtitle' => '',
      'link' => 'https://sacda.ca/Detail/objects/8606',
    ],
    [
      'image_url' => $theme_path . '/static/carousel/34612_ca_object_representations_media_491_large.jpg',
      'title' => 'Lumber mill workers',
      'subtitle' => '',
      'link' => 'https://sacda.ca/Detail/objects/592',
    ],
    [
      'image_url' => $theme_path . '/static/carousel/47742_ca_object_representations_media_12458_large.jpg',
      'title' => 'Photo of a Sikh man standing on horse-drawn buggy',
      'subtitle' => '',
      'link' => 'https://sacda.ca/Detail/objects/18973',
    ],
  ];

  $carousel_slides = theme_get_setting('carousel_slides') ?: [];
  $variables['carousel_slides'] = [];
  $variables['carousel_autoplay_speed'] = theme_get_setting('carousel_autoplay_speed') ?: 5000;

  if (!empty($carousel_slides)) {
    foreach ($carousel_slides as $slide) {
      $fid = is_array($slide['image_fid']) ? reset($slide['image_fid']) : ($slide['image_fid'] ?? NULL);
      if ($fid && $file = File::load($fid)) {
        $variables['carousel_slides'][] = [
          'image_url' => \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri()),
          'title' => $slide['title'] ?? '',
          'subtitle' => $slide['subtitle'] ?? '',
          'link' => $slide['link'] ?? '',
        ];
      }
    }
  }

  if (empty($variables['carousel_slides'])) {
    $variables['carousel_slides'] = $default_carousel_slides;
  }

  if (!empty($variables['carousel_slides'])) {
    $variables['#attached']['library'][] = 'sacda/carousel';
  }
}
