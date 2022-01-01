$(document).ready(function () {
  $("#profile_ripple").ripples({
    resolution: 512,
    dropRadius: 10,
  });
  const bars = document.querySelectorAll(".progress_bar");
  bars.forEach(function (bar) {
    let percentage = bar.dataset.percent;
    let tooltip = bar.children[0];
    tooltip.innerText = percentage + "%";
    bar.style.width = percentage + "%";
    // console.log(percentage);
  });

  //counter
  const counters = document.querySelectorAll(".counter");
  //

  function runcounter() {
    counters.forEach((counter) => {
      counter.innerText = 0;

      let target = counter.dataset.count;
      let step = target / 100; //for same time animation

      let countIT = function () {
        let displayedCount = +counter.innerText;
        // + for making string integer
        if (displayedCount < target) {
          counter.innerText = Math.ceil(displayedCount + step);
          // console.log(displayedCount);
          setTimeout(countIT, 1); //this will make ineterval of 1 mili second ,othewise we downt see any affect
          // countIT();
        } else {
          counter.innerText = target;
        }
      };
      countIT();
    });
  }
  // runcounter()

  let counterSection = document.querySelector(".counter_section");

  let options = {
    rootMargin: "0px 0px -200px 0px", //kon pixel theke counter cholbe
  };
  let done = 0;
  //IntersectionObserver eta js er function jetay function(),ar options 2ta object input deya ache
  const sectionObserver = new IntersectionObserver(function (entries) {
    //new object create kora

    if (entries[0].isIntersecting && done !== 1) {
      done = 1; //bar bar jate scroll e count na hoy
      runcounter();
    }
  }, options);

  sectionObserver.observe(counterSection); //sectionObserver object observe korbe counter_section ke

  //image filter

  var $wrapper = $(".portfolo_wrapper");

  // // isotope js has been used for image fiter option

  // //initialize isotope

  $wrapper.isotope({
    filter: "*",
    layoutMode: "masonry",
    AnimationOption: {
      duration: 750,
      easing: "linear",
    },
  });

  let links = document.querySelectorAll(".tabs a");
  // console.log(links);

  links.forEach((link) => {
    let selector = link.dataset.filter;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      // console.log("something");

      $wrapper.isotope({
        filter: selector,
        layoutMode: "masonry",
        AnimationOption: {
          duration: 750,
          easing: "linear",
        }
      });
      links.forEach(link =>{
        link.classList.remove('active');
        //this will delete active class to the no active
      })
      e.target.classList.add('active');
      // this will add color to the clicked tab
    });
  })


  //magnify popup
  $('.magnify').magnificPopup({
    type: 'image',
    gallery : {
      enabled :true
    },
    zoom : {
      enable : true
    }
  });
});
