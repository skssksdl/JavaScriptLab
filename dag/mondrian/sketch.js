;(() => {
    // 캔버스 요소와 그리기 컨텍스트 가져오기
    const canvas = document.querySelector("#canvas")
    const context = canvas.getContext("2d")

    // 캔버스 크기를 브라우저 창 크기로 설정
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 사각형 라인 너비 설정 및 사각형 배열 초기화
    context.lineWidth = 10
    const rectangles = []
    let splitDirectionVertical = true // 사각형 분할 방향 (수직: true, 수평: false)

    // 마우스 클릭 이벤트 처리
    canvas.addEventListener("click", onRectangleClick)

    // 사각형 그리기 함수
    function drawRectangles() {
        rectangles.forEach((rectangle) => {
            // 사각형 그리기
            context.fillStyle = rectangle.color
            context.beginPath()
            context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
            context.closePath()
            context.fill()
            context.stroke()
        })
    }

    // 마우스 클릭 이벤트 처리 함수
    function onRectangleClick(e) {
        // 클릭된 위치의 사각형 확인
        const clickedIndex = rectangles.findIndex((rectangle) => {
            if (
                e.x > rectangle.x &&
                e.x < rectangle.x + rectangle.width &&
                e.y > rectangle.y &&
                e.y < rectangle.y + rectangle.height
            ) {
                return true
            }
        })
        console.log(splitDirectionVertical)
        // 새로운 사각형 추가 또는 기존 사각형 분할
        if (clickedIndex === -1) {
            splitDirectionVertical = !splitDirectionVertical
            return
        }

        const clickedRectangle = rectangles[clickedIndex]
        rectangles.splice(clickedIndex, 1)
        splitRectangleAt(clickedRectangle, {
            x: e.x - clickedRectangle.x,
            y: e.y - clickedRectangle.y,
        })
    }

    // 사각형 분할 함수
    function splitRectangleAt(rectangle, position) {
        // 사각형 분할 방향에 따라 분할된 사각형 추가
        if (splitDirectionVertical) {
            rectangles.push({
                x: rectangle.x,
                y: rectangle.y,
                width: position.x,
                height: rectangle.height,
                color: getColor(),
            })
            rectangles.push({
                x: rectangle.x + position.x,
                y: rectangle.y,
                width: rectangle.width - position.x,
                height: rectangle.height,
                color: getColor(),
            })
        } else {
            rectangles.push({
                x: rectangle.x,
                y: rectangle.y,
                width: rectangle.width,
                height: position.y,
                color: getColor(),
            })
            rectangles.push({
                x: rectangle.x,
                y: rectangle.y + position.y,
                width: rectangle.width,
                height: rectangle.height - position.y,
                color: getColor(),
            })
        }

        // 사각형 분할 방향 변경 및 사각형 그리기
        splitDirectionVertical = !splitDirectionVertical
        drawRectangles()
    }

    // 무작위 색상 선택 함수
    function getColor() {
        const colors = [
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#EBEBED",
            "#C53632",
            "#3E4984",
            "#F8DD67",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    // 초기 사각형 추가 및 그리기
    rectangles.push({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        color: "#EBEBED",
    })
    drawRectangles()
})()
