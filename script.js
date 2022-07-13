const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'JY_fPZm11zfrWqHSaQvtGWvOR4dHgjjw7FycvEv6DNA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Function to check if all images are loaded
const imageLoaded = function () {
  console.log('image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
};

//Helper function to set attribute on DOM elements
function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

//Create Elements for links &  Photos, Add to Dom
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create anchor element to link to unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //Create img element
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener, Check if images are fully loaded
    img.addEventListener('load', imageLoaded);
    //put img inside <a>, then put both inside image-container
    item.append(img);
    imageContainer.append(item);
  });
};

//Get photos from unsplash API
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch Error here
  }
};

//Check to see if scrolling near bottom of page, Load more photos

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    console.log('load more');
    getPhotos();
  }
});
//Onload the function
getPhotos();
