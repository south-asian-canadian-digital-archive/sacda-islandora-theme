<?php

/**
 * @file
 * Theme settings callbacks and submit handlers for SACDA theme.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Ajax callback for partners section.
 */
function sacda_partners_ajax_callback(array &$form, FormStateInterface $form_state) {
  return $form['footer_settings']['partners_wrapper'];
}

/**
 * Submit handler to add a partner.
 */
function sacda_add_partner_callback(array &$form, FormStateInterface $form_state): void {
  $form_state->set('num_partners', $form_state->get('num_partners') + 1);
  $form_state->setRebuild();
}

/**
 * Submit handler to remove a partner.
 */
function sacda_remove_partner_callback(array &$form, FormStateInterface $form_state): void {
  $num = $form_state->get('num_partners');
  if ($num > 1) {
    $form_state->set('num_partners', $num - 1);
  }
  $form_state->setRebuild();
}

/**
 * Ajax callback for social links section.
 */
function sacda_social_ajax_callback(array &$form, FormStateInterface $form_state) {
  return $form['footer_settings']['social_wrapper'];
}

/**
 * Submit handler to add a social link.
 */
function sacda_add_social_callback(array &$form, FormStateInterface $form_state): void {
  $form_state->set('num_social', $form_state->get('num_social') + 1);
  $form_state->setRebuild();
}

/**
 * Submit handler to remove a social link.
 */
function sacda_remove_social_callback(array &$form, FormStateInterface $form_state): void {
  $num = $form_state->get('num_social');
  if ($num > 1) {
    $form_state->set('num_social', $num - 1);
  }
  $form_state->setRebuild();
}

/**
 * Submit handler to clean up empty entries and make files permanent.
 */
function sacda_theme_settings_submit(array &$form, FormStateInterface $form_state): void {
  _sacda_process_partners_submit($form_state);
  _sacda_process_social_submit($form_state);
  _sacda_process_carousel_submit($form_state);
}

/**
 * Process partner submissions.
 */
function _sacda_process_partners_submit(FormStateInterface $form_state): void {
  $partners = $form_state->getValue('footer_partners') ?: [];
  $cleaned_partners = [];

  foreach ($partners as $partner) {
    if (empty($partner['name']) && empty($partner['image_fid']) && empty($partner['link'])) {
      continue;
    }

    $fid = is_array($partner['image_fid']) ? reset($partner['image_fid']) : $partner['image_fid'];
    if ($fid && $file = File::load($fid)) {
      $file->setPermanent();
      $file->save();
      \Drupal::service('file.usage')->add($file, 'sacda', 'theme', 1);
    }

    $cleaned_partners[] = [
      'name' => $partner['name'] ?? '',
      'image_fid' => $fid ?: NULL,
      'link' => $partner['link'] ?? '',
      'weight' => $partner['weight'] ?? 0,
    ];
  }

  usort($cleaned_partners, fn($a, $b) => $a['weight'] <=> $b['weight']);
  $form_state->setValue('footer_partners', $cleaned_partners);
}

/**
 * Process social link submissions.
 */
function _sacda_process_social_submit(FormStateInterface $form_state): void {
  $social_links = $form_state->getValue('footer_social_links') ?: [];
  $cleaned_social = array_filter($social_links, fn($s) => !empty($s['title']) || !empty($s['link']));
  usort($cleaned_social, fn($a, $b) => ($a['weight'] ?? 0) <=> ($b['weight'] ?? 0));
  $form_state->setValue('footer_social_links', array_values($cleaned_social));
}

/**
 * Process carousel slide submissions.
 */
function _sacda_process_carousel_submit(FormStateInterface $form_state): void {
  $carousel_slides = $form_state->getValue('carousel_slides') ?: [];
  $cleaned_slides = [];

  foreach ($carousel_slides as $slide) {
    $fid = is_array($slide['image_fid']) ? reset($slide['image_fid']) : ($slide['image_fid'] ?? NULL);
    
    if (empty($fid) && empty($slide['title']) && empty($slide['subtitle'])) {
      continue;
    }

    if ($fid && $file = File::load($fid)) {
      $file->setPermanent();
      $file->save();
      \Drupal::service('file.usage')->add($file, 'sacda', 'theme', 1);
    }

    $cleaned_slides[] = [
      'image_fid' => $fid ?: NULL,
      'title' => $slide['title'] ?? '',
      'subtitle' => $slide['subtitle'] ?? '',
      'link' => $slide['link'] ?? '',
    ];
  }

  $form_state->setValue('carousel_slides', $cleaned_slides);
}
