---
trigger: always_on
---

# Islandora/drupal docker context
- docker compose is used for this container setup. 
- main docker compose file is located in ~/islandora-dev/ so all the docker compose commands should be run from there.
- Drupal rootfs is located in ~/islandora-dev/drupal/rootfs/var/www
- the custom themes are mounted in ~/islandora-dev/drupal/rootfs/var/www/drupal/web/themes/custom/ where this sacda theme is located.
- the docker contaner name is drupal-dev when using docker compose but isle-site-template-drupal-dev-1 with just docker

you don't need to build containers, they will be running when you start working. And don't need to clear cache manually every command because of volume mounts, changes will be reflected immediately.