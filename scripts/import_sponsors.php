<?php
/**
 * Drush script: import sponsor images and update theme settings.
 *
 * Usage (from Drupal project root):
 *   drush scr themes/custom/sacda-test-islandora-theme/scripts/import_sponsors.php
 *
 * What it does:
 * - Downloads remote sponsor images
 * - Saves them to `public://sacda_test/footer/`
 * - Creates permanent file entities and records file usage
 * - Updates `sacda_test.settings` config `footer_partners` with image fids
 * - If `footer_social_links` is empty, it will populate defaults as well
 */

use Drupal\file\Entity\File;

// Define sponsors (matches theme defaults).
$sponsors = [
  [
    'name' => 'SACDA',
    'link' => 'http://sacda.ca',
    'image' => 'https://sacda.ca//themes/sacda/assets/pawtucket/graphics/footer/sacda.svg',
  ],
  [
    'name' => 'South Asian Studies Institute',
    'link' => 'http://www.ufv.ca/sasi',
    'image' => 'https://sacda.ca//themes/sacda/assets/pawtucket/graphics/footer/sasi.svg',
  ],
  [
    'name' => 'University of the Fraser Valley',
    'link' => 'http://www.ufv.ca/',
    'image' => 'https://sacda.ca//themes/sacda/assets/pawtucket/graphics/footer/ufv.svg',
  ],
  [
    'name' => 'South Asian Canadian Legacy Project',
    'link' => 'https://saclp.southasiancanadianheritage.ca/',
    'image' => 'https://sacda.ca//themes/sacda/assets/pawtucket/graphics/footer/bc.svg',
  ],
  [
    'name' => 'Canada',
    'link' => 'https://www.canada.ca/en.html',
    'image' => 'https://sacda.ca//themes/sacda/assets/pawtucket/graphics/footer/canada_logo.svg',
  ],
  [
    'name' => 'UBC Irving K. Barber Learning Centre',
    'link' => 'https://ikblc.ubc.ca/',
    'image' => 'https://sacda.ca//themes/sacda/assets/pawtucket/graphics/footer/BCHDP_logo_white.png',
  ],
];

// Default social links to ensure they're present when missing.
$default_social_links = [
  [ 'title' => 'Facebook', 'icon' => 'facebook', 'link' => 'https://www.facebook.com/profile.php?id=100092345694324', 'weight' => 0 ],
  [ 'title' => 'Instagram', 'icon' => 'instagram', 'link' => 'https://www.instagram.com/sacda.sasi/', 'weight' => 1 ],
  [ 'title' => 'Twitter', 'icon' => 'twitter', 'link' => 'https://twitter.com/ufvsasi', 'weight' => 2 ],
  [ 'title' => 'Youtube', 'icon' => 'youtube', 'link' => 'https://www.youtube.com/channel/UCN5tvG-Q8ly9z0YOyWsoaNA', 'weight' => 3 ],
  [ 'title' => 'Flickr', 'icon' => 'flickr', 'link' => 'https://www.flickr.com/photos/ufvcics/albums', 'weight' => 4 ],
];

/**
 * Helper: print via drush_print if available, fallback to echo.
 */
function log_msg($msg) {
  if (function_exists('drush_print')) {
    drush_print($msg);
  }
  else {
    echo $msg . "\n";
  }
}

$file_system = \Drupal::service('file_system');
$file_usage = \Drupal::service('file.usage');
$config_factory = \Drupal::service('config.factory');
$editable = $config_factory->getEditable('sacda_test.settings');

$destination_dir = 'public://sacda_test/footer';
$file_system->prepareDirectory($destination_dir, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY | \Drupal\Core\File\FileSystemInterface::MODIFY_PERMISSIONS);

$partners = [];
foreach ($sponsors as $index => $sponsor) {
  $url = $sponsor['image'];
  log_msg("Downloading: $url");

  // Try to fetch the remote file. Use @ to suppress warnings and check result.
  $data = @file_get_contents($url);
  if ($data === FALSE) {
    log_msg("Failed to download: $url");
    continue;
  }

  $basename = basename(parse_url($url, PHP_URL_PATH));
  $dest = $destination_dir . '/' . $basename;

  // Save file entity (file_save_data will create the managed file).
  $file = file_save_data($data, $dest, FILE_EXISTS_RENAME);
  if ($file instanceof File) {
    $file->setPermanent();
    $file->save();
    // Record file usage so it isn't removed by garbage collection.
    $file_usage->add($file, 'sacda_test', 'theme', 1);

    $partners[] = [
      'name' => $sponsor['name'],
      'image_fid' => $file->id(),
      'link' => $sponsor['link'],
      'weight' => $index,
    ];

    log_msg("Imported {$sponsor['name']} -> fid {$file->id()}");
  }
  else {
    log_msg("Failed to save file entity for: {$sponsor['name']}");
  }
}

if (!empty($partners)) {
  $editable->set('footer_partners', $partners)->save();
  log_msg('Updated sacda_test.settings: footer_partners set.');
}
else {
  log_msg('No partners were imported; footer_partners not updated.');
}

// Ensure social links are present when missing.
$existing_social = $editable->get('footer_social_links');
if (empty($existing_social)) {
  $editable->set('footer_social_links', $default_social_links)->save();
  log_msg('Populated default footer_social_links in sacda_test.settings.');
}
else {
  log_msg('footer_social_links already present; no changes made.');
}

log_msg('Done. Verify with: drush cget sacda_test.settings');

?>
