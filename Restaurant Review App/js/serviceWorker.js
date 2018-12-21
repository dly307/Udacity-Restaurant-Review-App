/**
 * Registering a service worker to cache data
 */
"use strict"; 

if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .catch(function(err) {
      console.error(err);
    })
  }
  /**
   * Installing service worker and grabbing array of files to be cached
   */
  const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js', 
    '/js/main.js', 
    '/js/restaurant_info.js', 
    '/data/restaurants.json', 
    '/img/1.jpg', 
    '/img/2.jpg', 
    '/img/3.jpg', 
    '/img/4.jpg', 
    '/img/5.jpg', 
    '/img/6.jpg', 
    '/img/7.jpg', 
    '/img/8.jpg', 
    '/img/9.jpg', 
    '/img/10.jpg', 
  ];
  
  self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
      })
    );
  });
  
  /**
   * Checking to see if we get a response back from the match query
   */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response) {
          console.log('Found ', e.request, ' in cache.');
          return response; // returns cache if found
        } else {
          console.log('Could not find ', e.request, ' in cache, FETCHING NOW...');
          return fetch(e.request) // will fetch if not found
          .then(function(response) {
            const clonedResponse = response.clone(); 
            caches.open('v1').then(function(cache) {
              cache.put(e.request, clonedResponse);
            })
            return response; 
          })
          .catch(function(err) {
            console.error(err); // if cannot be fetched, will return an error message
          });
        }
      })
    );
  });