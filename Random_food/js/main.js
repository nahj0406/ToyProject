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
   {name : '부대찌개', group : '한식', food : '찌개',},
   {name : '국밥', group : '한식', food : '국',},
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
   {name : '제육볶음, 두루치기', group : '한식', food : '고기',},
   {name : '오징어볶음', group : '한식', food : '해산물',},
   {name : '쌀국수', group : '한식', food : '면',},
   {name : '그냥 라면 먹어', group : '한식 일식 중식 양식 야식', food : '면',},
   {name : '그냥 먹지 마', group : '한식 일식 중식 양식 야식', food : '꽝',},
   {name : '잠이나 자라', group : '야식', food : '꽝',},
   {name : '떡볶이', group : '한식 야식', food : '분식',},
   {name : '편의점', group : '한식 야식', food : '분식',},
   {name : '알탕, 해물탕', group : '한식', food : '해산물',},
   {name : '칼국수, 수제비', group : '한식', food : '면',},
   {name : '닭갈비', group : '한식', food : '고기',},
   {name : '컵밥', group : '한식 야식', food : '밥',},
   {name : '비빔밥', group : '한식', food : '밥',},
   {name : '족발', group : '한식 야식', food : '고기',},
   {name : '보쌈', group : '한식 야식', food : '고기',},
   {name : '쌈밥', group : '한식', food : '밥',},
   {name : '월남쌈', group : '한식', food : '밥',},
   {name : '찜닭', group : '한식', food : '고기',},
   {name : '김밥', group : '한식', food : '밥 분식',},
   {name : '냉면,비빔면', group : '한식', food : '면',},
   
   //양식
   {name : '파스타', group : '양식', food : '면',},
   {name : '스테이크', group : '양식', food : '면',},
   {name : '토스트,샌드위치', group : '양식', food : '빵',},
   {name : '빵', group : '양식', food : '빵',},
   {name : '리조또', group : '양식', food : '밥',},
   {name : '마카롱', group : '양식', food : '디저트',},
   {name : '아이스크림', group : '양식', food : '디저트',},
   {name : '햄버거', group : '양식', food : '패스트푸드',},
   {name : '치킨', group : '양식 야식', food : '고기',},
   {name : '피자', group : '양식 야식', food : '고기',},
   {name : '시리얼', group : '양식', food : '시리얼',},
   {name : '타코', group : '양식', food : '고기',},
   {name : '케밥', group : '양식', food : '고기',},


   //일식
   {name : '돈가스', group : '일식 양식', food : '해물',},
   {name : '규카츠', group : '일식', food : '해물',},
   {name : '초밥', group : '일식', food : '해물',},
   {name : '우동', group : '일식', food : '면',},
   {name : '소바', group : '일식', food : '면',},
   {name : '규동', group : '일식', food : '밥', },
   {name : '라멘', group : '일식', food : '면',},
   {name : '타코야끼', group : '일식 야식', food : '면',},
   {name : '오꼬노미야끼', group : '일식 야식', food : '면',},
   {name : '카레', group : '한식 일식 야식', food : '밥',},
   {name : '덴푸라', group : '일식', food : '밥 튀김',},
   {name : '스키야키', group : '일식', food : '고기',},
   {name : '돈부리(덮밥)', group : '일식 야식', food : '덮밥',},
   {name : '나베', group : '일식', food : '찌개',},
   {name : '오므라이스', group : '일식 야식', food : '밥',},

   //해물
   {name : '회', group : '한식 일식 야식', food : '해물',},
   {name : '조개구이', group : '한식', food : '해물',},
   {name : '고등어조림', group : '한식', food : '해물',},
   {name : '홍어', group : '한식', food : '해물',},

   //중식
   {name : '마라탕', group : '중식 야식', food : '고기',},
   {name : '짜장면', group : '중식 야식', food : '고기',},
   {name : '짬뽕', group : '중식 야식', food : '고기',},
   {name : '마라룽샤', group : '중식', food : '해산물',},
   {name : '양꼬치', group : '중식', food : '고기',},
   {name : '칠리새우', group : '중식', food : '해산물',},
   {name : '훠궈', group : '중식', food : '고기',},
   {name : '마파두부', group : '중식 야식', food : '밥',},
   {name : '동파육', group : '중식', food : '고기',},
];

let filterMenu = [];


$foodBtns.forEach( (checkBox, index) => {
   checkBox.addEventListener('change', function() {

      $foodBtns.forEach((btn) => { // active 클래스, 카테고리 체크 해제
         if (btn !== checkBox) {
            btn.parentElement.classList.remove('active');
            btn.checked = false;
         } else {
            btn.parentElement.classList.add('active');
         }
      })

      if(checkBox.checked) { // 카테고리 체크
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

$checkReset.addEventListener('click', function() { //카테고리 전체 초기화
   filterMenu = [...menu];
   $foodBtns.forEach((btn) => {
      btn.checked = false;
      btn.parentElement.classList.remove('active');
   });
   
});


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

