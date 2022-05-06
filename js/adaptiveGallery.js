(function($) {
  $.fn.adaptiveGallery = function(params) {

    // Variables
    $count = (params.count && params.count <= 4) ? count = params.count : count = 3;
    $el = findElement(this);
    $splittingAnArrayResult = splittingAnArray($el)
    $hideElementsResult = hideElements($splittingAnArrayResult);

    // Find Element
    function findElement(item) {
      let element = item.find('.card');
      
      return element;
    }

    param($el, params);
    addMarkup($el);
    splittingAnArray($el);
    hideElements($splittingAnArrayResult);
    resizeElement($splittingAnArrayResult);
    ($hideElementsResult == true) ? hideShowBtn($el) : false;
    showBtnElements($splittingAnArrayResult, $el);

    // Params
    function param($el, param) {
      $el.css({'border': param.border});
    };

    // Create markup
    function addMarkup($el) {
      $el.wrapAll('<div class="container"><div class="row">');
    };

    // Splitting an array
    function splittingAnArray($el) {

      let subarray = [];
      for(let i = 0; i < Math.ceil($el.length / count); i++) {
        subarray[i] = $el.slice((i * $count), (i * $count) + $count);
      }

      return {
        'subarray': subarray
      }
    }

    // Resize Elements
    function resizeElement(arr) {
      
      resize(arr.subarray);
      
      function resize(arr) {
        $.each(arr, function() {
          (this.length == 1) ? $(this).addClass('col-12') : false;
          (this.length == 2) ? $(this).addClass('col-12 col-md-6') : false;
          (this.length == 3) ? $(this).addClass('col-12 col-sm-6 col-md-4') : false;
          (this.length == 4) ? $(this).addClass('col-12 col-sm-6 col-md-4 col-lg-3') : false;
        })
      }
    }

    // Hide Elements
    function hideElements(arr) {

      let idx;

      $.each(arr.subarray, function(index) {
        (index > 0) ? $(this).css({'display': 'none'}) : false ;
        idx = index;
      })

      return (idx >= 0) ? true : false;

    }

    // Add Button Show and Hide 
    function hideShowBtn($el) {
      let id = $el.parents('.container').parent().attr('id');
      $el.parents('.container').append(
        '<div class="row"><div class="btn-group col-4" role="group" aria-label="Basic mixed styles example"><button type="button" id=' + "show_btn-" + id + ' class="btn">Показать ещё</button><button type="button" id=' + "hide_btn-" + id + ' class="btn">Скрыть</button></div></div>'
      );
    }

    // Show Hide Elements

    // Show Elements
    function showBtnElements(arr, el) {

      let id = el.parents('.container').parent().attr('id');
      let showBtn = $('#show_btn-' + id);
      let hideBtn = $('#hide_btn-' + id);

      var index = 1;

      hideBtn.addClass('disabled');

      showBtn.on('click', function() {
        arr.subarray[index].css({'display': 'block'});
        hideBtn.removeClass('disabled');

        (index + 1 == arr.subarray.length) ? showBtn.addClass('disabled') : false;

        index++;
      })
      
      hideBtn.on('click', function() {

        index--;

        arr.subarray[index].css({'display': 'none'});
        (index == 1) ? showBtn.removeClass('disabled') : false;

        (index <= 1) ? hideBtn.addClass('disabled') : false;
      })

    }
  };
})(jQuery);