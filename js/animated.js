function RandomObjectMover(elements, container) {
  this.$objects = elements;
  this.$container = container || window;
  this.pixels_per_second = 10; // Устанавливаем фиксированную скорость
  this.current_positions = [];

  for (let i = 0; i < this.$objects.length; i++) {
    this.current_positions[i] = { x: 0, y: 0 };
  }

  this._getContainerDimensions = function () {
    return {
      height: 100, // Высота контейнера 100px
      width: 100, // Ширина контейнера 100px
    };
  };

  this._generateNewPosition = function (index) {
    let containerSize = this._getContainerDimensions();
    let objectRect = this.$objects[index].getBoundingClientRect();
    let availableHeight = containerSize.height - objectRect.height;
    let availableWidth = containerSize.width - objectRect.width;
    let y = Math.floor(Math.random() * availableHeight);
    let x = Math.floor(Math.random() * availableWidth);
    let xRotated = Math.random() * 180;
    let yRotated = Math.random() * 180;
    let zRotated = Math.random() * 360;
    let aRotated = (Math.random() * (2 - 1) + 1) * 40;
    console.log(xRotated);
    console.log(yRotated);
    console.log(zRotated);
    console.log(aRotated);
    return {
      x: x,
      y: y,
      xRotated: xRotated,
      yRotated: yRotated,
      zRotated: zRotated,
      aRotated: aRotated,
    };
  };

  this._calcDelta = function (a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  };

  this._moveOnce = function (index) {
    let next = this._generateNewPosition(index);
    let delta = this._calcDelta(this.current_positions[index], next);
    let speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
    this.$objects[index].style.transition = "transform " + speed + "s linear";
    this.$objects[
      index
    ].style.transform = `translate3d(${next.x}px, ${next.y}px, 0) rotate3d(${next.xRotated}, ${next.yRotated}, ${next.zRotated}, ${next.aRotated}deg)`;
    this.current_positions[index] = next;
  };

  this.start = function () {
    if (!this.is_running) {
      for (let i = 0; i < this.$objects.length; i++) {
        this.$objects[i].style.willChange = "transform";
        this.$objects[i].style.pointerEvents = "auto";
        this.$objects[i].addEventListener(
          "transitionend",
          this._moveOnce.bind(this, i)
        );
        this._moveOnce(i);
      }
      this.is_running = true;
    }
  };

  this.stop = function () {
    if (this.is_running) {
      for (let i = 0; i < this.$objects.length; i++) {
        this.$objects[i].removeEventListener(
          "transitionend",
          this._moveOnce.bind(this, i)
        );
      }
      this.is_running = false;
    }
  };
}

function startRandomMoverIfWideScreen() {
  let screenWidth = window.innerWidth;
  const minWidthForAnimation = 1200;

  if (screenWidth >= minWidthForAnimation) {
    let animatedElements = document.querySelectorAll(".animated");
    let animashka = new RandomObjectMover(animatedElements, window);
    animashka.start();
  }
}

// Запустить при загрузке страницы
startRandomMoverIfWideScreen();

// Обработчик изменения размеров окна
window.addEventListener('resize', function () {
  startRandomMoverIfWideScreen();
});


