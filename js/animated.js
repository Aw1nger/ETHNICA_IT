function RandomObjectMover(elements, container) {
  this.$objects = elements;
  this.$container = container || window;
  this.pixels_per_second = 7; // Устанавливаем фиксированную скорость
  this.current_positions = [];

  for (var i = 0; i < this.$objects.length; i++) {
    this.current_positions[i] = { x: 0, y: 0 };
  }

  this._getContainerDimensions = function () {
    return {
      height: 100, // Высота контейнера 100px
      width: 100, // Ширина контейнера 100px
    };
  };

  this._generateNewPosition = function (index) {
    var containerSize = this._getContainerDimensions();
    var objectRect = this.$objects[index].getBoundingClientRect();
    var availableHeight = containerSize.height - objectRect.height;
    var availableWidth = containerSize.width - objectRect.width;
    var y = Math.floor(Math.random() * availableHeight);
    var x = Math.floor(Math.random() * availableWidth);
    return { x: x, y: y };
  };

  this._calcDelta = function (a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  };

  this._moveOnce = function (index) {
    var next = this._generateNewPosition(index);
    var delta = this._calcDelta(this.current_positions[index], next);
    var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
    this.$objects[index].style.transition = 'transform ' + speed + 's linear';
    this.$objects[index].style.transform = 'translate3d(' + next.x + 'px, ' + next.y + 'px, 0)';
    this.current_positions[index] = next;
  };

  this.start = function () {
    if (!this.is_running) {
      for (var i = 0; i < this.$objects.length; i++) {
        this.$objects[i].style.willChange = 'transform';
        this.$objects[i].style.pointerEvents = 'auto';
        this.$objects[i].addEventListener('transitionend', this._moveOnce.bind(this, i));
        this._moveOnce(i);
      }
      this.is_running = true;
    }
  };

  this.stop = function () {
    if (this.is_running) {
      for (var i = 0; i < this.$objects.length; i++) {
        this.$objects[i].removeEventListener('transitionend', this._moveOnce.bind(this, i));
      }
      this.is_running = false;
    }
  };
}

var animatedElements = document.querySelectorAll('.animated');
var x = new RandomObjectMover(animatedElements, window);
x.start();