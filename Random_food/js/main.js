const $menuBox = document.querySelector('.menu_box');
const $start = document.getElementById('start');
const $reset = document.getElementById('reset');
const $decision = document.getElementById('decision');
const $foodBtns = document.querySelectorAll('.food_input');
const $checkReset = document.getElementById('food_reset');
$decision.classList.add('disabled');

let intervalId; // seinterval id 함수


const menu = [
   // 한식
   {name : '김치찌개', group : '한식', food : '찌개',},
   {name : '된장찌개', group : '한식', food : '찌개',},
   {name : '청국장', group : '한식', food : '찌개',},
   {name : '오모리찌개', group : '한식', food : '찌개',},
   {name : '순두부찌개', group : '한식', food : '찌개',},
   {name : '간장게장', group : '한식', food : '장',},
   {name : '양념게장', group : '한식', food : '장',},
   {name : '새우장', group : '한식', food : '장',},
   {name : '삼겹살', group : '한식', food : '고기',},
   {name : '오겹살', group : '한식', food : '고기',},
   {name : '대패삼겹살', group : '한식', food : '고기',},
   {name : '돼지갈비', group : '한식', food : '고기',},
   {name : '석갈비', group : '한식', food : '고기',},
   {name : '주먹구이', group : '한식', food : '고기',},
   {name : '오리고기', group : '한식', food : '고기',},
   {name : '소갈비', group : '한식', food : '고기',},
   {name : '소고기', group : '한식', food : '고기',},
   {name : '그냥 라면 먹어라', group : '한식 일식 중식 양식 야식', food : '면',},
   {name : '그냥 먹지 마라', group : '한식 일식 중식 양식 야식', food : '면',},
   
   //양식
   {name : '파스타', group : '양식', food : '면',},
   {name : '스테이크', group : '양식', food : '면',},
   {name : '리조또', group : '양식', food : '밥',},
   {name : '마카롱', group : '양식', food : '디저트',},
   {name : '아이스크림', group : '양식', food : '디저트',},


   //일식
   {name : '초밥', group : '일식', food : '해물',},
   {name : '규동', group : '일식', food : '밥', },
   {name : '라멘', group : '일식', food : '면',},
   {name : '타코야끼', group : '일식 야식', food : '면',},
   {name : '오꼬노미야끼', group : '일식 야식', food : '면',},

   //해물
   {name : '회', group : '한식 일식 야식', food : '해물',},
   {name : '어패류', group : '한식 일식', food : '해물',},
   {name : '고등어조림', group : '한식', food : '해물',},
   {name : '홍어', group : '한식', food : '해물',},

   //야식
   {name : '치킨', group : '양식 야식', food : '고기',},
   {name : '피자', group : '양식 야식', food : '고기',},
   {name : '족발', group : '한식 야식', food : '고기',},
   {name : '보쌈', group : '한식 야식', food : '고기',},
   {name : '마라탕', group : '중식 야식', food : '고기',},
   {name : '짜장면', group : '중식 야식', food : '고기',},
   {name : '짬뽕', group : '중식 야식', food : '고기',},
   {name : '짱깨(중국집)', group : '중식 야식', food : '고기',},

   {name : '시리얼', group : '양식', food : '고기',},
   {name : '샌드위치', group : '양식', food : '고기',},
];

let filterMenu = [];


$foodBtns.forEach( (checkBox, index) => {
   checkBox.addEventListener('click', function() {
      if(checkBox.checked) {
         if(checkBox.id === 'food_kor') {
            filterMenu = menu.filter(item => item.group.includes('한식'));
         } else if(checkBox.id === 'food_jap') {
            filterMenu = menu.filter(item => item.group.includes('일식'));
         } else if(checkBox.id === 'food_cha') {
            filterMenu = menu.filter(item => item.group.includes('중식'));
         } else if(checkBox.id === 'food_eng') {
            filterMenu = menu.filter(item => item.group.includes('양식'));
         } else if(checkBox.id === 'food_eve') {
            filterMenu = menu.filter(item => item.group.includes('야식'));
         }
      } else {
         filterMenu = [...menu];
      }
   })
})

$checkReset.addEventListener('click', function() {
   filterMenu = [...menu];
   $foodBtns.forEach(btn => btn.checked = false);
})


function randomCounter() { // 메뉴랜덤 함수
   let randomValue
   let targetMenu = filterMenu.length > 0 ? filterMenu : menu; // `filterMenu`가 비어있으면 원래 `menu` 사용
   const MaxN = targetMenu.length - 1;
   const MinN = 0;
   
   do {
      randomValue = Math.floor(Math.random() * (MaxN - MinN + 1)) + MinN;
   } while (randomValue > MaxN || randomValue < MinN);

   $menuBox.innerText = targetMenu[randomValue].name;
   
}



function clickAble(...btns) { // 버튼 클릭 이벤트
   const arr = [...btns];

   arr.forEach((item, index)=> {
      item.addEventListener('click', function() {
         if(item.id === 'start') { // 시작
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(randomCounter, 50); // 시간 조정
            
            [$start, $reset].forEach((el) => el.classList.add('disabled'));
            $decision.classList.remove('disabled');
   
         } else if(item.id === 'decision' || item.id === 'reset') { // 재시작 or 결정
            clearInterval(intervalId); // 정지
            intervalId = null;
   
            $start.classList.remove('disabled');

            if(item.id === 'decision') { // 결정
               [$start, $decision].forEach((el) => el.classList.add('disabled'));
               $reset.classList.remove('disabled');
            }
   
            if(item.id === 'reset') { // 재시작
               $menuBox.innerText = '뭐 먹지...';
            }
   
         }
      })
   })
}

clickAble($start, $reset, $decision);

// 메뉴 개수 세는 용도
// console.log(menu.length);

