const AGE_KEY = 'themanor_age_ok';
const ENTRY_LOADER_KEY = 'themanor_entry_loader';

const ageGate = document.getElementById('ageGate');
const ageYes = document.getElementById('ageYes');
const navLinks = document.querySelectorAll('.nav a[data-page]');
const currentPage = document.body.dataset.page;
const oniMask = document.querySelector('.oni-mask');
const sliceWall = document.getElementById('sliceWall');
const ownerWall = document.getElementById('ownerWall');
const modal = document.getElementById('staffModal');
const modalClose = document.getElementById('staffModalClose');
const profileMedia = document.getElementById('staffProfileMedia');
const profileName = document.getElementById('staffProfileName');
const profileRole = document.getElementById('staffProfileRole');
const profilePronouns = document.getElementById('staffProfilePronouns');
const profileBio = document.getElementById('staffProfileBio');
const profileTags = document.getElementById('staffProfileTags');
const profileSexuality = document.getElementById('staffProfileSexuality');
const profileLikes = document.getElementById('staffProfileLikes');
const profileDislikes = document.getElementById('staffProfileDislikes');
const profileLink = document.getElementById('staffProfileLink');
const sexualityRow = document.querySelector('.staff-sexuality');
const likesRow = document.querySelector('.staff-likes');
const dislikesRow = document.querySelector('.staff-dislikes');
const linkRow = document.querySelector('.staff-link');
const profileCloseBtn = document.getElementById('staffProfileClose');
let chipLoaderEl = null;

