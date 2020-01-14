$(document).ready(function(){
    // carousel
    $('.carouisel_inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right.svg"></button>',
        responsive: [
            {
            breakpoint: 890,
            settings: {
                dots: false,
                arrows: false
            }  
        }
        ]
    });
    // tabs
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });
      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
                $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
            })
        });
    };

    toggleSlide('.catalog_content_detail');
    toggleSlide('.catalog_content_back');

    //modal
    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal_close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.catalog_content_btn').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.catalog_content_btn').each(function(i){
        $(this).on('click', function() {
            $('#order .modal_subtitle').text($('.catalog_content_title').eq(i).text());
        })
    });
    

    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
    
            messages: {
                name: "Пожалуйста, введите ваше имя",
                phone: "Пожалуйста, введите ваш телефон",
                email: {
                  required: "Пожалуйста, введите вашу почту",
                  email: "Неправильный адрес почты"
                }
              }
        });
    };
    valideForms('#consultation_form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            tepe: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            ;('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        })
    });
  });