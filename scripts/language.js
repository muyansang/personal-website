// Description: 语言切换脚本 --------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {

  const langMap = {
    english: "text/en.json",
    chinese: "text/cn.json",
    cantonese: "text/tw.json"
  };

  // ✅ 获取 localStorage 中存储的语言（如果没有就用默认）
  const storedLang = localStorage.getItem("selectedLanguage") || "english";

  // ✅ 初始化语言
  updateLanguageUI(storedLang);
  loadLanguage(storedLang);

  let magnifierActivated = false;

  $("#myimage").on("mouseenter", function () {
    if (!magnifierActivated) {
      magnify("myimage", 3); // 你自定义的 magnify 函数
      magnifierActivated = true;
    }
  });

  let isMagnifierActive = false;
  let glassRef = null;

  $("#myimage").on("click", function () {
    if (!glassRef) {
      // 首次点击，创建放大镜
      magnify("myimage", 2);
      isMagnifierActive = true;
      return;
    }

    // 已经存在放大镜时，切换 display 状态
    isMagnifierActive = !isMagnifierActive;
    if (isMagnifierActive) {
      glassRef.style.display = "block";
    } else {
      glassRef.style.display = "none";
    }
  });



  // 点击语言按钮展开/收起菜单
  $("#language_button").click(function () {
    const $menu = $("#language_menu");
    $menu.slideToggle(200, function () {
      $menu.toggleClass("active");
    });
  });

  // 点击语言项切换语言
  $(".language_item").click(function () {
    const lang = $(this).data("lang");
    localStorage.setItem("selectedLanguage", lang); 

    updateLanguageUI(lang);  
    loadLanguage(lang);

    const $menu = $("#language_menu");
    $menu.slideUp(200, function () {
      $menu.removeClass("active");
    });
  });


  // 切换语言 UI 状态（选中、高亮、打钩）
  function updateLanguageUI(lang) {
    $(".language_item").removeClass("selected");
    $(`.language_item[data-lang="${lang}"]`).addClass("selected");

    $(".selected_list li").each(function () {
      if ($(this).hasClass(`${lang}_selected`)) {
        $(this).removeClass("hidden_text");
      } else {
        $(this).addClass("hidden_text");
      }
    });
  }


  // 加载 JSON 文件并更新页面文字
  function loadLanguage(langKey) {
    const langFile = langMap[langKey];
    $.getJSON(langFile, function (data) {
      $("[data-i18n]").each(function () {
        const keys = $(this).data("i18n").split(".");
        let text = data;
        for (let k of keys) {
          text = text?.[k];
        }

        if (text !== undefined) {
          if ($(this).is("input, textarea")) {
            $(this).attr("placeholder", text);
          } else {
            $(this).text(text);
          }
        }
      });
    });
  }

  // 页面滚动逻辑
  $("#portfolio_button").click(function () {
    $("html, body").animate({
      scrollTop: $("#portfolio").offset().top
    }, 500);
  });

  $("#about_button").click(function () {
    $("html, body").animate({
      scrollTop: $("#about_me").offset().top
    }, 500);
  });

  $("#contact_button").click(function () {
    $("html, body").animate({
      scrollTop: $("#footer").offset().top
    }, 500);
  });
});

// Description: 语言切换脚本 --------------------------------------------------------------------------------------------------------------------------------------------

// Description: Scroll Session --------------------------------------------------------------------------------------------------------------------------------------------

$("#portfolio_button").click(function () {
  $("html, body").animate({
    scrollTop: $("#portfolio").offset().top
  }, 500);
});

$("#about_button").click(function () {
  $("html, body").animate({
    scrollTop: $("#about_me").offset().top
  }, 500);
});

$("#contact_button").click(function () {
  $("html, body").animate({
    scrollTop: $("#footer").offset().top
  }, 500);
});


// Description: Scroll Session --------------------------------------------------------------------------------------------------------------------------------------------

// Game Specific --------------------------------------------------------------------------------------------------------------------------------------------------

// 图片放大
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glassRef = glass; // 保存引用用于 toggle
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}