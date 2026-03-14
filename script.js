const navbar = document.querySelector('#navbar');
const darkToggle = document.querySelector('#dark-toggle');
const menuLinks = document.querySelectorAll('.menu-link');

// =============================================
// FITUR 1: DARK MODE TOGGLE + LOCALSTORAGE
// =============================================

const modeTersimpan = localStorage.getItem('darkMode');

if (modeTersimpan === 'aktif') {
  document.body.classList.add('dark-mode');
  darkToggle.textContent = '☀ Light Mode';
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const aktif = document.body.classList.contains('dark-mode');

  darkToggle.textContent = aktif ? '☀ Light Mode' : '🌙 Dark Mode';

  localStorage.setItem('darkMode', aktif ? 'aktif' : 'nonaktif');
});

// =====================================================
// FITUR 2: STICKY NAVBAR BERUBAH SAAT SCROLL
// =====================================================

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('navbar-scroll');
  } else {
    navbar.classList.remove('navbar-scroll');
  }
});

// ==================================
// FITUR 3: SMOOTH SCROLL DARI NAVBAR
// ==================================

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetId = link.getAttribute('href');

    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ======================================
// FITUR 4: ANIMASI COUNTER ANGKA
// ======================================

// Ambil semua elemen dengan class stat-angka
const semuaAngka = document.querySelectorAll('.stat-angka');

// Fungsi untuk animasi satu angka naik dari 0 ke target
const animasiCounter = (elemen, target) => {
  let angkaSaatIni = 0;

  // Hitung kenaikan per frame (agar selesai dalam ~80 frame)
  const kenaikan = Math.ceil(target / 80);

  // setInterval: jalankan fungsi setiap 20 milidetik
  const timer = setInterval(() => {
    angkaSaatIni += kenaikan;

    // Jika sudah melebihi target, hentikan dan tampilkan angka pasti
    if (angkaSaatIni >= target) {
      elemen.textContent = target.toLocaleString('id-ID');
      clearInterval(timer);
    } else {
      elemen.textContent = angkaSaatIni.toLocaleString('id-ID');
    }
  }, 20);
};

// ======================================================================
// Intersection Observer: pantau apakah elemen terlihat di layar
// ======================================================================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Jika elemen sedang terlihat di layar
      if (entry.isIntersecting) {
        const elemen = entry.target;

        // Ambil nilai target dari atribut data-target di HTML
        const target = parseInt(elemen.dataset.target);

        // Mulai animasi
        animasiCounter(elemen, target);

        // Hentikan pengamatan — animasi hanya jalan sekali
        observer.unobserve(elemen);
      }
    });
  },
  { threshold: 0.5 } // aktif saat 50% elemen terlihat
);

// Daftarkan setiap elemen stat-angka ke observer
semuaAngka.forEach((angka) => {
  observer.observe(angka);
});
