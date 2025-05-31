// Description: 语言切换脚本 --------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  // 初始化默认语言状态
  const defaultLang = "english";
  updateLanguageUI(defaultLang);

  // 点击语言按钮，切换菜单显隐 + active类
  $("#language_button").click(function () {
    const $menu = $("#language_menu");

    $menu.slideToggle(200, function () {
      $menu.toggleClass("active");
    });
  });

  // 点击语言项
  $(".language_item").click(function () {
    const lang = $(this).attr("data-lang");
    updateLanguageUI(lang);

  });

  // 封装语言切换 UI 更新逻辑
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
