// Main Banner
const banner = document.querySelector("#s1");
const track = document.querySelector(".banner-track");
const dots = document.querySelectorAll(".banner-indicator button");

if (banner && track && dots.length > 0) {
  let currentIndex = 0;
  let isAnimating = false;
  const maxIndex = dots.length - 1;

  function updateBanner(index) {
    currentIndex = index;
    const bannerWidth = banner.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * bannerWidth}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function wheelLock() {
    isAnimating = true;

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  function startAutoPlay() {
    return setInterval(() => {
      const nextIndex =
        currentIndex >= maxIndex
          ? 0
          : currentIndex + 1;

      updateBanner(nextIndex);
    }, 4000); // 4초마다 변경
  }

  let autoPlay = startAutoPlay();

  function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = startAutoPlay();
  }

  banner.addEventListener("wheel", (e) => {
    if (isAnimating) return;

    const down = e.deltaY > 0;
    const up = e.deltaY < 0;

    if (down && currentIndex < maxIndex) {
      e.preventDefault();
      updateBanner(currentIndex + 1);
      wheelLock();
      resetAutoPlay();
    }

    if (up && currentIndex > 0) {
      e.preventDefault();
      updateBanner(currentIndex - 1);
      wheelLock();
      resetAutoPlay();
    }
  }, { passive: false });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);

      updateBanner(index);
      resetAutoPlay();
    });
  });

  // 마우스 올리면 일시정지
  banner.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

  // 마우스 나가면 다시 시작
  banner.addEventListener("mouseleave", () => {
    autoPlay = startAutoPlay();
  });
}

//Scroll Animation
const s3 = document.querySelector("#s3");
const fills = document.querySelectorAll(".fill");

if (s3 && fills.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        fills.forEach((fill) => {
          const width = fill.dataset.width;
          fill.style.width = entry.isIntersecting ? width + "%" : "0";
        });
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(s3);
}

//card
const tabBtns = document.querySelectorAll(".tab-btn");
const petMarquees = document.querySelectorAll(".pet-marquee");
const petTracks = document.querySelectorAll(".pet-track");

if (tabBtns.length > 0 && petMarquees.length > 0 && petTracks.length > 0) {
  petTracks.forEach((track) => {
    track.innerHTML += track.innerHTML;
  });
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.pet;

      tabBtns.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");

      petMarquees.forEach((marquee) => {
        marquee.classList.remove("active");

        if (marquee.id === target) {
          marquee.classList.add("active");
        }
      });

      // 아이콘 변경
      const dogIcon = document.querySelector('[data-pet="dog"] img');
      const catIcon = document.querySelector('[data-pet="cat"] img');

      if(target === 'dog'){
        dogIcon.src = 'image/bone_c.png';
        catIcon.src = 'image/fish_g.png';
      }else{
        dogIcon.src = 'image/bone_g.png';
        catIcon.src = 'image/fish_c.png';
      }
    });
  });
}
//Review
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.review-track');
  const cards = Array.from(track.querySelectorAll('.review-card'));

  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });
});

// Modal
// Modal
const openModal = document.querySelector("#openModal");
const closeModal = document.querySelector("#closeModal");
const reserveModal = document.querySelector("#reserveModal");
const reserveForm = document.querySelector("#reserveForm");
const toastSuccess = document.querySelector("#toastSuccess");
const modalClose = document.querySelector("#modalClose");

function openReserveModal(e) {
  e.preventDefault();

  reserveModal.classList.add("active");
  document.documentElement.classList.add("modal-open");
}

function closeReserveModal() {
  reserveModal.classList.remove("active");
  document.documentElement.classList.remove("modal-open");
}

if (openModal && reserveModal) {
  openModal.addEventListener("click", openReserveModal);
}

if (closeModal && reserveModal) {
  closeModal.addEventListener("click", closeReserveModal);
}

if (reserveModal) {
  reserveModal.addEventListener("click", (e) => {
    if (e.target === reserveModal) {
      closeReserveModal();
    }
  });
}

if (reserveForm && toastSuccess) {
  reserveForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const textInputs = reserveForm.querySelectorAll('input[type="text"]');

    const data = {
      name: textInputs[0]?.value,
      phone: reserveForm.querySelector('input[type="tel"]')?.value,
      purpose: reserveForm.querySelector('input[name="purpose"]:checked')?.value,
      breed: textInputs[1]?.value,
      branch: textInputs[2]?.value,
      message: reserveForm.querySelector("textarea")?.value,
      visit_date: reserveForm.querySelector('input[type="date"]')?.value || null
    };

    const { error } = await supabaseClient
      .from("visit_reservations")
      .insert([data]);

    if (error) {
      alert("방문예약 저장 중 오류가 발생했습니다.");
      console.error(error);
      return;
    }

    reserveModal.classList.remove("active");
    toastSuccess.classList.add("show");

    reserveForm.reset();
  });
}

if (modalClose && toastSuccess) {
  modalClose.addEventListener("click", () => {
    toastSuccess.classList.remove("show");
    document.documentElement.classList.remove("modal-open");
  });
}

// s2 스크롤 페이드업
const s2Text = document.querySelector(".s2-text");
const s2Video = document.querySelector(".s2-video-wrap");

if (s2Text && s2Video) {
  const s2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        s2Observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  s2Observer.observe(s2Text);
  s2Observer.observe(s2Video);
}