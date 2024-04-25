(function(window, $, undefined) {
    // 전역 네임스페이스 설정
    var app = window.Eel || (window.Eel = {});
    var $window = $(window);

    // 초기 변수 설정
    var currentPosition = 0; // 현재 위치
    var targetPosition = 0; // 목표 위치
    var browserWidth = 0; // 브라우저 너비

    var loadedImages = 0; // 로드된 이미지 수

    // 초기화 함수
    var autorun = function() {
        // 이미지 로드 이벤트 설정
        $("#eelimage1").one('load', function() {
            imageLoaded();
        }).each(function() {
            if(this.complete) $(this).load();
        });

        // 각 이미지에 대한 소스 설정
        $("#eelimage1").attr("src", "images/eelslap_site_panorama1.jpg");
        $("#eelimage2").attr("src", "images/eelslap_site_panorama2.jpg");
        $("#eelimage3").attr("src", "images/eelslap_site_panorama3.jpg");
        $("#eelimage4").attr("src", "images/eelslap_site_panorama4.jpg");
    };

    // 이미지 로드 완료 시 호출되는 함수
    var imageLoaded = function() {
        loadedImages++;

        // 모든 이미지가 로드되면 실행
        if (loadedImages == 4) {
            // 로딩 화면 제거
            $("#loader").animate({ opacity: 0 }, 500, "linear", function() {
                $("#loader").css("display","none");
            });

            // 이미지 표시 및 애니메이션 효과 적용
            setTimeout(function() {
                $("#allimages").css("display","block");
                $("#allimages").animate({ opacity: 1 }, 3000, "linear");

                // 터치 기기인 경우 텍스트 표시 및 애니메이션 적용
                if (isTouchDevice()) {
                    setTimeout(function() {
                        $("#introtext").css("display","block");
                        $("#introtext").html("Drag your finger across the screen to slap!");
                        $("#introtext").css("display","block");
                        $("#introtext").animate({ opacity: 1 }, 1000, "linear");

                        setTimeout(function() {
                            $("#introtext").animate({ opacity: 0 }, 1000, "linear", function() {
                                $("#introtext").css("display","none");
                            });
                        }, 3000);
                    }, 1000);
                }

                // slap 애니메이션 시작
                startSlap();
            }, 500);
        }
    };

    // slap 애니메이션 함수
    var startSlap = function() {
        browserWidth = $(window).width();

        // 일정 간격으로 currentPosition 갱신하여 이미지 이동
        setInterval(function() {
            currentPosition += (targetPosition - currentPosition) / 4;
            var currentSlap = currentPosition / 640 * 93;
            currentSlap = Math.min(93, Math.max(0,currentSlap));
            var pos = Math.round(currentSlap) * -640;

            $("#allimages").css("left", pos);
        }, 30);

        // 마우스 이벤트 바인딩
        $("body").bind('mousemove', function(e) {
            targetPosition = 640 - Math.max(0, Math.min(640, e.pageX - $('#eelcontainer').offset().left));
        });

        // 터치 이벤트 바인딩
        $("body").bind('touchmove', function(e) {
            e.preventDefault();
            var touch = event.targetTouches[event.targetTouches.length-1];
            targetPosition = browserWidth - touch.pageX;
        });

        // 윈도우 리사이즈 이벤트 핸들러
        $(window).resize(function() {
            browserWidth = $(window).width();
        });
    };

    // 터치 기기인지 여부를 확인하는 함수
    var isTouchDevice = function() {
        var el = document.createElement('div');
        el.setAttribute('ongesturestart', 'return;');
        return typeof el.ongesturestart === "function";
    };

    // DOM이 준비되면 실행
    $(autorun);

})(this, jQuery);
