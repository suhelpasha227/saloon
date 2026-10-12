const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();

// Do not allow selecting a date in the past.
const dateInput = document.getElementById('date');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
dateInput.min = localToday;

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.getAttribute('data-service');
    const select = document.getElementById('service');
    for (const option of select.options) {
      if (option.text === service) { select.value = service; break; }
    }
  });
});

document.getElementById('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const service = String(data.get('service') || '').trim();
  const date = String(data.get('date') || '').trim();
  const time = String(data.get('time') || '').trim();
  const notes = String(data.get('notes') || '').trim();
  if (!name || !phone || !service || !date || !time) {
    alert('Please fill in all required appointment details.');
    return;
  }
  const message = [
    'Hello Pasha Unisex Salon! I would like to request an appointment.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time}`,
    notes ? `Additional details: ${notes}` : '',
    '',
    'Please confirm availability and the final price. Thank you!'
  ].filter(Boolean).join('\n');
  const url = 'https://wa.me/919758581374?text=' + encodeURIComponent(message);
  window.open(url, '_blank', 'noopener,noreferrer');
});

// Accessible gallery lightbox.
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img').alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
