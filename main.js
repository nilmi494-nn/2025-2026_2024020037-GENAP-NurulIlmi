/* =========================================================
   UNIVERSITAS HANDAYANI — main.js
   Seluruh interaksi menggunakan jQuery (sesuai ketentuan tugas)
   ========================================================= */
$(function () {

  /* ---------- 1. Highlight menu aktif berdasarkan URL ---------- */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  $(".nav-links a").each(function () {
    var href = $(this).attr("href");
    if (href === currentPage) {
      $(this).addClass("is-active");
    }
  });

  /* ---------- 2. Toggle menu mobile ---------- */
  $(".nav-toggle").on("click", function () {
    $(".nav-links").toggleClass("is-open");
  });
  $(".nav-links a").on("click", function () {
    $(".nav-links").removeClass("is-open");
  });

  /* ---------- 3. Header: efek scroll (bayangan saat discroll) ---------- */
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 12) {
      $(".site-header").css("box-shadow", "0 8px 24px -12px rgba(0,0,0,.5)");
    } else {
      $(".site-header").css("box-shadow", "none");
    }
  });

  /* ---------- 4. Filter Program Studi (halaman programs.html) ---------- */
  $(".filter-bar[data-filter-group='prodi'] .filter-btn").on("click", function () {
    var target = $(this).data("target");
    $(this).addClass("is-active").siblings().removeClass("is-active");

    $(".prodi-item").removeClass("is-visible");
    if (target === "semua") {
      $(".prodi-item").addClass("is-visible");
    } else {
      $(".prodi-item[data-fakultas='" + target + "']").addClass("is-visible");
    }
  });

  /* ---------- 5. Filter Berita & Acara (halaman news.html) ---------- */
  $(".filter-bar[data-filter-group='news'] .filter-btn").on("click", function () {
    var target = $(this).data("target");
    $(this).addClass("is-active").siblings().removeClass("is-active");

    $(".news-item").removeClass("is-visible");
    if (target === "semua") {
      $(".news-item").addClass("is-visible");
    } else {
      $(".news-item[data-kategori='" + target + "']").addClass("is-visible");
    }
  });

  /* ---------- 6. Tab Galeri (halaman gallery.html) ---------- */
  $(".gallery-tabs .filter-btn").on("click", function () {
    var target = $(this).data("target");
    $(this).addClass("is-active").siblings().removeClass("is-active");

    $(".gallery-item").removeClass("is-visible");
    if (target === "semua") {
      $(".gallery-item").addClass("is-visible");
    } else {
      $(".gallery-item[data-kategori='" + target + "']").addClass("is-visible");
    }
  });

  /* ---------- 7. Lightbox Galeri ---------- */
  $(document).on("click", ".gallery-item", function () {
    var caption = $(this).data("caption") || "Dokumentasi Universitas Handayani";
    $(".lightbox__caption").text(caption);
    $(".lightbox").addClass("is-open");
  });
  $(document).on("click", ".lightbox__close, .lightbox", function (e) {
    if (e.target === this) {
      $(".lightbox").removeClass("is-open");
    }
  });
  $(document).on("click", ".lightbox__frame", function (e) {
    e.stopPropagation();
  });

  /* ---------- 8. Validasi Formulir Kontak ---------- */
  $("#form-kontak").on("submit", function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    $form.find("[required]").each(function () {
      var $field = $(this).closest(".form-field");
      if ($.trim($(this).val()) === "") {
        $field.addClass("has-error");
        valid = false;
      } else {
        $field.removeClass("has-error");
      }
    });

    var $email = $form.find("input[type='email']");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ($email.length && $email.val() && !emailPattern.test($email.val())) {
      $email.closest(".form-field").addClass("has-error");
      valid = false;
    }

    if (valid) {
      $form.find(".form-msg").addClass("is-success").text(
        "Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda."
      );
      $form[0].reset();
    } else {
      $form.find(".form-msg").removeClass("is-success").hide();
    }
  });

  /* ---------- 9. Validasi Formulir Pendaftaran ---------- */
  $("#form-pendaftaran").on("submit", function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    $form.find("[required]").each(function () {
      var $field = $(this).closest(".form-field");
      if ($.trim($(this).val()) === "") {
        $field.addClass("has-error");
        valid = false;
      } else {
        $field.removeClass("has-error");
      }
    });

    if (valid) {
      var nama = $form.find("#daftar-nama").val();
      $form.find(".form-msg")
        .addClass("is-success")
        .text("Terima kasih, " + nama + ". Pendaftaran awal Anda berhasil dikirim. Nomor konfirmasi akan dikirim melalui email dalam 1x24 jam.");
      $form[0].reset();
    } else {
      $form.find(".form-msg").removeClass("is-success").hide();
    }
  });

  /* ---------- 10. Tahun berjalan pada footer ---------- */
  $(".current-year").text(new Date().getFullYear());

});
