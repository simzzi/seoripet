
//side tab
function setSubMenuActive() {
  const currentPage = window.location.pathname.split("/").pop();
  const subBtns = document.querySelectorAll(".sub-btn");

  subBtns.forEach(function (btn) {
    btn.classList.remove("active");
    const href = btn.getAttribute("href");
    if (href === currentPage) {
      btn.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", setSubMenuActive);

/* About us */
/* ==============================
about-us 스크롤업
============================== */
document.addEventListener("DOMContentLoaded", function () {
  const scrollFadeItems = document.querySelectorAll(".scroll-fade");

  if (scrollFadeItems.length > 0) {
    const cabinetObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: "0px 0px -50px 0px"
    });

    scrollFadeItems.forEach(function (item) {
      cabinetObserver.observe(item);
    });
  }
});


/* Visit us */
document.addEventListener("DOMContentLoaded", function () {
  const visitModal = document.getElementById("visitReserveModal");
  const visitCloseBtn = document.getElementById("closeVisitModal");
  const visitForm = document.getElementById("visitReserveForm");
  const visitToast = document.getElementById("visitToastSuccess");
  const openBtns = document.querySelectorAll(".open-visit-modal");

  if (!visitModal) return; // visit-us.html이 아닌 페이지에선 실행 안 함

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      visitModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (visitCloseBtn) {
    visitCloseBtn.addEventListener("click", () => {
      visitModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  visitModal.addEventListener("click", (e) => {
    if (e.target === visitModal) {
      visitModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  if (visitForm) {
    visitForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const textInputs = visitForm.querySelectorAll('input[type="text"]');

      const data = {
        name: textInputs[0]?.value,
        phone: visitForm.querySelector('input[type="tel"]')?.value,
        purpose: visitForm.querySelector('input[name="purpose"]:checked')?.value,
        breed: textInputs[1]?.value,
        branch: textInputs[2]?.value,
        message: visitForm.querySelector("textarea")?.value,
        visit_date: visitForm.querySelector('input[type="date"]')?.value || null
      };

      const { error } = await supabaseClient
        .from("visit_reservations")
        .insert([data]);

      if (error) {
        alert("방문예약 저장 중 오류가 발생했습니다.");
        console.error(error);
        return;
      }

      visitModal.classList.remove("active");
      document.body.style.overflow = "";

      if (visitToast) {
        visitToast.classList.add("show");
      }
      if (modalClose && visitToast) {
        modalClose.addEventListener("click", function () {
          visitToast.classList.remove("show");
          document.body.style.overflow = "";

          setTimeout(function () {
            location.reload();
          }, 300);
        });
      }

      visitForm.reset();
    });
  }
});


/* Adopt-dog */
const tabBtns = document.querySelectorAll('.adopt-tab-btn');
const petContents = document.querySelectorAll('.adopt-pet');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.pet;

    // active 제거
    tabBtns.forEach(tab => tab.classList.remove('active'));
    petContents.forEach(content => {
      content.classList.remove('active');
    });

    // active 추가
    btn.classList.add('active');
    document.getElementById(target)
      .classList.add('active');

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

/* Adopt modal */
document.addEventListener("DOMContentLoaded", function () {
  const adoptModal = document.getElementById("adoptModal");
  const adoptCloseBtn = document.getElementById("adoptCloseBtn");
  const applyBtns = document.querySelectorAll(".apply-btn");
  const adoptForm = document.querySelector(".adopt-form");

  const adoptSuccessModal = document.getElementById("adoptSuccessModal");
  const adoptSuccessClose = document.getElementById("adoptSuccessClose");

  if (!adoptModal) return;

  applyBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      adoptModal.classList.add("active");
      document.documentElement.classList.add("modal-open");
    });
  });

  if (adoptCloseBtn) {
    adoptCloseBtn.addEventListener("click", function () {
      adoptModal.classList.remove("active");
      document.documentElement.classList.remove("modal-open");
    });
  }

  adoptModal.addEventListener("click", function (e) {
    if (e.target === adoptModal) {
      adoptModal.classList.remove("active");
      document.documentElement.classList.remove("modal-open");
    }
  });

  if (adoptForm) {
    adoptForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const textInputs = adoptForm.querySelectorAll('input[type="text"]');
      const selectedType = adoptForm.querySelector('input[name="adoptType"]:checked');

      const data = {
        name: textInputs[0]?.value,
        phone: adoptForm.querySelector('input[type="tel"]')?.value,
        adopt_type: selectedType?.value,
        breed: textInputs[1]?.value,
        branch: textInputs[2]?.value,
        message: adoptForm.querySelector("textarea")?.value,
        visit_date: adoptForm.querySelector(".date-input")?.value || null
      };

      const { error } = await supabaseClient
        .from("adopt_applications")
        .insert([data]);

      if (error) {
        alert("입양 신청 저장 중 오류가 발생했습니다.");
        console.error(error);
        return;
      }

      adoptModal.classList.remove("active");

      if (adoptSuccessModal) {
        adoptSuccessModal.classList.add("show");
      }

      adoptForm.reset();
    });
  }

  if (adoptSuccessClose && adoptSuccessModal) {
    adoptSuccessClose.addEventListener("click", function () {
      adoptSuccessModal.classList.remove("show");
      document.documentElement.classList.remove("modal-open");
    });
  }

  if (adoptSuccessModal) {
    adoptSuccessModal.addEventListener("click", function (e) {
      if (e.target === adoptSuccessModal) {
        adoptSuccessModal.classList.remove("show");
        document.documentElement.classList.remove("modal-open");
      }
    });
  }
});
//Adopt-process
/* Adopt Process - 상단 아이콘 glow 순차 이동 */
document.addEventListener("DOMContentLoaded", function () {
  const processItems = document.querySelectorAll(".process-item");

  if (!processItems.length) return;

  let currentIndex = 0;

  // 초기화
  processItems.forEach(function (item) {
    item.classList.remove("active-glow");
  });

  // 첫번째 활성화
  processItems[currentIndex].classList.add("active-glow");

  setInterval(function () {

    // 이전 glow 제거
    processItems[currentIndex].classList.remove("active-glow");

    // 다음 index
    currentIndex++;

    if (currentIndex >= processItems.length) {
      currentIndex = 0;
    }

    // 다음 glow 추가
    processItems[currentIndex].classList.add("active-glow");

  }, 700);
});


