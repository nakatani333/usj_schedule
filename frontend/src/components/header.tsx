import * as React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  align-items: center;
  display: flex;
  height: 5rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  background: #005ac2ff;
  
`

const HeaderTitle = styled.div`
  font-size: 3rem;
`

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;
  
  & > * {
    margin-left: 0.5rem;
  }
`
// 受け取るパラメータの定義
// タイトルとオペレーション要素を受け取れるようにしている
interface Props {
  title: string
  // Reactがjsx内で扱える要素（タグやテキスト、null など）の型
  children: React.ReactNode
}

export const Header: React.FC<Props> = (props) => (
  <HeaderWrapper>
    <HeaderTitle>
      {props.title}
    </HeaderTitle>
    <HeaderControl>
      {props.children}
    </HeaderControl>
  </HeaderWrapper>
)
