import { useState } from 'react'
import Button from './component/Button';
import ToDoItem from './component/ToDoItem';
import dayjs from 'dayjs';

function App() {

  // 최소 요구 버전
  // npm -v : 7.x 이상 권장 => 10.8.2 => 11.6.0 사용 권장
  // node -v : 20.19.0 이상
  // npm create vite@latest : react vite 다운로드

  // 플젝 이름 입력
  // react 선택
  // javaScript => + React Compiler는 React 코드의 성능 최적화를 자동으로 도와주는 기능
  // ESLint => 학습자 및 일반적인 react 프로젝트, Oxlint => 빠른 문제 패턴 검사와 가벼운 환경의 프로젝트
  // yes

  // 플젝 이동 후 npm run dev로 실행
  // 'http://localhost:5173/' url로 이동

  // Tailwind CSS IntelliSense => 확장 설치시 자동 완성과 클래스 설명 기능 활용 가능

  const [t, setT] = useState('');
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(null);

  const addData = async(e) =>{
    
    e.preventDefault();
    e.target.reset();

    setData(d => [
      ...d,
      {
        id: d.length > 0? Math.max(...d.map(n => n.id)) + 1 : 1,
        text: t,
        completed: false,
        update: dayjs()
      }
    ]);
  }

  return (
    <div className="min-h-screen dark:bg-gray-700 dark:text-white">
      {/*
        dark: => dark모드 일때 적용
        not-dark: => dark 모드 아닐 때 적용

        min-h-screen : 최소 높이를 화면 높이만큼 설정 => 내부에 있는 요소가 많으면 자동으로 확장=> 새로 스크롤이 생길 수 있음
        mx-auto : 좌우 여백을 자동으로 분배해 가운데 정렬
        max-w-3xl : 콘텐츠의 최대 너비 제한
        px-4(padding) : 좌우 안쪽 여백 설정
        py-10 : 위아래 안쪽 여백 설정

        요소-색-명암
        예) text-gray-500 : 글자-회색-500명암
        bg,text,border 등 존재

        border-b-gray-300 : 하단에 테두리 생성 및 gray 300만큼 명암 생성
      */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          해야할 일 모음
        </h1>

        <p className="mt-2 text-gray-500 dark:text-white">
          해봅시다.
        </p>

        {/*
          mt-숫자 : 위쪽 여백
          rounded-lg : 테두리 모서리를 둥글게 설정 => none, sm, lg, full 존재
          flex(display: flex) : 자식 요소를 나란히 배치
          flex-1 : 특정 요소가 남은 공간을 전부 차지
          gap-2 : 자식 요소 사이 간격
          border : 테두리 생성
        */}
        <form onSubmit={addData} className='flex gap-2 mt-3'>
          <input
            type='text'
            className='border border-gray-500 rounded-lg px-3 py-3 flex-1 my-0'
            placeholder='해야할 일을 입력해 주세요.'
            onChange={(e) => setT(e.target.value)}
          />
          <button
            type='submit'
            className='bg-yellow-500 rounded-lg px-3 py-3'
          >입력</button>
        </form>

        <div className='mt-3'>
          {data.length > 0 &&
            <div>
              <div className='my-0'>
                <Button name='전체' select={select === null} onClick={() => setSelect(null)} />
                <Button name='완료' select={select} onClick={() => setSelect(true)} />
                <Button name='미완료' select={select === false} onClick={() => setSelect(false)} />
              </div>

              {/*
                반응형 디자인
                sm : 640px
                md : 768px
                lg : 1024px
                xl : 1280px

                flex-row : 요소를 가로 배치
                flex-col : 요소를 세로 배치

                grid(display: grid) : grid 레이아웃 사용
                grid-cols-숫자 : 열 갯수 지정
                예) grid-cols-2 => grid-template-columns: repeat(2, minmax(0, 1fr))
              */}

              {data.some(d => d.completed === select || select === null) &&
                <div className='border rounded-b-lg p-2 grid grid-cols-1 md:grid-cols-2 gap-1'>
                  {data.filter(d => d.completed === select || select === null).map(d =>
                    <div className='mt-3 gap-1 flex items-center justify-between' key={d.id}>
                      <div className='gap-1 flex items-center flex-1 overflow-hidden'>
                        {/*
                          items-center : 세로 방향 가운데 정렬
                          justify-center : 가로 방향 가운데 정렬
                          justify-between : 내부 요소를 양쪽 끝에 배치하고, 요소 사이에 남는 공간을 균등하게 분배

                          transition : hover와 같은 가상 클래스의 css를 부드럽게 바뀌게 설정(Tailwind가 지정한 주요 전환 속성에 적용)
                          transition-all : 변경 가능한 CSS 속성 전반에 전환 효과를 적용(너비나 여백 등 여러 속성이 함께 변할 때 사용)

                          duration-숫자 : 1000당 1초 동안 전환 효과 주기
                          scale-숫자 : 요소 크기 비율 100이 원래 크기

                          w-full	부모 너비를 가득 채움
                          w-max	내용을 한 줄로 표시할 때 필요한 너비를 기준으로 함
                          w-fit	가능한 범위에서 내용에 맞게 너비를 조정
                          w-64	기본 설정에서 16rem 너비

                          min-w-0 : 필요할 경우 너비를 0까지 줄일 수 있음, 최소 width 0px

                          animate-[]
                          => _는 공백을 의미
                          => 차례대로 넣을 수 있음
                          - 애니메이션명
                          - 실행 시간
                          - 속도 방식
                          - delay
                          - 반복 횟수 : 숫자 or infinite
                          - 종료 상태 : backwards, both 등
                          - 진행 방향 : alternate, reverse, normal(기본값) 등


                          hover: => css 가상 클래스 => 마우스를 올릴 경우 해당 css 적용
                          [&>p]: => &현재 요소 직계 자식 중 p태그 선택 css 적용
                          *: => 모든 자식 요소에 해당 css 적용
                          group-hover: => 부모 상태에 따라 자식 변경
                          peer-checked: => 형제 상태에 따라 변경
                        */}
                        <div className='m-2 p-3 rounded-full bg-black transition duration-300 hover:bg-red-500 hover:scale-150 active:scale-50'></div>
                        <div className='flex-1 overflow-hidden'>
                          <p className='flex-1 min-w-0 w-max transition duration-300 hover:animate-[marquee_5s_linear_1s_infinite_backwards]'>{d.id + ' : ' + d.text}</p>
                        </div>
                      </div>
                      
                      <ToDoItem data={d} cd={!d.completed} setter={setData} />
                    </div>
                  )}
                </div>
              }
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default App