/* Adopt Process - 스크롤 슬라이드인 */
document.addEventListener("DOMContentLoaded", function () {
  const slideItems = document.querySelectorAll(".slide-item");

  if (!slideItems.length) return;

  const slideObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -60px 0px"
  });

  slideItems.forEach(function (item) {
    slideObserver.observe(item);
  });
});

//side tab
function setSubMenuActive() {
  const currentPage = window.location.pathname.split("/").pop();
  const subBtns = document.querySelectorAll(".sub-btn");

  subBtns.forEach(function (btn) {
    btn.classList.remove("active");
    const href = btn.getAttribute("href");
    if (href === currentPage) {
      btn.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", setSubMenuActive);

/* Donate-info */
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".donation-tab");
  const panels = document.querySelectorAll(".donation-panel");

  const formWrap = document.getElementById("donationFormWrap");
  const formTitle = document.getElementById("formTitle");
  const donationType = document.getElementById("donationType");

  const amountRadios = document.querySelectorAll("input[name='amount']");
  const customAmountRadio = document.getElementById("customAmountRadio");
  const customAmount = document.getElementById("customAmount");

  const donationForm = document.getElementById("donationForm");
  const donationModal = document.getElementById("donationModal");
  const modalClose = document.getElementById("modalClose");

  if (!tabs.length || !panels.length) return;

  function animateDonationBar(panel) {
    const bar = panel.querySelector(".donation-progress-bar span");

    if (!bar) return;

    const width = bar.dataset.width;

    bar.style.width = "0";

    setTimeout(function () {
      bar.style.width = width;
    }, 50);
  }

  function moveDonationFormMobile(btn) {
    if (!formWrap) return;

    const originalParent = document.getElementById("donation-content");
    const panel = btn.closest(".donation-panel");

    if (!originalParent) return;

    if (window.innerWidth <= 767 && panel) {
      panel.after(formWrap);
    } else {
      originalParent.appendChild(formWrap);
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetId = tab.dataset.target;

      tabs.forEach(function (item) {
        item.classList.remove("active");
      });

      panels.forEach(function (panel) {
        panel.classList.remove("active");
      });

      tab.classList.add("active");

      const targetPanel = document.getElementById(targetId);

      if (targetPanel) {
        targetPanel.classList.add("active");
        animateDonationBar(targetPanel);
      }

      if (formWrap) {
        formWrap.classList.remove("open");
      }
    });
  });

  setTimeout(function () {
    const activePanel = document.querySelector(".donation-panel.active");

    if (activePanel) {
      animateDonationBar(activePanel);
    }
  }, 100);
  // 모바일: 각 후원 패널이 화면에 들어오면 bar 애니메이션 실행
  if (window.innerWidth <= 450) {
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateDonationBar(entry.target);
        }
      });
    }, {
      threshold: 0.4
    });

    panels.forEach(function (panel) {
      barObserver.observe(panel);
    });
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".open-form-btn");

    if (!btn) return;

    const title = btn.dataset.title || "후원";

    if (formTitle) {
      formTitle.textContent = title + " 후원 신청";
    }

    if (donationType) {
      donationType.value = title;
    }

    if (formWrap) {
      moveDonationFormMobile(btn);

      formWrap.classList.add("open");

      setTimeout(function () {
        formWrap.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 200);
    }
  });

  window.addEventListener("resize", function () {
    const originalParent = document.getElementById("donation-content");

    if (!formWrap || !originalParent) return;

    if (window.innerWidth > 767) {
      originalParent.appendChild(formWrap);
    }
  });

  if (amountRadios.length && customAmountRadio && customAmount) {
    amountRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (customAmountRadio.checked) {
          customAmount.classList.add("show");
          customAmount.setAttribute("required", "required");
        } else {
          customAmount.classList.remove("show");
          customAmount.removeAttribute("required");
          customAmount.value = "";
        }
      });
    });
  }

  if (donationForm && donationModal) {
    donationForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const selectedAmount = donationForm.querySelector('input[name="amount"]:checked');

      let amount = 0;

      if (selectedAmount?.value === "custom") {
        amount = Number(customAmount.value);
      } else {
        amount = Number(selectedAmount?.value);
      }

      if (!amount || amount <= 0) {
        alert("후원 금액을 입력해주세요.");
        return;
      }

      const data = {
        donation_type: donationType?.value,
        name: document.getElementById("userName")?.value,
        phone: document.getElementById("userPhone")?.value,
        email: document.getElementById("userEmail")?.value,
        amount: amount,
        message: document.getElementById("donate-message")?.value
      };

      const { error } = await supabaseClient
        .from("donations")
        .insert([data]);

      if (error) {
        alert("후원 신청 저장 중 오류가 발생했습니다.");
        console.error(error);
        return;
      }

      donationModal.classList.add("show");
      document.body.style.overflow = "hidden";

      donationForm.reset();

      if (customAmount) {
        customAmount.classList.remove("show");
        customAmount.removeAttribute("required");
      }
    });
  }

  if (modalClose && donationModal) {
    modalClose.addEventListener("click", function () {
      donationModal.classList.remove("show");
      document.body.style.overflow = "";

      setTimeout(function () {
        location.reload();
      }, 300);
    });
  }

  if (donationModal) {
    donationModal.addEventListener("click", function (e) {
      if (e.target === donationModal) {
        donationModal.classList.remove("show");
        document.body.style.overflow = "";

        setTimeout(function () {
          location.reload();
        }, 300);
      }
    });
  }
});


