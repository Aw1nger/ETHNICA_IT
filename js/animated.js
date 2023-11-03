// function RandomObjectMover(elements, container) {
//   this.$objects = elements;
//   this.$container = container || window;
//   this.pixels_per_second =150; // Устанавливаем фиксированную скорость
//   this.current_positions = [];
//   for (var i = 0; i < this.$objects.length; i++) {
//     this.current_positions[i] = { x: 0, y: 0 };
//   }

//   this._getContainerDimensions = function() {
//     if (this.$container === window) {
//       return { 'height': window.innerHeight, 'width': window.innerWidth };
//     } else {
//       return { 'height': this.$container.clientHeight, 'width': this.$container.clientWidth };
//     }
//   }

//   this._generateNewPosition = function(index) {
//     var containerSize = this._getContainerDimensions();
//     var objectRect = this.$objects[index].getBoundingClientRect();
//     var availableHeight = containerSize.height - objectRect.height;
//     var availableWidth = containerSize.width - objectRect.width;
//     var y = Math.floor(Math.random() * availableHeight);
//     var x = Math.floor(Math.random() * availableWidth);
//     return { x: x, y: y };
//   }

//   this._calcDelta = function(a, b) {
//     var dx = a.x - b.x;
//     var dy = a.y - b.y;
//     var dist = Math.sqrt(dx * dx + dy * dy);
//     return dist;
//   }

//   this._moveOnce = function(index) {
//     var next = this._generateNewPosition(index);
//     var delta = this._calcDelta(this.current_positions[index], next);
//     var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
//     this.$objects[index].style.transition = 'transform ' + speed + 's linear';
//     this.$objects[index].style.transform = 'translate3d(' + next.x + 'px, ' + next.y + 'px, 0)';
//     this.current_positions[index] = next;
//   }

//   this.start = function() {
//     if (!this.is_running) {
//       for (var i = 0; i < this.$objects.length; i++) {
//         this.$objects[i].style.willChange = 'transform';
//         this.$objects[i].style.pointerEvents = 'auto';
//         this.$objects[i].addEventListener('transitionend', this._moveOnce.bind(this, i));
//         this._moveOnce(i);
//       }
//       this.is_running = true;
//     }
//   }

//   this.stop = function() {
//     if (this.is_running) {
//       for (var i = 0; i < this.$objects.length; i++) {
//         this.$objects[i].removeEventListener('transitionend', this._moveOnce.bind(this, i));
//       }
//       this.is_running = false;
//     }
//   }
// }

// var animatedElements = document.querySelectorAll('.animated');
// var x = new RandomObjectMover(animatedElements, window);
// x.start();

function RandomObjectMover(elements) {
  this.$objects = elements;
  this.rotationSpeeds = [];

  this.setRandomRotation = function(index) {
    let randomAngle = Math.floor(Math.random() * 360); // Случайный угол вращения
    let randomDirection = Math.random() < 0.5 ? -1 : 1; // Случайное направление вращения (по или против часовой стрелки)
    let randomTransform = `rotate(${randomDirection * randomAngle}deg)`;
    this.$objects[index].style.animation = `rotation-${index} ${this.rotationSpeeds[index]}s linear infinite`;
    this.$objects[index].style.transform = randomTransform;
  }

  this.start = function() {
    for (var i = 0; i < this.$objects.length; i++) {
      var speed = Math.random() * 100 + 100; // Случайная скорость вращения (от 5 до 15 секунд на оборот)
      this.rotationSpeeds.push(speed);
      this.setRandomRotation(i);
    }
  }

  this.stop = function() {
    for (var i = 0; i < this.$objects.length; i++) {
      this.$objects[i].style.animation = 'none';
    }
  }
}

var style = document.createElement('style');
style.innerHTML = `
  @keyframes rotation-0 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

for (let i = 1; i <= 20; i++) {
  style.innerHTML += `
    @keyframes rotation-${i} {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
}

document.head.appendChild(style);

var animatedElements = document.querySelectorAll('.animated');
var x = new RandomObjectMover(animatedElements);
x.start();
