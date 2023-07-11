#!/bin/bash

echo "Running composer install"
composer install

php artisan tenants:delete

echo "clearing tenants cache"
php artisan tenants:run cache:clear
php artisan tenants:run config:clear

echo "clearing landlord cache"
php artisan optimize:clear

echo "migrating landlord and seeding"
php artisan migrate:fresh --seed
php artisan tenants:seed