/* Imfact-report */
document.addEventListener("DOMContentLoaded", function () {
  const reportCard = document.querySelector(".report-card");
  const scrollItems = document.querySelectorAll(".scroll-ani, .chart-wrap");
  const progressBars = document.querySelectorAll(".bar span");

  progressBars.forEach(function (bar) {
    bar.style.setProperty("--w", bar.dataset.width);
  });
  
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (reportCard) {
          reportCard.classList.add("active");
        }
      } else {
        entry.target.classList.remove("active");

        if (reportCard) {
          reportCard.classList.remove("active");
        }
      }
    });
  }, {
    threshold: 0.2
  });

  scrollItems.forEach(function (item) {
    observer.observe(item);
  });
});
/* Volunteer */
document.addEventListener("DOMContentLoaded", function () {
  const datesEl = document.getElementById("dates");
  const vCalender = document.getElementById("vCalender");
  const selectedDate = document.getElementById("selectedDate");
  const scheduleCount = document.getElementById("scheduleCount");
  const scheduleContent = document.getElementById("scheduleContent");
  const monthTitle = document.getElementById("monthTitle");
  const prevMonth = document.getElementById("prevMonth");
  const nextMonth = document.getElementById("nextMonth");

  const applyModal = document.getElementById("applyModal");
  const closeModal = document.getElementById("closeModal");
  const modalDate = document.getElementById("modalDate");
  const modalTitle = document.getElementById("modalTitle");

  const volunteerApplyForm = document.getElementById("volunteerApplyForm");
  const applyDate = document.getElementById("applyDate");
  const applyTitle = document.getElementById("applyTitle");
  const applyTime = document.getElementById("applyTime");
  const applicantName = document.getElementById("applicantName");
  const applicantPhone = document.getElementById("applicantPhone");

  const volunteerSuccessModal = document.getElementById("volunteerSuccessModal");
  const volunteerSuccessClose = document.getElementById("volunteerSuccessClose");

  if (!datesEl) return;

  let currentYear = 2026;
  let currentMonth = 5;

  const weekNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const scheduleData = {
    "2026-06-14": [
      {
        type: "green-line",
        icon: "☀️",
        title: "오전 봉사활동",
        time: "08:00 - 12:00",
        desc: "강아지 산책 보조 / 견사 청소",
        people: 15,
        apply: 5
      },
      {
        type: "orange-line",
        icon: "🌤️",
        title: "오후 봉사활동",
        time: "13:00 - 17:00",
        desc: "고양이 케어 / 미용 보조",
        people: 10,
        apply: 3
      }
    ],
    "2026-06-27": [
      {
        type: "green-line",
        icon: "☀️",
        title: "오전 봉사활동",
        time: "08:00 - 14:00",
        desc: "보호소 환경정리 : 실내 청소 및 사료 정리",
        people: 10,
        apply: 3
      }
    ]
  };

  function getDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function renderCalendar(year, month) {
    datesEl.innerHTML = "";

    if (monthTitle) {
      monthTitle.textContent = `${year}년 ${month + 1}월`;
    }

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("button");
      empty.className = "date disabled no-status";
      datesEl.appendChild(empty);
    }

    for (let day = 1; day <= lastDate; day++) {
      const btn = document.createElement("button");
      const dayOfWeek = new Date(year, month, day).getDay();
      const dateKey = getDateKey(year, month, day);

      btn.className = "date";
      btn.textContent = day;

      if (dayOfWeek === 0) btn.classList.add("sun");
      if (dayOfWeek === 6) btn.classList.add("sat");
      if (scheduleData[dateKey]) btn.classList.add("available");

      btn.addEventListener("click", function () {
        document.querySelectorAll(".date").forEach(date => {
          date.classList.remove("selected");
        });

        btn.classList.add("selected");

        if (vCalender) {
          vCalender.classList.add("active");
        }

        if (selectedDate) {
          selectedDate.textContent = `${month + 1}월 ${day}일 ${weekNames[dayOfWeek]}`;
        }

        renderSchedule(dateKey);
      });

      datesEl.appendChild(btn);
    }
  }

  function renderSchedule(dateKey) {
    const schedules = scheduleData[dateKey];

    if (!scheduleCount || !scheduleContent) return;

    if (!schedules) {
      scheduleCount.textContent = "총 0건의 일정";

      scheduleContent.innerHTML = `
        <div class="empty-schedule">
          등록된 일정이 없습니다.
        </div>
      `;

      return;
    }

    scheduleCount.textContent = `총 ${schedules.length}건의 일정`;

    scheduleContent.innerHTML = schedules.map(item => `
      <div class="schedule-card ${item.type}">
        <div class="icon">${item.icon}</div>

        <div class="info">
          <strong>${item.title}</strong>
          <p>${item.time}</p>
          <p>${item.desc}</p>
          <small>
            모집인원 ${item.people}명 · 신청인원 ${item.apply}명
          </small>
        </div>

        <button
          type="button"
          class="volunteer-apply-btn"
          data-date="${dateKey}"
          data-title="${item.title}"
          data-time="${item.time}"
        >
          신청하기
        </button>
      </div>
    `).join("");
  }

  if (prevMonth) {
    prevMonth.addEventListener("click", function () {
      currentMonth--;

      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }

      if (vCalender) {
        vCalender.classList.remove("active");
      }

      renderCalendar(currentYear, currentMonth);
    });
  }

  if (nextMonth) {
    nextMonth.addEventListener("click", function () {
      currentMonth++;

      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }

      if (vCalender) {
        vCalender.classList.remove("active");
      }

      renderCalendar(currentYear, currentMonth);
    });
  }

  if (scheduleContent) {
    scheduleContent.addEventListener("click", function (e) {
      const btn = e.target.closest(".volunteer-apply-btn");
      if (!btn) return;

      if (modalDate) {
        modalDate.textContent = btn.dataset.date + " / " + btn.dataset.time;
      }

      if (modalTitle) {
        modalTitle.textContent = btn.dataset.title;
      }

      if (applyDate) applyDate.value = btn.dataset.date;
      if (applyTitle) applyTitle.value = btn.dataset.title;
      if (applyTime) applyTime.value = btn.dataset.time;

      if (applyModal) {
        applyModal.classList.add("show");
      }
    });
  }

  if (volunteerApplyForm) {
    volunteerApplyForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        apply_date: applyDate?.value,
        apply_title: applyTitle?.value,
        apply_time: applyTime?.value,
        name: applicantName?.value,
        phone: applicantPhone?.value
      };

      const { error } = await supabaseClient
        .from("volunteer_applications")
        .insert([data]);

      if (error) {
        alert("봉사활동 신청 저장 중 오류가 발생했습니다.");
        console.error(error);
        return;
      }

      volunteerApplyForm.reset();

      if (applyModal) {
        applyModal.classList.remove("show");
      }

      if (volunteerSuccessModal) {
        volunteerSuccessModal.classList.add("show");
      }
    });
  }

  if (closeModal && applyModal) {
    closeModal.addEventListener("click", function () {
      applyModal.classList.remove("show");
    });
  }

  if (applyModal) {
    applyModal.addEventListener("click", function (e) {
      if (e.target === applyModal) {
        applyModal.classList.remove("show");
      }
    });
  }

  if (volunteerSuccessClose && volunteerSuccessModal) {
    volunteerSuccessClose.addEventListener("click", function () {
      volunteerSuccessModal.classList.remove("show");
    });
  }

  if (volunteerSuccessModal) {
    volunteerSuccessModal.addEventListener("click", function (e) {
      if (e.target === volunteerSuccessModal) {
        volunteerSuccessModal.classList.remove("show");
      }
    });
  }

  renderCalendar(currentYear, currentMonth);
});

const noticeBox = document.querySelector('.volunteer-notice');

if (noticeBox) {
  window.addEventListener('scroll', () => {
    const noticeTop = noticeBox.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (noticeTop < windowHeight - 100) {
      noticeBox.classList.add('show');
    }
  });
}

/* Notice */
document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".notice-card");

  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      tabs.forEach(btn =>
        btn.classList.remove("active")
      );

      tab.classList.add("active");

      const category = tab.dataset.category;

      cards.forEach(card => {

        if (
          category === "all" ||
          card.dataset.category === category
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }

      });

    });

  });

});

const cards = document.querySelectorAll('.notice-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2
});

cards.forEach((card) => {
    observer.observe(card);
});

