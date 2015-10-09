(function($){
  /**
   * [spriteAnime description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  $.fn.spriteAnime = function(options) {
      var _this = this;

      var defaults = {
        frameHeight: 50,  //动画的画面镜头高度
        maxFrame: 10,    //动画的数量
        speed: 100,      //一个画面变化的速度
        repeat: 0,       //重复多少个画面
        infinite: true,  //是否无限播放
        interval: 0      //无限播放的时间间隔

      };

      options = $.extend(defaults, options);

      var defPos = 0;
      var frame = 0;
      var repeatCount = options.repeat - 1;
      var heng = _this.hasClass('heng');

      var spriteAnimePlay = function(){
        // 动画的一个片段
        if(frame != options.maxFrame) {
          var timerSpriteAnime = setTimeout(function(){
            if(defPos < options.frameHeight*(options.maxFrame-1)) {
              defPos = defPos+options.frameHeight;
            } else {
              if (options.infinite) {
                defPos = 0;
              } else if (repeatCount > 0) {
                defPos = 0;
              }
            }
            if (heng) {
              _this.css({'background-position': '-'+ defPos + 'px'+' 0'});
            }else{
              _this.css({'background-position': '0 '+'-'+ defPos + 'px'});
            }
            
            frame++;
            spriteAnimePlay();
          },options.speed);

        // 动画的一个片段重播
        } else if (repeatCount > 0) {
          frame = 0;
          repeatCount--;
          spriteAnimePlay();

        // 动画整体重播
        } else {
          frame = 0;
          repeatCount = options.repeat - 1;
          if (options.repeat > 0) _this.css({'background-position': '0 0'});
          setTimeout(function(){
            if (options.infinite) {
              spriteAnimePlay();
            }
          },options.interval);

        }
      };

      spriteAnimePlay();

      return this;
    };
})(jQuery);