'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1c41b414f79498f18e768e8f96608823",
"assets/assets/animations/see_more.json": "479d02be636c7a34e1fd3a3ef08add08",
"assets/assets/animations/splash.json": "a187c9cf0a61fe050a0da78297c3a050",
"assets/assets/background/personal_image.jpg": "68b5349c8f8c3103d07b0b66e58fba46",
"assets/assets/font/Product-Sans-Bold.ttf": "dba0c688b8d5ee09a1e214aebd5d25e4",
"assets/assets/font/Product-Sans-Light.ttf": "5ea2ab343da06f7eb96ea959895665ea",
"assets/assets/font/Product-Sans-Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/assets/logo/app-store-badge.png": "77ca8b6daef7f3a2c81f8266a17cd96a",
"assets/assets/logo/google-play-badge.png": "1e91d02cf5a902f38f2923c006d79281",
"assets/assets/logo/logo.png": "aaa7af929028bdb1126276f2a708c5a7",
"assets/FontManifest.json": "e21ac5b2587a0703599d98d883de0def",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "13ecabffdfb942f1af3bc41611695ea4",
"assets/shaders/ink_sparkle.frag": "ae6c1fd6f6ee6ee952cde379095a8f3f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "1703f3c713235bd16cc13f47f9fdc2b6",
"/": "1703f3c713235bd16cc13f47f9fdc2b6",
"main.dart.js": "34b37b46384463c01ae3ab35680ac9cf",
"main.dart.js_1.part.js": "380e234711b67514218d258472853322",
"main.dart.js_10.part.js": "c17712f26d781f50133a6e403b8535ae",
"main.dart.js_11.part.js": "80f4f6b1294c5943de228b05bd2be3d1",
"main.dart.js_12.part.js": "f5bb12c50d6020357ce1f0743469601d",
"main.dart.js_13.part.js": "ef346ed10eaec0ed6833a3bcc34c8019",
"main.dart.js_14.part.js": "2799100038200395e35525ebdbb4133e",
"main.dart.js_15.part.js": "d23b3d4a9039a28fd91e79488ed7bf53",
"main.dart.js_16.part.js": "ef85b6ec14e96d03ab4357de8305f322",
"main.dart.js_17.part.js": "ec1e7bd9af79d618326cde423eb55d8b",
"main.dart.js_18.part.js": "01b0f294c164a4393e36e2ceddd0beb7",
"main.dart.js_19.part.js": "28485ec2a1af7330608718bd98795736",
"main.dart.js_2.part.js": "cba5f04165bd448c9769c2c5970fe893",
"main.dart.js_20.part.js": "bc78a3dc73a10261259419d2a43b2092",
"main.dart.js_3.part.js": "145acd87a83faaa64971a1ac6d99c4a7",
"main.dart.js_4.part.js": "f8663cdc2ab6907c8b89cdefbc8fe0b2",
"main.dart.js_5.part.js": "4fb284a9bc52df4137259a7098e42a09",
"main.dart.js_6.part.js": "57e181594ffb01a08f117348f13ee002",
"main.dart.js_7.part.js": "32377f6992af7b940f8e8e587de98ba9",
"main.dart.js_8.part.js": "c50f6337e1d172e727018444b9007448",
"main.dart.js_9.part.js": "eb21b48eb0d6e23187a5786e12ad67bc",
"manifest.json": "ee0d158f6473b3c4cc56c98faf2d2616",
"version.json": "009c9e65172e010890f7f65fde438006"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
