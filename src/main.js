import galleryItems from "./app.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    backdrop: document.querySelector('.lightbox__overlay'),
    modalImage: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};
const imageMarkup = createImageCard(galleryItems);

refs.gallery.insertAdjacentHTML('beforeend', imageMarkup);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function createImageCard() {
    return galleryItems
        .map(({ preview, original, description }, index) => {
            return `
        <li class= "gallery__item" >
            <a
                class="gallery__link"
                href="${original}"
            >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                data-index="${index}"
            />
            </a>
        </li >`;
        })
        .join('');
};

function onGalleryClick(e) {
    if (!e.target.classList.contains("gallery__image")) {
        return;
    }
    
    onClickImage(e);
};
function onClickImage(e) {
    e.preventDefault();
    refs.modalImage.src = e.target.dataset.source;
    refs.modalImage.dataset.index = e.target.dataset.index;
    refs.modalImage.alt = e.target.alt
    window.addEventListener("keydown", onEscapePress);
    window.addEventListener("keydown", slideToTheSide);
    addClassIsOpen();
};
function addClassIsOpen() {
    refs.lightbox.classList.add("is-open");
};
function onCloseModal() {
    refs.lightbox.classList.remove("is-open");
    clearImgAttribute();
};
function clearImgAttribute() {
    if (!refs.lightbox.classList.contains("is-open")) {
        refs.modalImage.src = '';
    };
};
function onEscapePress(e) {
  if (e.code === "Escape") {
    onCloseModal(e);
  }
};
function onBackdropClick(e) {
  onCloseModal(e);
};

function slideToTheSide(e) {
    if (e.code === "ArrowLeft") {
        onArrowLeft();
    };
    if (e.code === "ArrowRight") {
        onArrowRight();
    };
};
function findNewIndex(index, i = 0) {
    refs.modalImage.dataset.index = `${index + 1}`;
    refs.modalImage.src = galleryItems[index + i].original;
};
function onArrowLeft() {
    let index = Number(refs.modalImage.dataset.index);
    if (index === 0) {
        findNewIndex(galleryItems.length - 1);
        return;
    };
    findNewIndex(index, -1);
};
function onArrowRight() {
  let index = Number(refs.modalImage.dataset.index);
  if (index === galleryItems.length - 1) {
    findNewIndex(0);
    return;
  }
  findNewIndex(index, 1);
};
const message = 'Node is amazing!';