function showEntryLoader() {
  if (sessionStorage.getItem(ENTRY_LOADER_KEY) === 'true') return;
  let loader = document.querySelector('.page-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="page-loader__glow"></div>
      <div class="page-loader__door"></div>
      <div class="page-loader__spark"></div>
    `;
    document.body.appendChild(loader);
  }
  loader.classList.add('is-active');
  sessionStorage.setItem(ENTRY_LOADER_KEY, 'true');
  setTimeout(() => {
    loader.classList.remove('is-active');
    setTimeout(() => loader.remove(), 400);
  }, 500);
}

function initChipLoader() {
  if (chipLoaderEl) return;
  chipLoaderEl = document.createElement('div');
  chipLoaderEl.className = 'chip-loader';
  chipLoaderEl.innerHTML = '<div class="chip-loader__ring"></div><div class="chip-loader__shine"></div>';
  document.body.appendChild(chipLoaderEl);
}

function pingChipLoader(duration = 450) {
  if (!chipLoaderEl) initChipLoader();
  chipLoaderEl.classList.add('is-active');
  setTimeout(() => chipLoaderEl.classList.remove('is-active'), duration);
}

const STAFF = [
  {
    id: 'freya',
    name: 'Freyja Bloodmoon',
    role: 'Photographer / Gposer',
    roleLabel: 'Photographer',
    pronouns: 'She/Her',
    bio: 'Moody Oni lens that worships nightlife, boudoir heat, and degen thrills.',
    tags: ['Moody', 'Gothic', 'Nightlife', 'Boudoir', 'Degen'],
    sexuality: 'Demi',
    likes: 'Sushi, Smut, music, making new friends with meaningful connections.',
    dislikes: 'Liars, users, abusers, peas.',
    link: 'https://freyjabloodmoon69.wixsite.com/my-site',
    image: ['images/FreyaGposer2.png']
  },
  {
    id: 'blaire',
    name: 'Blaire',
    role: 'Photographer',
    roleLabel: 'Photographer',
    pronouns: 'She/Her',
    sexuality: 'Bisexual',
    bio: 'Lens-first and lore-rich, Sky catches the sweet moments between heat and hush.',
    tags: ['Photographer', 'Portraits', 'Nightlife'],
    likes: 'Conversations, music, photography, sweet treats',
    dislikes: 'Overstepping boundaries, liars, bitter things',
    link: 'https://blairportfoliophotos.carrd.co/',
    image: ['images/sky_blue.png'],
    imagePosition: 'center 18%'
  },
  {
    id: 'alys',
    name: 'Alys',
    role: 'Bartender',
    roleLabel: 'Bartender',
    pronouns: 'She/Her',
    sexuality: 'Straight',
    bio: "Crafted by the music that booms around her, there is more than the drinks on the menu. Though not a court she is one by nature and will aim to please anyone who comes up to her domain. A bit shy? Don't worry, the bar is perfect for those that want casual interaction to roleplay immersion. Let the drinks she serves soothe you into a comfortable distraction and like the gambas you'll find, she's a risk you should heed caution. She didn't earn the title of Siren of the Bars for nothing.",
    tags: ['Siren', 'Alcoholic Roleplay', 'Nightlife', 'Dancer'],
    likes: 'Conversations, dancing, seeing a smile curl the lips of all she meets.',
    image: ['images/Screenshot_2025-12-09_081544.png'],
    imagePosition: 'center 30%'
  },
  {
    id: 'siilica',
    name: 'Siilica',
    role: 'Hype',
    roleLabel: 'Hype',
    tags: ['Hype', 'Nightlife'],
    image: ['images/image.png'],
    imagePosition: '50% 30%'
  },
  {
    id: 'lucinda',
    name: 'Lucinda Court',
    role: 'Courtesan / Dancer',
    roleLabel: 'Courtesan',
    pronouns: 'She/Her',
    bio: "Hi, I'm Luci! I've been venue-hopping and sometimes raiding on this game for five years now. I really love making characters and meeting new friends. Don't be afraid to shoot me a tell if there's anything I can do to make your night better.",
    tags: ['Courtesan', 'Dancer', 'Social'],
    image: ['images/LucindaCourt2.png'],
    imagePosition: 'center 12%'
  },
  {
    id: 'rayla',
    name: 'Rayla Elakna',
    role: 'Courtesan / Dancer',
    roleLabel: 'Courtesan',
    pronouns: 'She/Her',
    bio: "Ello Lovelies, this is your Captain speaking (; I have my own Sky Crew of Privateers when I am away from the clubs. So long as I am helping people enjoy themselves and have fun then I am happy. I'm pretty sassy, fairly outgoing, and love drinking rum.",
    tags: ['Sky Captain', 'Roleplay', 'Nightlife', 'Bratty/Sassy', 'Courtesan'],
    link: 'https://raylaelakna.carrd.co/',
    image: ['images/Raylapic2.png'],
    imagePosition: 'center 55%'
  },
  {
    id: 'mouse-suzuki',
    name: 'Mouse Suzuki',
    role: 'Dancer / Courtesan',
    roleLabel: 'Courtesan',
    bio: 'Velvet-soft steps, precise lines, and a court smile that keeps the floor coming back for more.',
    tags: ['Dancer', 'Courtesan', 'Stage Performer'],
    image: ['images/Mouse.png'],
    imagePosition: '50% 8%'
  },
  {
    id: 'nyxi',
    name: 'Nyxi Cinnabelle',
    role: 'Courtesan',
    roleLabel: 'Courtesan',
    pronouns: 'She/Her',
    bio: 'Dark, direct, and mirror-sharp Nyxi moves with sinful intent, offering conversation, dancing, and indulgent company for those willing to pay the price.',
    tags: ['Courtesan', 'Dark', 'Direct', 'Para', 'Mirror', 'Sinful', 'Demisexual', 'Submissive', 'Switch'],
    sexuality: 'Heterosexual',
    likes: 'Sins, conversations, dancing, seeing a smile curl the lips of all she meets.',
    image: ['images/Nexi.png'],
    imagePosition: 'center 22%'
  },
  {
    id: 'magnum-chan',
    name: 'Magnum Chan',
    role: 'Courtesan',
    roleLabel: 'Courtesan',
    pronouns: 'He/Him',
    tags: ['Courtesan'],
    image: ['images/Magnum.webp'],
    imagePosition: '50% 25%'
  }
];

const OWNERS = [
  {
    id: 'ennoch',
    name: 'Ennoch',
    role: 'Owner',
    roleLabel: 'Owner',
    bio: 'Owner',
    tags: ['Owner'],
    image: ['images/Ennoch.png'],
    imagePosition: 'center 45%'
  },
  {
    id: 'kiera',
    name: 'Kiera Virelle',
    role: 'DJ Booking Manager',
    roleLabel: 'DJ Booking Manager',
    pronouns: 'She/Her',
    bio: 'Bass is my love language. Crowds are my canvas. And the right DJ? My favorite temptation. If your music can command bodies and your presence can hold a room hostage - you already have my attention.',
    tags: ['Management', 'Sassy AF', 'Bass addict', 'Crowd alchemist', 'Nightlife ops'],
    image: ['images/Kierayooo.png'],
    imagePosition: 'center 45%'
  }
];

const ALL_ENTRIES = [...STAFF, ...OWNERS];
const ENTRY_MAP = new Map(ALL_ENTRIES.map(entry => [entry.id, entry]));

function allowEntry() {
  localStorage.setItem(AGE_KEY, 'true');
  if (ageGate) {
    ageGate.style.display = 'none';
  }
  showEntryLoader();
}

function initAgeGate() {
  if (!ageGate || !ageYes) return;
  if (localStorage.getItem(AGE_KEY) === 'true') {
    ageGate.style.display = 'none';
    return;
  }
  ageYes.addEventListener('click', allowEntry);
}

function setActiveNav() {
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.dataset.page === currentPage);
  });
}

function initOniParallax() {
  if (!oniMask) return;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('pointermove', evt => {
    const { innerWidth, innerHeight } = window;
    targetX = (evt.clientX / innerWidth - 0.5) * 16;
    targetY = (evt.clientY / innerHeight - 0.5) * 12;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    oniMask.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
    requestAnimationFrame(animate);
  }
  animate();
}

function initStaffProfile() {
  if (!modal) return;

  const getImage = (entry) => {
    if (!entry || !entry.image) return null;
    return Array.isArray(entry.image) ? entry.image[0] : entry.image;
  };

  const getImagePosition = (entry, fallback = 'center 20%') => {
    if (!entry) return fallback;
    return entry.imagePosition || fallback;
  };

  const renderWall = (wallEl, entries) => {
    if (!wallEl || !entries) return;
    wallEl.innerHTML = '';
    entries.forEach((entry, idx) => {
      const slice = document.createElement('div');
      slice.className = 'slice';
      slice.dataset.staffId = entry.id || `staff-${idx}`;
      const img = getImage(entry);
      if (img) slice.style.setProperty('--img', `url('../${img}')`);
      const imgPos = getImagePosition(entry, 'center center');
      if (imgPos) slice.style.setProperty('--img-pos', imgPos);
      const label = document.createElement('span');
      label.className = 'slice__label';
      const name = entry.name || 'Staff';
      const roleText = entry.roleLabel || entry.role || 'Staff';
      const role = roleText ? roleText : '';
      label.innerHTML = `<span class="slice__name">${name}</span>${role ? `<span class="slice__role">${role}</span>` : ''}`;
      slice.appendChild(label);
      wallEl.appendChild(slice);
    });
  };

  const renderProfile = (entry) => {
    profileName.textContent = entry.name || 'Unknown';
    profileRole.textContent = entry.role || 'Staff';
    profilePronouns.textContent = entry.pronouns || '--';
    profileBio.textContent = entry.bio || entry.desc || 'A member of the Oni crew.';
    if (profileSexuality && sexualityRow) {
      const hasSex = entry.sexuality && entry.sexuality.trim() !== '';
      sexualityRow.style.display = hasSex ? 'inline-flex' : 'none';
      profileSexuality.textContent = hasSex ? entry.sexuality : '';
    }
    if (likesRow && profileLikes) {
      const hasLikes = entry.likes && entry.likes.trim() !== '';
      likesRow.style.display = hasLikes ? 'block' : 'none';
      profileLikes.textContent = hasLikes ? entry.likes : '';
    }
    if (dislikesRow && profileDislikes) {
      const hasDislikes = entry.dislikes && entry.dislikes.trim() !== '';
      dislikesRow.style.display = hasDislikes ? 'block' : 'none';
      profileDislikes.textContent = hasDislikes ? entry.dislikes : '';
    }
    if (linkRow && profileLink) {
      const hasLink = entry.link && entry.link.trim() !== '';
      linkRow.style.display = hasLink ? 'block' : 'none';
      if (hasLink) {
        profileLink.href = entry.link;
        profileLink.textContent = 'Portfolio / Socials';
      }
    }

    profileTags.innerHTML = '';
    (entry.tags || (entry.role ? [entry.role] : [])).forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      profileTags.appendChild(span);
    });

    const img = getImage(entry);
    if (img) {
      profileMedia.style.setProperty('--img', `url('${img}')`);
      profileMedia.style.backgroundImage = `linear-gradient(rgba(5,1,4,0.08), rgba(5,1,4,0.08)), url('${img}')`;
      profileMedia.style.backgroundPosition = getImagePosition(entry, 'center 20%');
    } else {
      profileMedia.style.removeProperty('--img');
      profileMedia.style.backgroundImage = '';
      profileMedia.style.removeProperty('background-position');
    }

    modal.classList.add('is-open');
  };

  const attachWallClick = (wallEl) => {
    if (!wallEl) return;
    wallEl.addEventListener('click', evt => {
      const slice = evt.target.closest('.slice');
      if (!slice) return;
      const id = slice.dataset.staffId;
      const entry = ENTRY_MAP.get(id);
      if (entry) {
        pingChipLoader();
        renderProfile(entry);
      }
    });
  };

  modal.addEventListener('click', evt => {
    if (evt.target === modal) {
      modal.classList.remove('is-open');
    }
  });
  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('is-open'));
  }
  if (profileCloseBtn) {
    profileCloseBtn.addEventListener('click', () => modal.classList.remove('is-open'));
  }

  renderWall(sliceWall, STAFF);
  renderWall(ownerWall, OWNERS);
  attachWallClick(sliceWall);
  attachWallClick(ownerWall);
}

document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  setActiveNav();
  initOniParallax();
  initStaffProfile();
});
