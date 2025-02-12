// content
let $img = document.querySelector('.img');
let $name = document.getElementById('name');
let $career = document.getElementById('career');
let $content = document.getElementById('text');

// controller
const $conBtn = document.querySelectorAll('.con_btn');
const $random_btn = document.getElementById('random_btn');

const url = [
   {
      name : 'Mike',
      career : 'CEO',
      img : '../img/img01.jpg',
      text : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
   },

   {
      name : 'Tom',
      career : 'Director',
      img : '../img/img02.jpg',
      text : `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
   },

   {
      name : 'Jane',
      career : 'Intern',
      img : '../img/img03.jpg',
      text : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
   },

   {
      name : 'Jack',
      career : 'Manager',
      img : '../img/img04.jpg',
      text : `Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`,
   },

   {
      name : 'Julia',
      career : 'Staff',
      img : '../img/img05.jpg',
      text : `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
   },
];





// 랜덤 버튼
let randomValue = 0;
let prevRandomValue = -1; // 이전 값 저장용
const arr = url.length;


// 기본값
$img.style.backgroundImage = `url(${url[0].img})`;
$name.innerText = `${url[0].name}`;
$career.innerText = `${url[0].career}`;
$content.innerText = `${url[0].text}`;


$random_btn.addEventListener('click', () => {
   const MaxN = arr - 1;
   const MinN = 0;

   do {
      randomValue = Math.floor(Math.random() * (MaxN - MinN + 1)) + MinN;
   } while (randomValue > MaxN || randomValue < MinN || prevRandomValue === randomValue);

   prevRandomValue = randomValue;

   updateContent(randomValue);
});

// prev, next
$conBtn.forEach((btn, index) => {
   btn.addEventListener('click', () => {
      if(btn.classList.contains('prev')) {
         randomValue = (randomValue - 1 + arr) % arr;
      } else if(btn.classList.contains('next')) {
         randomValue = (randomValue + 1) % arr;
      }

      updateContent(randomValue);
   })
})

function updateContent(index) {
   $img.style.backgroundImage = `url(${url[index].img})`;
   $name.innerText = `${url[index].name}`;
   $career.innerText = `${url[index].career}`;
   $content.innerText = `${url[index].text}`;
}

// 버튼을 누르면 객체의 인덱스 번호가 랜덤으로 들어가고 화살표 버튼을 누르면
// 객체의 인덱스가 1+ 1- 식으로 돌아가게 한다.