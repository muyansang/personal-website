// Description: 语言切换脚本 --------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  const defaultLang = "english";
  const langMap = {
    english: "text/en.json",
    chinese: "text/cn.json",
    cantonese: "text/tw.json"
  };

  // 初始化语言
  updateLanguageUI(defaultLang);
  loadLanguage(defaultLang);

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

// Language switcher --------------------------------------------------------------------------------------------------------------------------------------------------